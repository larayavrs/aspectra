'use strict';

const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class LawyerHearing extends Model {
    static associate(models) {
      LawyerHearing.belongsTo(models.Audience, {
        foreignKey: 'audienceId',
        as: 'audience',
      });
      LawyerHearing.belongsTo(models.Person, {
        foreignKey: 'personId',
        as: 'person',
      });
    }
  }
  LawyerHearing.init(
    {
      audienceId: DataTypes.INTEGER,
      personId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'LawyerHearing',
    },
  );
  return LawyerHearing;
};
