module.exports = (sequelize, DataTypes) => {
  const Area = sequelize.define('Area', {
    area_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: DataTypes.STRING,
    channel: DataTypes.STRING
  }, {
    tableName: 'areas',
    timestamps: false,
  });

  Area.associate = function(models) {
    // Define associations here
  };

  return Area;
};