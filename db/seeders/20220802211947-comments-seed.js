'use strict';
const { User, Song } = require('../models');

module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll({ limit: 2, attributes: ['id'] });
    const songs = await Song.findAll({ limit: 2, attributes: ['id'] });
    await queryInterface.bulkInsert('Comments', [
      {
        userId: users[0].id,
        songId: songs[0].id,
        body: 'What a banger'
      },
      {
        userId: users[1].id,
        songId: songs[1].id,
        body: 'I guess I listen to it a lot or whatever'
      },
      {
        userId: users[0].id,
        songId: songs[1].id,
        body: 'I disagree.'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Comments');
  }
};
