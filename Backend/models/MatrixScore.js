import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { JobApplication } from "./JobApplication.js";
import { ScoreAttribute } from "./ScoreAttribute.js";

export const MatrixScore = sequelize.define("MatrixScore", {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  application_id: { type: DataTypes.UUID, allowNull: false, references: { model: JobApplication, key: "id" }, onDelete: "CASCADE" },
  stage_name: { type: DataTypes.STRING, allowNull: false },
  attribute_id: { type: DataTypes.UUID, allowNull: false, references: { model: ScoreAttribute, key: "id" }, onDelete: "CASCADE" },
  score: { type: DataTypes.INTEGER },
  interview_note: { type: DataTypes.TEXT },
  created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
});
