'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.addIndex('hospitals', ['name'])
    await queryInterface.addIndex('matches', ['name'])
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeIndex('hospitals', ['name'])
    await queryInterface.addIndex('matches', ['name'])
  }
}
