import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { JobApplication } from "./JobApplication.js";
import { Recruiter } from "./Recruiter.js";
import { APPLICATION_STATUS } from "../config/constants.js";
export const ApplicationStatusHistory = sequelize.define("ApplicationStatusHistory", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  application_id: { type: DataTypes.UUID, allowNull: false, references: { model: JobApplication, key: "id" }, onDelete: "CASCADE" },
  old_status: { type: DataTypes.ENUM(...Object.values(APPLICATION_STATUS)), },
  new_status: { type: DataTypes.ENUM(...Object.values(APPLICATION_STATUS)) },
  changed_by: { type: DataTypes.UUID, allowNull: false, references: { model: Recruiter, key: "id" }, onDelete: "CASCADE" },
  changed_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  notes: { type: DataTypes.TEXT },
});
