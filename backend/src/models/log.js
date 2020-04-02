'use strict';
module.exports = (sequelize, DataTypes) => {
  const Log = sequelize.define('Log', {
    userId: DataTypes.STRING,
    calorieIntake: DataTypes.FLOAT,
    exerciseTime: DataTypes.FLOAT,
    mood: DataTypes.STRING,
    vitaminTaken: DataTypes.BOOLEAN,
    energyLevel: DataTypes.INTEGER,
    sleepQuality: DataTypes.INTEGER,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE
  }, {});
  Log.associate = function(models) {
    Log.belongsTo(models.User, {foreignKey: 'userId'})
  };
  return Log;
};