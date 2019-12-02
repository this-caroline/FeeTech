'use strict';
var User = require('./user');

module.exports = (sequelize, DataTypes) => {
  var Card = sequelize.define('Card', {
    card_name: DataTypes.STRING,
    removed: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
  }, {});
  Card.associate = function(models) {
    Card.hasOne(models.User,{
      foreignKey: 'id',
      as: 'user_id'
    });

  };
  return Card;
};