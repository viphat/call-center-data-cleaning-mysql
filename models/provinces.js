module.exports = (sequelize, DataTypes) => {
  const Province = sequelize.define('Province', {
    province_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    area_id: DataTypes.INTEGER
  }, {
    tableName: 'provinces',
    timestamps: false
  });

  Province.associate = function(models) {
    Province.belongsTo(models.Area, {
      foreignKey: 'area_id',
      as: 'area'
    });
  };

  return Province;
};