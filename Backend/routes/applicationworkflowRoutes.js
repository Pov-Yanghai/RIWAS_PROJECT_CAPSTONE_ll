import express from "express";
import {
  addWorkflowStep,
  getWorkflowByApplication,
  deleteWorkflowStep,
} from "../controllers/applicationworkflowController.js";

import { authenticate, authorize } from "../middlewares/auth.js";
import { USER_ROLES } from "../config/constants.js";

const router = express.Router();

router.post(
  "/",
  authenticate,
  authorize(USER_ROLES.RECRUITER),
  addWorkflowStep
);

router.get(
  "/:applicationId",
  authenticate,
  getWorkflowByApplication
);

// Updated delete workflow Routes

router.delete(
  "/:id",
  authenticate,
  authorize(USER_ROLES.RECRUITER),
  deleteWorkflowStep
);

export default router;
