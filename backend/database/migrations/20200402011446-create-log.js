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
        type: Sequelize.FLOAT,
        allowNull: false
      },
      exerciseTime: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      mood: {
        type: Sequelize.STRING,
        allowNull: false
      },
      vitaminTaken: {
        type: Sequelize.BOOLEAN,
        allowNull: false
      },
      energyLevel: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      sleepQuality: {
        type: Sequelize.INTEGER,
        allowNull: false
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