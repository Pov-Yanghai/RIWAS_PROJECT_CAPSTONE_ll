import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { Profile } from "./Profile.js";

export const Candidate = sequelize.define("Candidate", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  profileId: { type: DataTypes.UUID, allowNull: false, unique: true, references: { model: Profile, key: "id" } },
  resumeUrl: { type: DataTypes.STRING, allowNull: true },
  education: { type: DataTypes.JSONB, allowNull: true },
  experience: { type: DataTypes.JSONB, allowNull: true },
  summary: { type: DataTypes.TEXT, allowNull: true },
  createdAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updatedAt: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});
