'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('customers', ['phone'])
    await queryInterface.addIndex('customers', ['phone', 'sampling'])
    await queryInterface.addIndex('customers', ['phone', 'source'])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('customers', ['phone'])
    await queryInterface.removeIndex('customers', ['phone', 'sampling'])
    await queryInterface.removeIndex('customers', ['phone', 'source'])
  }
}
