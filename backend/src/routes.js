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
  [Segments.QUERY]: Joi.object().keys({
    page: Joi.number().required(),
    moodFilter: Joi.string(),
    exerciseTimeFilter: Joi.number(),
    exerciseTimeFilterType: Joi.string().length(3),
    vitaminTakenFilter: Joi.boolean()
  })
}), LogController.index);

routes.post('/profile/logs', celebrate({
  [Segments.BODY]: Joi.object().keys({
    calorieIntake: Joi.number().required(),
    exerciseTime: Joi.number().required(),
    mood: Joi.string().required(),
    vitaminTaken: Joi.boolean().required(),
    energyLevel: Joi.number().required(),
    sleepQuality: Joi.number().required(),
  })
}), LogController.create);

module.exports = routes;