const { Log } = require('../models/');
const Sequelize = require('sequelize');
const moment = require('moment');
const Op = Sequelize.Op;

module.exports = {
  async create(req, res) {
    const { userId } = req;
    const { calorieIntake, exerciseTime, vitaminTaken, energyLevel, sleepQuality } = req.body;
    let { mood } = req.body;
    mood = mood.toLowerCase();
    switch(mood) {
      case 'happy':
        break;
      case 'calm':
        break;
      case 'sad':
        break;
      case 'annoyed':
        break;
      default:
        res.status(400).json({error:'Invalid mood entry.'});
    }

    try{
      const lastEntry = await Log.findOne({
        attributes: { exclude: ['UserId'] },
        where: {
          userId: userId,
          createdAt: {
            [Op.gte]: new Date(new Date().getFullYear(), new Date().getMonth() ,new Date().getDate())
          },
        },
      });
      if(lastEntry){
        res.status(400).json({error:'Only one diary entry allowed per day'});
      }
      const newEntry = await Log.create({
        userId: userId,
        calorieIntake,
        exerciseTime,
        mood,
        vitaminTaken,
        energyLevel,
        sleepQuality,
      });
      res.json(newEntry);
    } catch (err) {
      console.log(err);
      res.status(400).json({ error: 'Error creating new diary log.' });
    };
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