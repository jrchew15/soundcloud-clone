'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Image.belongsTo(models.User, {
        foreignKey: 'imageableId'
      });
      Image.belongsTo(models.Album, {
        foreignKey: 'imageableId'
      });
      Image.belongsTo(models.Song, {
        foreignKey: 'imageableId'
      });
      Image.belongsTo(models.Playlist, {
        foreignKey: 'imageableId'
      });
    }
  }
  Image.init({
    imageableId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    imageableType: {
      type: DataTypes.ENUM('song', 'album', 'artist', 'playlist'),
      allowNull: false
    },
    url: {
      type: DataTypes.STRING,
      validate: { isUrl: true },
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Image',
  });
  return Image;
};
