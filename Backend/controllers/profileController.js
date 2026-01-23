import { Profile } from "../models/Profile.js";
import { User } from "../models/User.js";
import { Candidate } from "../models/Candidate.js";
import { Recruiter } from "../models/Recruiter.js";
import { asyncHandler } from "../middlewares/errorHandler.js";

/**
 * =========================
 * Create Profile
 * =========================
 */
export const createProfile = asyncHandler(async (req, res) => {
  // Check if profile already exists
  const existingProfile = await Profile.findOne({
    where: { userId: req.user.id },
  });

  if (existingProfile) {
    return res.status(409).json({ error: "Profile already exists" });
  }

  // Create base profile
  const profile = await Profile.create({
    userId: req.user.id,
    role: req.user.role,
    bio: req.body.bio,
    avatarUrl: req.file ? req.file.path : null,
    headline: req.body.headline,
    about: req.body.about,
    experience: req.body.experience,
    websiteUrl: req.body.websiteUrl,
    github: req.body.github,
    linkedin: req.body.linkedin,
    twitter: req.body.twitter,
  });

  // Create candidate info
  if (req.user.role === "candidate" && req.body.candidateInfo) {
    await Candidate.create({
      profileId: profile.id,
      resumeUrl: req.body.candidateInfo.resumeUrl || null,
      education: req.body.candidateInfo.education || null,
      experience: req.body.candidateInfo.experience || null,
      summary: req.body.candidateInfo.summary || null,
    });
  }

  // Create recruiter info
  if (req.user.role === "recruiter" && req.body.recruiterInfo) {
    await Recruiter.create({
      profileId: profile.id,
      department: req.body.recruiterInfo.department || null,
      positionTitle: req.body.recruiterInfo.positionTitle || null,
      workEmail: req.body.recruiterInfo.workEmail || null,
      phoneExtension: req.body.recruiterInfo.phoneExtension || null,
      notes: req.body.recruiterInfo.notes || null,
    });
  }

  // Load full profile with relations
  const fullProfile = await Profile.findOne({
    where: { id: profile.id },
    include: [
      { model: Candidate, as: "candidateInfo" },
      { model: Recruiter, as: "recruiterInfo" },
    ],
  });

  res.status(201).json({
    message: "Profile created successfully",
    data: fullProfile,
  });
});

/**
 * =========================
 * Get Profile by User ID
 * =========================
 */
export const getProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    where: { userId: req.params.userId },
    include: [
      { model: User, as: "user", attributes: { exclude: ["password"] } },
      { model: Candidate, as: "candidateInfo" },
      { model: Recruiter, as: "recruiterInfo" },
    ],
  });

  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  res.status(200).json({ data: profile });
});

/**
 * =========================
 * Update Profile
 * =========================
 */
export const updateProfile = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    where: { userId: req.user.id },
  });

  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  // Only allow profile fields to be updated
  const allowedProfileFields = [
    "headline",
    "about",
    "experience",
    "websiteUrl",
    "github",
    "linkedin",
    "twitter",
  ];

  const profileUpdates = Object.fromEntries(
    Object.entries(req.body).filter(([key]) =>
      allowedProfileFields.includes(key)
    )
  );

  if (req.file) {
    profileUpdates.avatarUrl = req.file.path;
  }

  await profile.update(profileUpdates);

  // Update candidate info
  if (req.user.role === "candidate" && req.body.candidateInfo) {
    await Candidate.update(req.body.candidateInfo, {
      where: { profileId: profile.id },
    });
  }

  // Update recruiter info
  if (req.user.role === "recruiter" && req.body.recruiterInfo) {
    await Recruiter.update(req.body.recruiterInfo, {
      where: { profileId: profile.id },
    });
  }

  // Reload full profile
  const updatedProfile = await Profile.findOne({
    where: { id: profile.id },
    include: [
      { model: Candidate, as: "candidateInfo" },
      { model: Recruiter, as: "recruiterInfo" },
    ],
  });

  res.status(200).json({
    message: "Profile updated successfully",
    data: updatedProfile,
  });
});

/**
 * =========================
 * Increment Profile Views
 * =========================
 */
export const incrementProfileViews = asyncHandler(async (req, res) => {
  const profile = await Profile.findOne({
    where: { userId: req.params.userId },
  });

  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }

  await profile.increment("views");

  res.status(200).json({ message: "Profile view counted" });
});
