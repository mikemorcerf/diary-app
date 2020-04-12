// Diary app API
// Author: Michael de Morcerf e Moura
// LinkedIn: https://www.linkedin.com/in/michaelmoura/
// Github: https://github.com/mikemorcerf

const { Log } = require('../models/');
const Sequelize = require('sequelize');
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
  }
}

function attributeIsValid( params = '' ){
  switch(params) {
    case 'calorieIntake':
      return true;
    case 'exerciseTime':
      return true;
    case 'vitaminTaken':
      return true;
    case 'energyLevel':
      return true;
    case 'sleepQuality':
      return true;
    default:
      return false;
  }
}

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
  }
}

function createOperatorFilter( filterType, filterValue ){
  switch(filterType) {
    //Greater than or equal
    case 'gte':
      return { [Op.gte]: filterValue };
    //Less than or equal
    case 'lte':
      return { [Op.lte]: filterValue };
    default:
      return {};
  }
}

function invalidMoodError() {
  return {error:'Invalid mood entry.'};
}

module.exports = {
  async index(req, res) {
    const { page=1 } = req.query;
    const { userId } = req;
    let { 
      moodFilter,
      exerciseTimeFilter, exerciseTimeFilterType,
      vitaminTakenFilter,
      energyLevelFilter, energyLevelFilterType,
      sleepQualityFilter, sleepQualityFilterType,
      calorieIntakeFilter, calorieIntakeFilterType,
      filterOrderAttribute = 'id', filterOrder = 'DESC'
    } = req.query;

    let whereParams = { userId: userId };

    // filterOrderAttribute is id by default. In case it is changed, check whether it is valid
    if(filterOrderAttribute!=='id'){
      if(!attributeIsValid(filterOrderAttribute)){
        return res.status(400).json({error:'Wrong filterOrderAttribute. Please check spelling as attribute is case sensitive.'});
      }
    }

    // filterOrder is DESC (Descending) by default. In case it is changed, check whether it is valid
    if(filterOrder!=='DESC'){
      filterOrder = filterOrder.toUpperCase();
      if(filterOrder!=='DESC' && filterOrder!=='ASC'){
        return res.status(400).json({error: 'Invalid value for filterOrder. Must be DESC (Descending) or ASC (Ascending).'});
      }
    }
    
    // If there is a moodFilter, check whether it is valid. If yes, add it to the query whereParams
    if(moodFilter){
      moodFilter = moodFilter.toLowerCase();
      if (!moodIsValid(moodFilter)){
        return res.status(400).json(invalidMoodError());
      } else {
        whereParams.mood = moodFilter;
      }
    }

    // If there is a exerciseTimeFilter, check whether it is valid. If yes, add it to the query whereParams
    if(exerciseTimeFilter){
      if(!exerciseTimeFilterType){
        return res.status(400).json({error: 'Missing exerciseTimeFilterType.'});
      }
      //Check whether exerciseTimeFilterType is valid
      exerciseTimeFilterType = exerciseTimeFilterType.toLowerCase();
      if(!filterTypeIsValid(exerciseTimeFilterType)){
        return res.status(400).json({error: 'Invalid exerciseTimeFilterType.'});
      }
      whereParams.exerciseTime = createOperatorFilter(exerciseTimeFilterType, exerciseTimeFilter);
    }

    // If there is a calorieIntakeFilter, check whether it is valid. If yes, add it to the query whereParams
    if(calorieIntakeFilter){
      if(!calorieIntakeFilterType){
        return res.status(400).json({error: 'Missing calorieIntakeFilterType.'});
      }
      //Check whether calorieIntakeFilterType is valid
      calorieIntakeFilterType = calorieIntakeFilterType.toLowerCase();
      if(!filterTypeIsValid(calorieIntakeFilterType)){
        return res.status(400).json({error: 'Invalid calorieIntakeFilterType.'});
      }
      whereParams.calorieIntake = createOperatorFilter(calorieIntakeFilterType, calorieIntakeFilter);
    }

    // If there is a vitaminTakenFilter, add it to the query whereParams
    if(vitaminTakenFilter===true || vitaminTakenFilter===false){
      whereParams.vitaminTaken = vitaminTakenFilter;
    }

    // If there is an energyLevelFilter, check whether it is valid. If yes, add it to the query whereParams
    if(energyLevelFilter){
      if(!energyLevelFilterType){
        return res.status(400).json({error: 'Missing energyLevelFilterType.'});
      }
      //Check whether energyLevelFilterType is valid
      energyLevelFilterType = energyLevelFilterType.toLowerCase();
      if(!filterTypeIsValid(energyLevelFilterType)){
        return res.status(400).json({error: 'Invalid energyLevelFilterType.'});
      }
      whereParams.energyLevel = createOperatorFilter(energyLevelFilterType, energyLevelFilter);
    }

    // If there is a sleepQualityFilter, check whether is is valid. If yes, add it to the query whereParams
    if(sleepQualityFilter){
      if(!sleepQualityFilterType){
        return res.status(400).json({error: 'Missing sleepQualityFilterType.'});
      }
      //Check whether sleepQualityFilterType is valid
      sleepQualityFilterType = sleepQualityFilterType.toLowerCase();
      if(!filterTypeIsValid(sleepQualityFilterType)){
        return res.status(400).json({error: 'Invalid sleepQualityFilterType.'});
      }
      whereParams.sleepQuality = createOperatorFilter(sleepQualityFilterType, sleepQualityFilter);
    }

    const { rows, count } = await Log.findAndCountAll({
      order: [[filterOrderAttribute, filterOrder]],
      attributes: { exclude: ['UserId'] },
      where: whereParams,
      limit: 5,
      offset:((page-1)*5),
     }
    );

    res.set('X-Total-Count', count);

    return res.json(rows);
  },

  async fetchLog(req, res) {
    const { userId } = req;
    const { id } = req.params;

    try{
      const logToFetch = await Log.findOne({
        attributes: { exclude: ['UserId'] },
        where: {
          userId: userId,
          id: id,
        },
      });

      if(!logToFetch){
        return res.status(400).json({error:'Record not found, or user does not have permission to edit this record.'});
      }

      return res.json(logToFetch);

    } catch (err) {
      return res.status(400).json({error:'Error fetching log entry.'});
    }
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
        return res.status(201).json(newEntry);
      } catch (err) {
        console.log(err);
        return res.status(400).json({ error: 'Error creating new diary log.' });
      }
    } else {
      return res.status(400).json(invalidMoodError());
    }
  },



  async delete(req, res) {
    const { userId } = req;
    const { id } = req.params;

    try{
      const logToDelete = await Log.findOne({
        attributes: { exclude: ['UserId'] },
        where: {
          userId: userId,
          id: id,
        },
      });

      if(!logToDelete){
        return res.status(400).json({error:'Record not found, or user does not have permission to delete this record.'});
      }

      await logToDelete.destroy();
      return res.status(204).send();

    } catch (err) {
      return res.status(400).json({error:'Error deleting log entry.'});
    }
  },



  async update(req, res) {
    const { userId } = req;
    const { id } = req.params;
    const { calorieIntake, exerciseTime, mood, vitaminTaken, energyLevel, sleepQuality } = req.body;

    try {
      const logToUpdate = await Log.findOne({
        attributes: { exclude: ['UserId'] },
        where: {
          userId: userId,
          id: id,
        },
      });

      if(!logToUpdate){
        return res.status(400).json({error:'Record not found, or user does not have permission to update this record.'});
      }

      if (calorieIntake) { logToUpdate.calorieIntake = calorieIntake}
      if (exerciseTime) { logToUpdate.exerciseTime = exerciseTime}
      if (vitaminTaken) { logToUpdate.vitaminTaken = vitaminTaken}
      if (energyLevel) { logToUpdate.energyLevel = energyLevel}
      if (sleepQuality) { logToUpdate.sleepQuality = sleepQuality}
      if (mood) { logToUpdate.mood = mood}

      await logToUpdate.save();

      return res.json(logToUpdate);

    } catch (err) {
      return res.status(400).json({ error: 'Error updating record.' });
    }
  },
}