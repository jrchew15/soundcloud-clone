'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Comments', [
      {
        userId: 1,
        songId: 1,
        body: 'What a banger'
      },
      {
        userId: 2,
        songId: 2,
        body: 'I guess I listen to it a lot or whatever'
      },
      {
        userId: 1,
        songId: 2,
        body: 'I disagree.'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    queryInterface.bulkDelete('Comments');
  }
};
