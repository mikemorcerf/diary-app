const { Log } = require('../models/');

module.exports = {
  async create(req, res) {
    const { userId, calorieIntake, exerciseTime, mood, vitaminTaken, energyLevel, sleepQuality, createdAt } = req.body;
  },
  // userId: DataTypes.STRING,
  // calorieIntake: DataTypes.FLOAT,
  // exerciseTime: DataTypes.FLOAT,
  // mood: DataTypes.STRING,
  // vitaminTaken: DataTypes.BOOLEAN,
  // energyLevel: DataTypes.INTEGER,
  // sleepQuality: DataTypes.INTEGER,
  // createdAt: DataTypes.DATE,
  // updatedAt: DataTypes.DATE
};