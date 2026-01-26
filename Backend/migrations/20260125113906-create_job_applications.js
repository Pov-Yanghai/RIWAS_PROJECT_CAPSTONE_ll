'use strict';

export async function up(queryInterface, Sequelize) {
  await queryInterface.createTable('JobApplications', {
    id: { type: Sequelize.UUID, defaultValue: Sequelize.UUIDV4, primaryKey: true },
    job_id: { 
      type: Sequelize.UUID, 
      allowNull: false, 
      references: { model: 'JobPostings', key: 'id' }, 
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE' 
    },
    user_id: { 
      type: Sequelize.UUID, 
      allowNull: false, 
      references: { model: 'Users', key: 'id' }, 
      onDelete: 'CASCADE', 
      onUpdate: 'CASCADE' 
    },
    resume: { type: Sequelize.STRING, allowNull: false },
    cover_letter: { type: Sequelize.STRING },
    extracted_text: { type: Sequelize.TEXT },
    cover_letter_text: { type: Sequelize.TEXT },
    ai_analysis: { type: Sequelize.JSONB },
    cover_letter_score: { type: Sequelize.FLOAT },
    missing_skills: { type: Sequelize.JSONB },
    status: { 
      type: Sequelize.ENUM('applied','rejected','interview','hired'), 
      defaultValue: 'applied' 
    },
    applied_at: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    rejected_at: { type: Sequelize.DATE },
    rejection_reason: { type: Sequelize.TEXT },
    interview_id: { 
      type: Sequelize.UUID, 
      references: { model: 'InterviewSchedules', key: 'id' } 
    },
    score: { type: Sequelize.FLOAT },
    createdAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
    updatedAt: { type: Sequelize.DATE, defaultValue: Sequelize.NOW },
  });

  // indexes
  await queryInterface.addIndex('JobApplications', ['job_id', 'user_id'], { unique: true });
  await queryInterface.addIndex('JobApplications', ['status']);
}

export async function down(queryInterface, Sequelize) {
  await queryInterface.dropTable('JobApplications');
}
