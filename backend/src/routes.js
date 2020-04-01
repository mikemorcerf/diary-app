const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');
const authMiddleware = require('../middlewares/auth');

const UserController = require('./controllers/UserController');

const routes = express.Router();
routes.use('/profile', authMiddleware);

// Routes to Users
routes.get('/profile/', celebrate({
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

module.exports = routes;