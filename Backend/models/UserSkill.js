import { DataTypes } from "sequelize";
import { sequelize } from "../config/database.js";
import { User } from "./User.js";
import { Skill } from "./Skill.js";

export const UserSkill = sequelize.define("UserSkill", {
  user_id: { type: DataTypes.UUID, references: { model: User, key: "id" }, primaryKey: true },
  skill_id: { type: DataTypes.UUID, references: { model: Skill, key: "id" }, primaryKey: true },
});
