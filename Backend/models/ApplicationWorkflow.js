import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { JobApplication } from "./JobApplication.js";
import { Recruiter } from "./Recruiter.js";
import { APPLICATION_WORKFLOW_STEPS } from "../config/constants.js";
export const ApplicationWorkflow = sequelize.define("ApplicationWorkflow", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  application_id: { type: DataTypes.UUID, allowNull: false, references: { model: JobApplication, key: "id" }, onDelete: "CASCADE" },
  step: { type: DataTypes.ENUM(...Object.values(APPLICATION_WORKFLOW_STEPS)), allowNull: false },
  performed_by: { type: DataTypes.UUID, references: { model: Recruiter, key: "id" } },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});
