'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Playlist.belongsToMany(models.Song, {
        through: 'PlaylistSong',
        otherKey: 'songId',
        foreignKey: 'playlistId'
      });
      Playlist.hasMany(models.Image, {
        foreignKey: 'imageableId'
      });
      Playlist.belongsTo(models.User, {
        foreignKey: 'userId'
      })
    }
  }
  Playlist.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1, 50]
      }
    }
  }, {
    sequelize,
    modelName: 'Playlist',
  });
  return Playlist;
};
