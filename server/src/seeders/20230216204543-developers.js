'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up ({ context: queryInterface }) {
      const now = new Date();
      const timestamps = { createdAt: now, updatedAt: now };
      await queryInterface.bulkInsert('teams', [
        { name: 'Team A', ...timestamps },
        { name: 'Team B', ...timestamps },
        { name: 'Team C', ...timestamps },
      ], {});
      
      const [teams] = await queryInterface.sequelize.query(
        `SELECT id from teams;`
      );
  
      await queryInterface.bulkInsert('developers', [
        {
          name: 'Alberto Summers',
          email: 'albereto@beyondplay.io',
          teamId: teams[0].id,
          ...timestamps
        },
        {
          name: 'Gina Brady',
          email: 'gina@beyondplay.io',
          teamId: teams[1].id,
          ...timestamps
        }
      ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
