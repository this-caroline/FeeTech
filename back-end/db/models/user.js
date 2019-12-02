'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    removed: DataTypes.INTEGER,
    name: DataTypes.STRING,
    birth_date: DataTypes.STRING,
    email: DataTypes.STRING,
    cpf: DataTypes.INTEGER,
    password: DataTypes.STRING,
  }, {});

  return User;
};