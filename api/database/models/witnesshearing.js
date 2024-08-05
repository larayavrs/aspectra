'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class WitnessHearing extends Model {
    static associate(models) {
      WitnessHearing.belongsTo(models.Audience, {
        foreignKey: 'audienceId',
        as: 'audience',
      });
      // TODO: Add the association with the Person model
    }
  }
  WitnessHearing.init(
    {
      audienceId: DataTypes.INTEGER,
      personId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'WitnessHearing',
    },
  );
  return WitnessHearing;
};
