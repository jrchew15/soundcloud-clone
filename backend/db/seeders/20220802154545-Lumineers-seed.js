'use strict';
const { User, Album, Song } = require('../models');
const bcrypt = require('bcryptjs');

const Users = [
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
        imageUrl: 'https://i1.sndcdn.com/artworks-000027754691-rem8c2-t500x500.jpg',
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
      },
      {
        title: 'Cleopatra',
        description: 'Their second album',
        imageUrl: 'Egyptian lady img',
        Songs: [
          {
            title: 'Sleep on the Floor',
            description: 'another song description',
            url: 'songurl',
            imageUrl: 'song img'
          },
          {
            title: 'Ophelia',
            description: 'another song description',
            url: 'songurl',
            imageUrl: 'song img'
          },
          {
            title: 'Cleopatra',
            description: 'another song description',
            url: 'songurl',
            imageUrl: 'song img'
          },
          {
            title: 'Gun Song',
            description: 'another song description',
            url: 'songurl',
            imageUrl: 'song img'
          },
          {
            title: 'Angela',
            description: 'another song description',
            url: 'songurl',
            imageUrl: 'song img'
          },
          {
            title: 'In the Light',
            description: 'another song description',
            url: 'songurl',
            imageUrl: 'song img'
          },
          {
            title: 'Gale Song',
            description: 'another song description',
            url: 'songurl',
            imageUrl: 'song img'
          },
          {
            title: 'Long Way From Home',
            description: 'another song description',
            url: 'songurl',
            imageUrl: 'song img'
          },
          {
            title: 'Sick In The Head',
            description: 'another song description',
            url: 'songurl',
            imageUrl: 'song img'
          },
          {
            title: 'My Eyes',
            description: 'another song description',
            url: 'songurl',
            imageUrl: 'song img'
          },
          {
            title: 'Patience',
            description: 'another song description',
            url: 'songurl',
            imageUrl: 'song img'
          },
        ]
      }
    ]
  },
  {
    firstName: 'Marcus',
    lastName: 'Mumford',
    username: 'Mumford & Sons',
    email: 'mumford@gmail.com',
    password: bcrypt.hashSync('password'),
    imageUrl: 'something hipster image',
    Albums: [
      {
        title: 'Sigh No More',
        description: 'First album went big',
        imageUrl: 'white building',
        Songs: [
          {
            title: 'Sigh No More',
            description: 'song descr',
            url: 'musichere',
            imageUrl: 'song images'
          },
          {
            title: 'The Cave',
            description: 'song descr',
            url: 'musichere',
            imageUrl: 'song images'
          },
          {
            title: 'Winter Winds',
            description: 'song descr',
            url: 'musichere',
            imageUrl: 'song images'
          },
          {
            title: 'Roll Away Your Stone',
            description: 'song descr',
            url: 'musichere',
            imageUrl: 'song images'
          },
          {
            title: 'White Blank Page',
            description: 'song descr',
            url: 'musichere',
            imageUrl: 'song images'
          },
          {
            title: 'I Gave You All',
            description: 'song descr',
            url: 'musichere',
            imageUrl: 'song images'
          },
          {
            title: 'Little Lion Man',
            description: 'song descr',
            url: 'musichere',
            imageUrl: 'song images'
          },
          {
            title: 'Timshel',
            description: 'song descr',
            url: 'musichere',
            imageUrl: 'song images'
          },
          {
            title: 'Thistle & Weeds',
            description: 'song descr',
            url: 'musichere',
            imageUrl: 'song images'
          },
          {
            title: 'Awake My Soul',
            description: 'song descr',
            url: 'musichere',
            imageUrl: 'song images'
          },
          {
            title: 'Dust Bowl Dance',
            description: 'song descr',
            url: 'musichere',
            imageUrl: 'song images'
          },
          {
            title: 'After the Storm',
            description: 'song descr',
            url: 'musichere',
            imageUrl: 'song images'
          },
        ]
      }
    ]
  }
]


module.exports = {
  async up(queryInterface, Sequelize) {
    for (let userObj of Users) {
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
    for (let user of Users) {
      await User.destroy({ where: { username: user.username } })
    }
  }
};
