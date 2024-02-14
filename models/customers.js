module.exports = (sequelize, DataTypes) => {
  const Customer = sequelize.define(
    'Customer',
    {
      customer_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      first_name: DataTypes.STRING,
      last_name: DataTypes.STRING,
      email: DataTypes.STRING,
      district: DataTypes.STRING,
      province: DataTypes.STRING,
      phone: DataTypes.STRING,
      day: DataTypes.STRING,
      month: DataTypes.STRING,
      year: DataTypes.STRING,
      s1: DataTypes.STRING,
      s2: DataTypes.STRING,
      sampling: DataTypes.STRING,
      hospital_id: DataTypes.INTEGER,
      batch: DataTypes.STRING,
      source: DataTypes.STRING,
      hasError: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      missingData: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      missingFirstName: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      missingLastName: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      missingMomName: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      missingDistrict: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      missingProvince: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      missingAddress: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      missingPhone: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      missingEmail: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      missingSampling: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      missingDate: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      missingMomStatus: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      illogicalData: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      illogicalPhone: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      illogicalName: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      illogicalSampling: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      illogicalEmail: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      illogicalAddress: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      illogicalDate: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      illogicalOther: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      duplicatedPhone: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      duplicatedPhoneBetweenS1AndS2: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      duplicatedPhoneS1: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      duplicatedPhoneS2: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      duplicatedWithAnotherAgency: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      duplicatedWithSameYear: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      duplicatedWith2023: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      duplicatedWith2022: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      duplicatedWith2021: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      duplicatedWith2020: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      duplicatedWith2019: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      duplicatedWithinPast2Years: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      duplicatedOverPast2Years: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      collectedDay: {
        type: DataTypes.INTEGER
      },
      collectedMonth: {
        type: DataTypes.INTEGER
      },
      collectedYear: {
        type: DataTypes.INTEGER
      },
      staff: {
        type: DataTypes.INTEGER,
        defaultValue: 0
      },
      note: {
        type: DataTypes.TEXT
      },
      pgCode: {
        type: DataTypes.INTEGER
      },
      qrCode: {
        type: DataTypes.STRING
      }
    },
    {
      tableName: 'customers',
      timestamps: false,
      strict: true
    }
  )

  Customer.associate = function (models) {
    Customer.belongsTo(models.Hospital, {
      foreignKey: 'hospital_id',
      as: 'hospital'
    })
  }

  return Customer
}
