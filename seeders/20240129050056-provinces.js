'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'provinces',
      [
        { province_id: 1, name: 'Hồ Chí Minh', area_id: 1 },
        { province_id: 2, name: 'Hà Nội', area_id: 2 },
        { province_id: 3, name: 'Đà Nẵng', area_id: 3 },
        { province_id: 4, name: 'Cần Thơ', area_id: 4 },
        { province_id: 6, name: 'Hải Phòng', area_id: 6 },
        { province_id: 7, name: 'Nghệ An', area_id: 7 },
        { province_id: 9, name: 'Thái Nguyên', area_id: 7 },
        { province_id: 11, name: 'Hải Dương', area_id: 7 },
        { province_id: 13, name: 'Thái Bình', area_id: 7 },
        { province_id: 14, name: 'Hưng Yên', area_id: 7 },
        { province_id: 15, name: 'Ninh Bình', area_id: 7 },
        { province_id: 16, name: 'Vĩnh Phúc', area_id: 7 },
        { province_id: 17, name: 'Bắc Ninh', area_id: 7 },
        { province_id: 18, name: 'Thừa Thiên Huế', area_id: 8 },
        { province_id: 19, name: 'Quảng Ngãi', area_id: 8 },
        { province_id: 20, name: 'Đắk Lắk', area_id: 8 },
        { province_id: 21, name: 'Bình Định', area_id: 8 },
        { province_id: 23, name: 'Bình Dương', area_id: 9 },
        { province_id: 24, name: 'Đồng Nai', area_id: 9 },
        { province_id: 27, name: 'Bến Tre', area_id: 10 },
        { province_id: 46, name: 'Bạc Liêu', area_id: 10 },
        { province_id: 47, name: 'Kiên Giang', area_id: 10 },
        { province_id: 48, name: 'Sóc Trăng', area_id: 10 },
        { province_id: 29, name: 'Trà Vinh', area_id: 10 },
        { province_id: 31, name: 'Vĩnh Long', area_id: 10 }
      ],
      {}
    )
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('provinces', null, {})
  }
}
