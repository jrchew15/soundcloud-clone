'use strict';
const { User, Album, Song } = require('../models');
const bcrypt = require('bcryptjs');

const data = {
  Users: [
    {
      firstName: 'John',
      lastName: 'Smith',
      username: 'The Lumineers',
      email: 'lumi-dudes@gmail.com',
      password: bcrypt.hashSync('password'),
      imageUrl: 'lumineer image',
      Albums: [
        {
          title: 'The Lumineers',
          description: 'First, self-titled album',
          imageUrl: 'image url',
          Songs: [
            {
              title: 'Flowers in Your Hair',
              description: 'description',
              url: 'songurl',
              imageUrl: 'song image url'
            },
            {
              title: 'Classy Girls',
              description: 'song description',
              url: 'songurl',
              imageUrl: 'song image url'
            },
            {
              title: 'Submarines',
              description: 'song description',
              url: 'songurl',
              imageUrl: 'song image url'
            },
            {
              title: 'Dead Sea',
              description: 'song description',
              url: 'songurl',
              imageUrl: 'song image url'
            },
            {
              title: 'Ho Hey',
              description: 'song description',
              url: 'songurl',
              imageUrl: 'song image url'
            },
            {
              title: 'Slow It Down',
              description: 'song description',
              url: 'songurl',
              imageUrl: 'song image url'
            },
            {
              title: 'Stubborn Love',
              description: 'song description',
              url: 'songurl',
              imageUrl: 'song image url'
            },
            {
              title: 'Big Parade',
              description: 'song description',
              url: 'songurl',
              imageUrl: 'song image url'
            },
            {
              title: 'Charlie Boy',
              description: 'song description',
              url: 'songurl',
              imageUrl: 'song image url'
            },
            {
              title: 'Flapper Girl',
              description: 'song description',
              url: 'songurl',
              imageUrl: 'song image url'
            },
            {
              title: 'Morning Song',
              description: 'song description',
              url: 'songurl',
              imageUrl: 'song image url'
            },
          ]
        }
      ]
    }
  ]
}

module.exports = {
  async up(queryInterface, Sequelize) {
    for (let userObj of data.Users) {
      const userInfo = {};
      userInfo.firstName = userObj.firstName;
      userInfo.lastName = userObj.lastName;
      userInfo.username = userObj.username;
      userInfo.email = userObj.email;
      userInfo.password = userObj.password;
      userInfo.imageUrl = userObj.imageUrl;

      const user = await User.create(userInfo);

      let albums = [];
      for (let album of userObj.Albums) {
        album.userId = user.id;
        album.Songs.forEach(song => { song.userId = user.id })
        albums.push(
          await Album.create(album, {
            include: [Song]
          })
        );
      }
      await user.addAlbums(albums);
    }
  },

  async down(queryInterface, Sequelize) {
    for (let user of data.Users) {
      await User.destroy({ where: { username: 'The Lumineers' } })
    }
  }
};
