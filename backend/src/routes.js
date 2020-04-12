// Diary app API
// Author: Michael de Morcerf e Moura
// LinkedIn: https://www.linkedin.com/in/michaelmoura/
// Github: https://github.com/mikemorcerf

const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const authMiddleware = require('../middlewares/auth');

const UserController = require('./controllers/UserController');
const LogController = require('./controllers/LogController');

const routes = express.Router();
routes.use('/profile', authMiddleware);

// Routes to Users
routes.get('/profile', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
}), UserController.profile),

routes.post('/register', celebrate({
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string().required().min(1),
    lastName: Joi.string().required().min(1),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5)
  })
}), UserController.create);

routes.post('/authenticate', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5)
  })
}), UserController.authenticate);

routes.post('/forgot_password', celebrate({
  [Segments.BODY]: Joi.object().keys({
    email: Joi.string().required().email()
  })
}), UserController.forgotPassword);

routes.post('/reset_password', celebrate({
  [Segments.BODY]: Joi.object().keys({
    token: Joi.string().required(),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5)
  })
}), UserController.resetPassword);





// Routes to Logs
routes.get('/profile/logs', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().min(1).required(),
    moodFilter: Joi.string().min(3).max(7),
    exerciseTimeFilter: Joi.number().min(0.001).max(24.0),
    exerciseTimeFilterType: Joi.string().length(3),
    vitaminTakenFilter: Joi.boolean(),
    energyLevelFilter: Joi.number().min(1).max(5),
    energyLevelFilterType: Joi.string().length(3),
    sleepQualityFilter: Joi.number().min(1).max(5),
    sleepQualityFilterType: Joi.string().length(3),
    calorieIntakeFilter: Joi.number().min(0.1).max(35000.0),
    calorieIntakeFilterType: Joi.string().length(3),
    filterOrderAttribute: Joi.string(),
    filterOrder: Joi.string().min(3).max(4)
  })
}), LogController.index);

routes.get('/profile/logs/:id', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), LogController.fetchLog);

routes.post('/profile/logs', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.BODY]: Joi.object().keys({
    calorieIntake: Joi.number().required().min(0.1).max(35000.0),
    exerciseTime: Joi.number().required().min(0.001).max(24.0),
    mood: Joi.string().required().min(3).max(7),
    vitaminTaken: Joi.boolean().required(),
    energyLevel: Joi.number().required().min(1).max(5),
    sleepQuality: Joi.number().required().min(1).max(5)
  })
}), LogController.create);

routes.delete('/profile/logs/:id', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  })
}), LogController.delete);

routes.put('/profile/logs/:id', celebrate({
  [Segments.HEADERS]: Joi.object({
    authorization: Joi.string().required(),
  }).unknown(),
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.number().required(),
  }),
  [Segments.BODY]: Joi.object().keys({
    calorieIntake: Joi.number().min(0.1).max(35000.0),
    exerciseTime: Joi.number().min(0.001).max(24.0),
    mood: Joi.string().min(3).max(7),
    vitaminTaken: Joi.boolean(),
    energyLevel: Joi.number().min(1).max(5),
    sleepQuality: Joi.number().min(1).max(5)
  }).or('calorieIntake', 'exerciseTime', 'mood', 'vitaminTaken', 'energyLevel', 'sleepQuality'),
}), LogController.update);

module.exports = routes;