'use strict'

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('customers', {
      customer_id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      district: {
        type: Sequelize.STRING
      },
      province: {
        type: Sequelize.STRING
      },
      phone: {
        type: Sequelize.STRING
      },
      day: {
        type: Sequelize.STRING
      },
      month: {
        type: Sequelize.STRING
      },
      year: {
        type: Sequelize.STRING
      },
      s1: {
        type: Sequelize.STRING
      },
      s2: {
        type: Sequelize.STRING
      },
      sampling: {
        type: Sequelize.STRING
      },
      hospital_id: {
        type: Sequelize.INTEGER,
        references: {
          model: {
            tableName: 'hospitals'
          },
          key: 'hospital_id'
        }
      },
      batch: {
        type: Sequelize.STRING
      },
      source: {
        type: Sequelize.STRING
      },
      hasError: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      missingData: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      missingFirstName: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      missingLastName: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      missingMomName: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      missingDistrict: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      missingProvince: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      missingAddress: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      missingPhone: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      missingEmail: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      missingSampling: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      missingDate: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      missingMomStatus: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      illogicalData: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      illogicalPhone: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      illogicalName: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      illogicalSampling: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      illogicalEmail: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      illogicalAddress: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      illogicalDate: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      illogicalOther: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      duplicatedPhone: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      duplicatedPhoneBetweenS1AndS2: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      duplicatedPhoneS1: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      duplicatedPhoneS2: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      duplicatedWithAnotherAgency: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      duplicatedWithSameYear: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      duplicatedWith2023: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      duplicatedWith2022: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      duplicatedWith2021: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      duplicatedWith2020: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      duplicatedWith2019: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      duplicatedWithinPast2Years: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      duplicatedOverPast2Years: {
        type: Sequelize.INTEGER,
        defaultValue: 0
      },
      collectedDay: {
        type: Sequelize.INTEGER
      },
      collectedMonth: {
        type: Sequelize.INTEGER
      },
      collectedYear: {
        type: Sequelize.INTEGER
      },
      staff: {
        type: Sequelize.TEXT
      },
      note: {
        type: Sequelize.TEXT
      },
      pgCode: {
        type: Sequelize.INTEGER
      },
      qrCode: {
        type: Sequelize.STRING
      }
    })
  },

  async down(queryInterface, _Sequelize) {
    await queryInterface.dropTable('customers')
  }
}
