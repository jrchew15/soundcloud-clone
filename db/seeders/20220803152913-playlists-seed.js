'use strict';
const { User, Song, Playlist } = require('../models');


module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const users = await User.findAll({ limit: 2 });
    const songs = await Song.findAll({
      limit: 12,
      attributes: ['id'],
      order: [['title', 'DESC']]
    });

    const playlist1 = await users[0].createPlaylist({
      // userId: users[0].id,
      name: 'Playlist 1',
      imageUrl: 'playlist img1'
    })
    const playlist2 = await users[1].createPlaylist({
      // userId: users[1].id,
      name: 'Playlist 2',
      imageUrl: 'playlist img2'
    })
    if (playlist1 instanceof Playlist) {

      await playlist1.addSongs(songs);
      await playlist2.addSongs(songs.slice(0, 7).sort((a, b) => parseInt(a.id) - parseInt(b.id)));
    }
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};
