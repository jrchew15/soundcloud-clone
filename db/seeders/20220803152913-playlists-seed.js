'use strict';
const { User, Song, Playlist } = require('../models');


module.exports = {
  async up(queryInterface, Sequelize) {
    const users = await User.findAll({ limit: 2 });
    const songs = await Song.findAll({
      limit: 12,
      attributes: ['id'],
      order: [['title', 'DESC']]
    });

    const playlist1 = await users[0].createPlaylist({
      name: 'Playlist 1',
      imageUrl: 'playlist img1'
    })
    const playlist2 = await users[1].createPlaylist({
      name: 'Playlist 2',
      imageUrl: 'playlist img2'
    })
    if (playlist1 instanceof Playlist) {

      await playlist1.addSongs(songs);
      await playlist2.addSongs(songs.slice(0, 7).sort((a, b) => parseInt(a.id) - parseInt(b.id)));
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Playlists', null, {});
  }
};
