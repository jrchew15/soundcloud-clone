'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    toSafeObject() {
      const { id, firstName, lastName, email, username } = this; // context will be the User instance
      return { id, firstName, lastName, email, username };
    };

    validatePassword(password) {
      return bcrypt.compareSync(password, this.password.toString());
    };

    static async getCurrentUserById(id) {
      return await User.scope("currentUser").findByPk(id);
    };

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    };

    static async signup({ username, email, password, firstName, lastName, imageUrl }) {
      const hashedPassword = bcrypt.hashSync(password);
      const user = await User.create({
        firstName,
        lastName,
        username,
        email,
        password: hashedPassword,
        imageUrl
      });
      return await User.scope('currentUser').findByPk(user.id);
    };

    static associate(models) {
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
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        len: [3, 256]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    imageUrl: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope: {
      attributes: {
        exclude: ["password", "email", "createdAt", "updatedAt", "imageUrl"]
      }
    },
    scopes: {
      currentUser: {
        attributes: { exclude: ["password", "createdAt", "updatedAt", "imageUrl"] }
      },
      loginUser: {
        attributes: {}
      },
      artist: {
        attributes: { exclude: ["password", "email", "createdAt", "updatedAt"] }
      }
    }
  });
  return User;
};
