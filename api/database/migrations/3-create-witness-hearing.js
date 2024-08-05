'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('WitnessHearings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      audienceId: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Audience',
          key: 'id',
        },
      },
      personId: {
        type: Sequelize.INTEGER,
        // TODO: Add the reference to the Person model
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('WitnessHearings');
  },
};
