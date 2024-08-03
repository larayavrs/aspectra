/*
EXAMPLE OF SEEDER FILE
*/
'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'Plans',
      [
        {
          name: 'Básico',
          price: 4000,
          description: 'Plan básico',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Plans', null, {});
  },
};
