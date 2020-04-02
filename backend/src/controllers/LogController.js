const { Log } = require('../models/');
const Sequelize = require('sequelize');
const moment = require('moment');
const Op = Sequelize.Op;

function moodIsValid( params = '' ){
  switch(params) {
    case 'happy':
      return true;
    case 'calm':
      return true;
    case 'sad':
      return true;
    case 'annoyed':
      return true;
    default:
      return false;
  };
};

function filterTypeIsValid ( params = '' ){
  switch(params) {
    //Greater than or equal
    case 'gte':
      return true;
    //Less than or equal
    case 'lte':
      return true;
    default:
      return false;
  };
};

function createOperatorFilter( filterType, filterValue ){
  switch(filterType) {
    //Greater than or equal
    case 'gte':
      return { [Op.gte]: filterValue };
    //Less than or equal
    case 'lte':
      return { [Op.lte]: filterValue };;
    default:
      return {};
  };
};

function invalidMoodError() {
  return {error:'Invalid mood entry.'};
};

//index filters available:
//moodFilter: Takes a string containing which mood user wants to use as a filter

module.exports = {
  async index(req, res) {
    const { page=1 } = req.query;
    const { userId } = req;
    let { moodFilter,
      exerciseTimeFilter, exerciseTimeFilterType 
    } = req.query;

    let whereParams = { userId: userId };
    
    // If there is a moodFilter, check whether it is valid. If yes, add it to the query whereParams
    if(moodFilter){
      moodFilter = moodFilter.toLowerCase();
      if (!moodIsValid(moodFilter)){
        return res.status(400).json(invalidMoodError());
      } else {
        whereParams.mood = moodFilter;
      };
    };

    // exerciseTimeFilter
    if(exerciseTimeFilter){
      if(!exerciseTimeFilterType){
        return res.status(400).json({error: 'Missing exerciseTimeFilterType.'});
      };
      //Check whether exerciseTimeFilterType is valid
      exerciseTimeFilterType = exerciseTimeFilterType.toLowerCase();
      if(!filterTypeIsValid(exerciseTimeFilterType)){
        return res.status(400).json({error: 'Invalid exerciseTimeFilterType.'});
      };
      whereParams.exerciseTime = createOperatorFilter(exerciseTimeFilterType, exerciseTimeFilter);
    };

    const { rows, count } = await Log.findAndCountAll({
      attributes: { exclude: ['UserId'] },
      where: whereParams,
      limit: 5,
      offset:((page-1)*5),
     }
    );

    res.header('X-Total-Count', count);

    return res.json(rows);
  },

  async create(req, res) {
    const { userId } = req;
    const { calorieIntake, exerciseTime, vitaminTaken, energyLevel, sleepQuality } = req.body;
    let { mood } = req.body;
    mood = mood.toLowerCase();
    if(moodIsValid(mood)){
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
          return res.status(400).json({error:'Only one diary entry allowed per day'});
        };
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
        return res.status(400).json({ error: 'Error creating new diary log.' });
      };
    } else {
      return res.status(400).json(invalidMoodError());
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