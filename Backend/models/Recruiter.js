import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Profile } from "./Profile.js";

export const Recruiter = sequelize.define("Recruiter", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  profileId: { type: DataTypes.UUID, allowNull: false, unique: true, references: { model: Profile, key: "id" } },
  department: { type: DataTypes.STRING },
  positionTitle: { type: DataTypes.STRING },
  workEmail: { type: DataTypes.STRING },
  phoneExtension: { type: DataTypes.STRING },
  notes: { type: DataTypes.TEXT },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});