const express = require('express');
const { celebrate, Segments, Joi } = require('celebrate');

const UserController = require('./controllers/UserController');

const routes = express.Router();

routes.get('/profile/:id', celebrate({
  [Segments.PARAMS]: Joi.object().keys({
    id: Joi.string().required(),
  })
}), UserController.profile),

routes.post('/users', celebrate({
  [Segments.BODY]: Joi.object().keys({
    firstName: Joi.string().required().min(1),
    lastName: Joi.string().required().min(1),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(5)
  })
}), UserController.create);

module.exports = routes;