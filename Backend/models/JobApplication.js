import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { JobPosting } from "./JobPosting.js";
import { Candidate } from "./Candidate.js";
import { APPLICATION_STATUS } from "../config/constants.js";
export const JobApplication = sequelize.define("JobApplication", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  job_id: { type: DataTypes.UUID, allowNull: false, references: { model: JobPosting, key: "id" }, onDelete: "CASCADE" },
  candidate_id: { type: DataTypes.UUID, allowNull: false, references: { model: Candidate, key: "id" }, onDelete: "CASCADE" },
  resume: { type: DataTypes.STRING, allowNull: false }, // URL as string
  cover_letter: { type: DataTypes.STRING }, 
  extracted_text: { type: DataTypes.TEXT },
  cover_letter_text: { type: DataTypes.TEXT },
  ai_analysis: { type: DataTypes.JSONB },
  cover_letter_score: { type: DataTypes.INTEGER },
  missing_skills: { type: DataTypes.JSONB },
  status: { type: DataTypes.ENUM(...Object.values(APPLICATION_STATUS)), defaultValue: APPLICATION_STATUS.APPLIED },
  applied_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  rejected_at: { type: DataTypes.DATE },
  rejection_reason: { type: DataTypes.TEXT },
  interview_id: { type: DataTypes.UUID, references: { model: "InterviewSchedules", key: "id" } },
  score: { type: DataTypes.FLOAT },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
}, { indexes: [{ fields: ["job_id", "candidate_id"], unique: true }, { fields: ["status"] }] });
