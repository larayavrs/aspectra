'use strict';

const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Audience extends Model {
    static associate(models) {
      // define association here
    }
  }
  Audience.init(
    {
      date: DataTypes.DATE,
      courtNumber: DataTypes.STRING,
      expedient: DataTypes.STRING,
      jurisdiction: DataTypes.STRING,
      schedule: DataTypes.TIME,
      inPerson: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'Audience',
    },
  );
  return Audience;
};
