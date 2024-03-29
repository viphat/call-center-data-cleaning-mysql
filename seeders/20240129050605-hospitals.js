'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'hospitals',
      [
        { hospital_id: 1, name: 'Bệnh Viện Hùng Vương', province_id: 1 },
        { hospital_id: 2, name: 'Bệnh Viện Đa Khoa Quốc Ánh', province_id: 1 },
        { hospital_id: 3, name: 'Bệnh viện Nhân Dân Gia Định', province_id: 1 },
        { hospital_id: 4, name: 'Bệnh viện Quận Tân Phú', province_id: 1 },
        { hospital_id: 5, name: 'Bệnh viện Quận Thủ Đức', province_id: 1 },
        { hospital_id: 6, name: 'Bệnh viện Từ Dũ', province_id: 1 },
        { hospital_id: 7, name: 'Bệnh viện Bạch Mai', province_id: 2 },
        { hospital_id: 8, name: 'Bệnh viện Đa Khoa Hà Đông', province_id: 2 },
        { hospital_id: 9, name: 'Bệnh viện Phụ Sản Hà Nội', province_id: 2 },
        {
          hospital_id: 10,
          name: 'Bệnh viện Phụ Sản Trung Ương',
          province_id: 2
        },
        {
          hospital_id: 11,
          name: 'Bệnh viện Trung ương Quân Đội 108',
          province_id: 2
        },
        {
          hospital_id: 12,
          name: 'Bệnh viện Phụ Sản Hải Phòng',
          province_id: 6
        },
        { hospital_id: 13, name: 'Bệnh viện Phụ sản Tâm Phúc', province_id: 6 },
        { hospital_id: 14, name: 'Bệnh viện Phụ Sản Cần Thơ', province_id: 4 },
        { hospital_id: 15, name: 'Bệnh viện Sản Nhi Đà Nẵng', province_id: 3 },
        {
          hospital_id: 16,
          name: 'Trung Tâm Y Tế Quận Liên Chiểu',
          province_id: 3
        },
        {
          hospital_id: 17,
          name: 'Bệnh viện Đa Khoa Tỉnh Bạc Liêu',
          province_id: 46
        },
        {
          hospital_id: 18,
          name: 'Bệnh viện Đa Khoa Huyện Tiên Du',
          province_id: 17
        },
        {
          hospital_id: 19,
          name: 'Bệnh viện Đa Khoa Huyện Từ Sơn',
          province_id: 17
        },
        {
          hospital_id: 20,
          name: 'Bệnh viện Hoàn Mỹ Bắc Ninh',
          province_id: 17
        },
        {
          hospital_id: 21,
          name: 'Bệnh viện Đa Khoa Nguyễn Đình Chiểu',
          province_id: 27
        },
        {
          hospital_id: 22,
          name: 'Bệnh viện Phụ Sản Tiền Giang',
          province_id: 27
        },
        {
          hospital_id: 23,
          name: 'Bệnh viện Đa Khoa Bình Định',
          province_id: 21
        },
        {
          hospital_id: 24,
          name: 'Bệnh viện Đa Khoa Thành Phố Quy Nhơn',
          province_id: 21
        },
        {
          hospital_id: 25,
          name: 'Bệnh viện Đa Khoa Tỉnh Bình Đinh - Phần Mở Rộng',
          province_id: 21
        },
        {
          hospital_id: 26,
          name: 'Bệnh viện Đa Khoa Bình Dương',
          province_id: 23
        },
        {
          hospital_id: 27,
          name: 'Bệnh viện Đa Khoa Thuận An',
          province_id: 23
        },
        { hospital_id: 28, name: 'Bệnh viện Hoàn Hảo 2', province_id: 23 },
        {
          hospital_id: 29,
          name: 'Trung tâm Chăm sóc Sức khoẻ Sinh sản Bình Dương',
          province_id: 23
        },
        {
          hospital_id: 30,
          name: 'Bệnh viện Đa Khoa Vùng Tây Nguyên',
          province_id: 20
        },
        {
          hospital_id: 31,
          name: 'Bệnh viện Đa Khoa Thống Nhất',
          province_id: 24
        },
        {
          hospital_id: 32,
          name: 'Bệnh viện Phụ Sản Hải Dương',
          province_id: 11
        },
        { hospital_id: 33, name: 'Bệnh viện Đa Khoa Hưng Hà', province_id: 14 },
        {
          hospital_id: 34,
          name: 'Bệnh viện Đa Khoa Hưng Yên',
          province_id: 14
        },
        {
          hospital_id: 35,
          name: 'Bệnh viện Đa Khoa Tỉnh Kiên Giang',
          province_id: 47
        },
        { hospital_id: 36, name: 'Bệnh viện 115 - Nghệ An', province_id: 7 },
        { hospital_id: 37, name: 'Bệnh viện Đa Khoa Hữu Nghị', province_id: 7 },
        { hospital_id: 38, name: 'Bệnh viện Đa Khoa Thái An', province_id: 7 },
        { hospital_id: 39, name: 'Bệnh viện Sản Nhi Nghệ An', province_id: 7 },
        { hospital_id: 40, name: 'Bệnh viện Thành phố Vinh', province_id: 7 },
        {
          hospital_id: 41,
          name: 'Bệnh viện Sản Nhi Ninh Bình',
          province_id: 15
        },
        {
          hospital_id: 42,
          name: 'Bệnh viện Sản Nhi Quảng Ngãi',
          province_id: 19
        },
        {
          hospital_id: 43,
          name: 'Bệnh viện Sản Nhi Sóc Trăng',
          province_id: 48
        },
        {
          hospital_id: 44,
          name: 'Bệnh viện Thành phố Thái Bình',
          province_id: 13
        },
        { hospital_id: 45, name: 'Bệnh viện A Thái Nguyên', province_id: 9 },
        { hospital_id: 46, name: 'Bệnh viện C Thái Nguyên', province_id: 9 },
        {
          hospital_id: 47,
          name: 'Bệnh viện Đa Khoa Trung ương Thái Nguyên',
          province_id: 9
        },
        {
          hospital_id: 48,
          name: 'Bệnh viện Gang Thép Thái Nguyên',
          province_id: 9
        },
        {
          hospital_id: 49,
          name: 'Bệnh viện Quốc Tế Thái Nguyên',
          province_id: 9
        },
        {
          hospital_id: 50,
          name: 'Bệnh viện Đa Khoa Trung ương Huế',
          province_id: 18
        },
        { hospital_id: 51, name: 'Bệnh viện Y Dược Huế', province_id: 18 },
        {
          hospital_id: 52,
          name: 'Bệnh viện Sản Nhi Trà Vinh',
          province_id: 29
        },
        {
          hospital_id: 53,
          name: 'Bệnh viện Đa Khoa Tỉnh Vĩnh Long',
          province_id: 31
        },
        {
          hospital_id: 54,
          name: 'Bệnh viện Sản Nhi Vĩnh Phúc',
          province_id: 16
        }
      ],
      {}
    )
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('hospitals', null, {})
  }
}
