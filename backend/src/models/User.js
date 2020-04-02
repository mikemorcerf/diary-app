// Diary app API
// Author: Michael de Morcerf e Moura
// LinkedIn: https://www.linkedin.com/in/michaelmoura/
// Github: https://github.com/mikemorcerf

'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
  });
  User.associate = function(models) {
    User.hasMany(models.Log, {as: 'logs'})
  };
  return User;
}