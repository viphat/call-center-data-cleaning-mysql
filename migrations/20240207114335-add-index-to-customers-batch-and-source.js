'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addIndex('customers', ['batch', 'source']);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeIndex('customers', ['batch', 'source']);
  }
};
