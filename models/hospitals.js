module.exports = (sequelize, DataTypes) => {
  const Hospital = sequelize.define(
    'Hospital',
    {
      hospital_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      name: DataTypes.STRING,
      province_id: DataTypes.INTEGER
    },
    {
      tableName: 'hospitals',
      timestamps: false,
      strict: true
    }
  )

  Hospital.associate = function (models) {
    Hospital.belongsTo(models.Province, {
      foreignKey: 'province_id',
      as: 'province'
    })
  }

  return Hospital
}
