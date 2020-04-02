'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Logs', {
      id: {
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        unique: true
      },
      userId: {
        type: Sequelize.STRING,
        allowNull: false,
        // Logs belog to User
        references: {
          model: 'Users',
          key: 'id'
        }
      },
      calorieIntake: {
        type: Sequelize.FLOAT
      },
      exerciseTime: {
        type: Sequelize.FLOAT
      },
      mood: {
        type: Sequelize.STRING
      },
      vitaminTaken: {
        type: Sequelize.BOOLEAN
      },
      energyLevel: {
        type: Sequelize.INTEGER
      },
      sleepQuality: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Logs');
  }
};