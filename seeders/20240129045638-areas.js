'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('areas', [{
      area_id: 1,
      name: 'Hồ Chí Minh',
      channel: 'Key Urban 1'
    }, {
      area_id: 2,
      name: 'Hà Nội',
      channel: 'Key Urban 1'
    }, {
      area_id: 6,
      name: 'Hải Phòng',
      channel: 'Key Urban 1'
    }, {
      area_id: 3,
      name: 'Đà Nẵng',
      channel: 'Key Urban 2'
    }, {
      area_id: 4,
      name: 'Cần Thơ',
      channel: 'Key Urban 2'
    }, {
      area_id: 7,
      name: 'Miền Bắc',
      channel: 'Urban'
    }, {
      area_id: 8,
      name: 'Miền Trung',
      channel: 'Urban'
    }, {
      area_id: 10,
      name: 'Miền Tây',
      channel: 'Urban'
    }, {
      area_id: 9,
      name: 'Miền Đông',
      channel: 'Urban'
    }], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('areas', null, {});
  }
};
