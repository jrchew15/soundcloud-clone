'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Image, {
        foreignKey: 'imageableId'
      });
      User.hasMany(models.Album, {
        foreignKey: 'userId'
      });
      User.hasMany(models.Song, {
        foreignKey: 'userId'
      });
      User.hasMany(models.Playlist, {
        foreignKey: 'userId'
      });
      User.hasMany(models.Comment, {
        foreignKey: 'userId'
      });
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    hashedPassword: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true
      }
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
