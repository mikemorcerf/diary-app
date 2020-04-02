'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE,
    passwordResetToken: DataTypes.STRING,
    passwordResetExpires: DataTypes.DATE
  });
  User.associate = function(models) {
    User.hasMany(models.Log, {as: 'logs'})
  };
  return User;
}