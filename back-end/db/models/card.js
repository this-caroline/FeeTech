'use strict';
var User = require('./user');

module.exports = (sequelize, DataTypes) => {
  var Card = sequelize.define('Card', {
    card_name: DataTypes.STRING,
    removed: DataTypes.INTEGER,
    amount: DataTypes.INTEGER,
  }, {});
  Card.associate = function(models) {
    Card.belongsTo(models.User,{
      foreignKey: 'user_id',
      onDelete: 'CASCADE'
    });

  };
  return Card;
};