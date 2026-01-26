import { createRequire } from "module";
const require = createRequire(import.meta.url);
const pdfParse = require("pdf-parse").default || require("pdf-parse");

import axios from "axios";
import { JobApplication } from "../models/JobApplication.js";
import { JobPosting } from "../models/JobPosting.js";
import { Candidate } from "../models/Candidate.js";
import { Profile } from "../models/Profile.js";
import { User } from "../models/User.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { uploadImage } from "../utils/cloudinary.js";
import { APPLICATION_STATUS, NOTIFICATION_TYPES, USER_ROLES } from "../config/constants.js";
import { createNotification } from "../services/notificationService.js";

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";


// Submit Applications 
export const submitApplication = asyncHandler(async (req, res) => {
  const { jobId } = req.body;

  // Get job posting
  const job = await JobPosting.findByPk(jobId);
  if (!job) return res.status(404).json({ error: "Job not found" });

  // Get candidate profile
  const candidateProfile = await Profile.findOne({
    where: { user_id: req.user.id, role: USER_ROLES.CANDIDATE },
    include: [{ model: Candidate, as: "candidateInfo" }],
  });

  if (!candidateProfile)
    return res.status(403).json({ error: "Only candidates can apply" });

  const candidate = candidateProfile.candidateInfo;
  if (!candidate) return res.status(400).json({ error: "Candidate profile missing" });

  // Check existing application
  const exists = await JobApplication.findOne({
    where: { job_id: jobId, candidate_id: candidate.id },
  });
  if (exists) return res.status(409).json({ error: "Already applied" });

  // Handle resume upload
  const resumeFile = req.files?.resume?.[0];
  if (!resumeFile) return res.status(400).json({ error: "Resume is required" });

  const resumeUpload = await uploadImage(resumeFile.buffer, "applications");
  const resumeUrl = resumeUpload.secure_url;

  // Parse PDF safely
  let resumeText = "";
  try {
    if (resumeFile.buffer.length > 0) {
      resumeText = (await pdfParse(resumeFile.buffer)).text || "";
    }
  } catch (err) {
    console.warn("Resume parsing failed, using empty string:", err.message);
    resumeText = "";
  }

  // Handle optional cover letter
  let coverLetterUrl = null;
  let coverLetterText = "";
  const coverLetterFile = req.files?.coverLetter?.[0];
  if (coverLetterFile) {
    const upload = await uploadImage(coverLetterFile.buffer, "cover-letters");
    coverLetterUrl = upload.secure_url;

    try {
      coverLetterText =
        coverLetterFile.mimetype === "application/pdf"
          ? (await pdfParse(coverLetterFile.buffer)).text || ""
          : coverLetterFile.buffer.toString("utf-8");
    } catch (err) {
      console.warn("Cover letter parsing failed, using empty string:", err.message);
      coverLetterText = "";
    }
  }

  // Gemini AI analysis for skills, experience, and job match
  let aiResult = {};
  try {
    const prompt = `
    You are analyzing a candidate's CV and cover letter for a job posting.
    Extract the candidate's skills, experience, and match score with the following job description:
    Job Description: ${job.description}
    Resume Text: ${resumeText}
    Cover Letter Text: ${coverLetterText}
    Return a JSON object:
    {
      "skills": ["list of skills from resume"],
      "experience": "years of experience related to job",
      "matchScore": 0-1,
      "missingSkills": ["skills required by job but not in resume"],
      "raw": "original text analysis"
    }
    `;

    const response = await axios.post(`${GEMINI_URL}?key=${GEMINI_API_KEY}`, {
      contents: [{ parts: [{ text: prompt }] }],
    });

    const geminiText = response.data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (geminiText) {
      try {
        aiResult = JSON.parse(geminiText);
      } catch {
        aiResult = { raw: geminiText };
      }
    }
  } catch (err) {
    console.error("Gemini AI analysis failed:", err.message);
    aiResult = { raw: "AI analysis failed" };
  }

  // Create application
  const application = await JobApplication.create({
    user_id: req.user.id,
    job_id: jobId,
    candidate_id: candidate.id,
    resume: resumeUrl,
    cover_letter: coverLetterUrl,
    extracted_text: resumeText,
    cover_letter_text: coverLetterText,
    ai_analysis: aiResult,
    cover_letter_score: aiResult.coverLetterScore || null,
    missing_skills: aiResult.missingSkills || null,
    status: APPLICATION_STATUS.APPLIED,
    applied_at: new Date(),
  });

  // Reload to include job & candidate for notification
  await application.reload({
    include: [
      { model: JobPosting, as: "job" },
      {
        model: Candidate,
        as: "candidate",
        include: { model: Profile, as: "profile", include: { model: User, as: "user" } },
      },
    ],
  });

  // Notify candidate
  try {
    await createNotification({
      senderId: req.user.id,
      recipient: req.user,
      type: NOTIFICATION_TYPES.APPLICATION_STATUS_CHANGED,
      content: `Your application for "${job.title}" has been received.`,
      application,
    });
  } catch (err) {
    console.warn("Failed to send application status notification:", err.message);
  }

  res.status(201).json({
    message: "Application submitted successfully",
    data: application,
  });
});

// ==============================
// UPDATE APPLICATION STATUS (Recruiter)
// ==============================
export const updateApplicationStatus = asyncHandler(async (req, res) => {
  const { status, rejection_reason } = req.body;

  const application = await JobApplication.findByPk(req.params.id, {
    include: [
      { model: JobPosting, as: "job" },
      {
        model: Candidate,
        as: "candidate",
        include: { model: Profile, as: "profile", include: { model: User, as: "user" } },
      },
    ],
  });

  if (!application) return res.status(404).json({ error: "Application not found" });

  if (application.job.postedBy !== req.user.id) {
    return res.status(403).json({ error: "Not authorized" });
  }

  if (!Object.values(APPLICATION_STATUS).includes(status)) {
    return res.status(400).json({ error: "Invalid status" });
  }

  const updates = { status };
  if (status === APPLICATION_STATUS.REJECTED) {
    updates.rejected_at = new Date();
    updates.rejection_reason = rejection_reason || null;
  }

  await application.update(updates);

  const candidateUser = application.candidate?.profile?.user;
  if (candidateUser) {
    await createNotification({
      senderId: req.user.id,
      recipient: candidateUser,
      type: NOTIFICATION_TYPES.APPLICATION_STATUS_CHANGED,
      content: `Your application status is now "${application.status}"`,
      application,
    });
  }

  res.status(200).json({ message: "Application status updated successfully", data: application });
});

// ==============================
// GET CANDIDATE APPLICATIONS
// ==============================
export const getApplications = asyncHandler(async (req, res) => {
  const { page = 1, limit = 10, status } = req.query;
  const offset = (page - 1) * limit;

  const candidateProfile = await Profile.findOne({
    where: { user_id: req.user.id, role: USER_ROLES.CANDIDATE },
    include: [{ model: Candidate, as: "candidateInfo" }],
  });
  
  if (!candidateProfile) return res.status(403).json({ error: "Only candidates can access applications" });
  const candidate = candidateProfile.candidateInfo;

  const where = { candidate_id: candidate.id };
  if (status) where.status = status;

  const { count, rows } = await JobApplication.findAndCountAll({
    where,
    limit: Number(limit),
    offset,
    include: [
      { model: JobPosting, as: "job" },
      {
        model: Candidate,
        as: "candidate",
        include: { model: Profile, as: "profile", include: { model: User, as: "user" } },
      },
    ],
    order: [["applied_at", "DESC"]],
  });

  res.status(200).json({
    data: rows,
    pagination: { total: count, page: Number(page), limit: Number(limit) },
  });
});


// GET APPLICATION BY ID

export const getApplicationById = asyncHandler(async (req, res) => {
  const application = await JobApplication.findByPk(req.params.id, {
    include: [
      { model: JobPosting, as: "job" },
      {
        model: Candidate,
        as: "candidate",
        include: { model: Profile, as: "profile", include: { model: User, as: "user" } },
      },
    ],
  });

  if (!application) return res.status(404).json({ error: "Application not found" });

  // Only candidate or recruiter can view
  const candidateUserId = application.candidate?.profile?.user?.id;
  if (req.user.id !== candidateUserId && req.user.id !== application.job.postedBy) {
    return res.status(403).json({ error: "Not authorized" });
  }

  res.status(200).json({ data: application });
});

// DELETE APPLICATION

export const deleteApplication = asyncHandler(async (req, res) => {
  const application = await JobApplication.findByPk(req.params.id, {
    include: { model: JobPosting, as: "job" },
  });

  if (!application) return res.status(404).json({ error: "Application not found" });

  const candidateProfile = await Profile.findOne({
    where: { user_id: req.user.id, role: USER_ROLES.CANDIDATE },
    include: [{ model: Candidate, as: "candidateInfo" }],
  });
  const candidateId = candidateProfile?.candidateInfo?.id;

  if (application.candidate_id !== candidateId && application.job.postedBy !== req.user.id) {
    return res.status(403).json({ error: "Not authorized" });
  }

  await application.destroy();
  res.status(200).json({ message: "Application deleted successfully" });
});

// GET RESUME FILE BY APPLICATION ID
export const getResume = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const application = await JobApplication.findByPk(id);
  if (!application) return res.status(404).json({ error: "Application not found" });

  const job = await JobPosting.findByPk(application.job_id);
  if (!job) return res.status(404).json({ error: "Job not found" });

  // Only candidate who applied or recruiter who posted the job
  if (req.user.id !== application.user_id && req.user.id !== job.postedBy) {
    return res.status(403).json({ error: "Not authorized" });
  }

  if (!application.resume) return res.status(404).json({ error: "Resume not uploaded" });

  try {
    // Generate signed URL valid for 5 minutes
    const url = cloudinary.url(application.resumePublicId, {
      type: "authenticated",
      resource_type: "raw",
      expires_at: Math.floor(Date.now() / 1000) + 300, // 5 minutes
    });

    res.json({ url });
  } catch (err) {
    console.error("Failed to generate signed URL:", err.message);
    res.status(500).json({ error: "Failed to load resume" });
  }
});