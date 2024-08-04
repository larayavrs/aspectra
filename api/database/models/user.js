'use strict';
const { Model } = require('sequelize');
const crypter_service = require('../../services/crypter');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      verified: DataTypes.BOOLEAN,
      isAdmin: DataTypes.BOOLEAN,
      password: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'User',
      hooks: {
        beforeCreate: async (user) =>
          (user.password = await crypter_service.hash(user.password)),
      },
      defaultScope: { attributes: { exclude: ['password'] } },
      scopes: { withPassword: { attributes: {} } },
    },
  );
  return User;
};
