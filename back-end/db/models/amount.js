'use strict';

module.exports = (sequelize, DataTypes) => {
  var Amount = sequelize.define('Amount_available', {
    amount_available: DataTypes.INTEGER,
  }, {});
  return Amount;
};