import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { JobApplication } from "./JobApplication.js";
import { HR } from "./Recruiter.js";

export const InterviewSchedule = sequelize.define("InterviewSchedule", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  application_id: { type: DataTypes.UUID, allowNull: false, references: { model: JobApplication, key: "id" }, onDelete: "CASCADE" },
  scheduled_by: { type: DataTypes.UUID, allowNull: false, references: { model: Recruiter, key: "id" }, onDelete: "CASCADE" },
  scheduled_at: { type: DataTypes.DATE },
  location: { type: DataTypes.STRING },
  interview_type: { type: DataTypes.STRING },
  title: { type: DataTypes.STRING },
  description: { type: DataTypes.TEXT },
  duration: { type: DataTypes.INTEGER },
  meeting_link: { type: DataTypes.STRING },
  notes: { type: DataTypes.TEXT },
  status: { type: DataTypes.STRING },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});
