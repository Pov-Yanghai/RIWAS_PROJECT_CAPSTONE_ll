import { ApplicationWorkflow } from "../models/ApplicationWorkflow.js";
import { JobApplication } from "../models/JobApplication.js";
import { Recruiter } from "../models/Recruiter.js";
import { Candidate } from "../models/Candidate.js";
import { Profile } from "../models/Profile.js";
import { asyncHandler } from "../middlewares/errorHandler.js";
import { WORKFLOW_STEP, USER_ROLES } from "../config/constants.js";


// Add workflow step to an application

export const addWorkflowStep = asyncHandler(async (req, res) => {
  const { applicationId, step } = req.body;

  // Validate step
  if (!Object.values(WORKFLOW_STEP).includes(step)) {
    return res.status(400).json({
      error: "Invalid workflow step",
    });
  }

  // Validate application
  const application = await JobApplication.findByPk(applicationId);
  if (!application) {
    return res.status(404).json({
      error: "Application not found",
    });
  }

  // Get recruiter from logged-in user
  const recruiter = await Recruiter.findOne({
    where: { user_id: req.user.id },
  });

  if (!recruiter) {
    return res.status(404).json({
      error: "Recruiter record not found. Cannot add workflow step.",
    });
  }

  // Prevent duplicate workflow step
  const existingStep = await ApplicationWorkflow.findOne({
    where: {
      application_id: applicationId,
      step,
    },
  });

  if (existingStep) {
    return res.status(400).json({
      error: "This workflow step already exists for this application",
    });
  }

  // Create workflow step
  const workflow = await ApplicationWorkflow.create({
    application_id: applicationId,
    step,
    performed_by: recruiter.id, 
  });

  res.status(201).json({
    message: "Workflow step added successfully",
    data: workflow,
  });
});


// Get workflow steps by application

export const getWorkflowByApplication = asyncHandler(async (req, res) => {
  const { applicationId } = req.params;

  const application = await JobApplication.findByPk(applicationId);
  if (!application) return res.status(404).json({ error: "Application not found" });

  // Candidates can only read workflows for their own applications
  if (req.user.role === USER_ROLES.CANDIDATE) {
    const candidateProfile = await Profile.findOne({
      where: { user_id: req.user.id, role: USER_ROLES.CANDIDATE },
      include: [{ model: Candidate, as: "candidateInfo" }],
    });
    const candidateId = candidateProfile?.candidateInfo?.id;
    if (!candidateId || application.candidate_id !== candidateId) {
      return res.status(403).json({ error: "Not authorized" });
    }
  }

  const workflows = await ApplicationWorkflow.findAll({
    where: { application_id: applicationId },
    order: [["created_at", "ASC"]],
  });

  res.status(200).json({
    data: workflows,
  });
});

// Updated Delete function on 2/3/2026
// Delete workflow step 

export const deleteWorkflowStep = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const workflow = await ApplicationWorkflow.findByPk(id);

  if (!workflow) {
    return res.status(404).json({ error: "Workflow step not found" });
  }

  await workflow.destroy();

  res.status(200).json({
    message: "Workflow step deleted successfully",
  });
});