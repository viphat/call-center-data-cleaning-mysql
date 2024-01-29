module.exports = (sequelize, DataTypes) => {
  const Match = sequelize.define('Match', {
    match_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    province_id: DataTypes.INTEGER,
    name: {
      type: DataTypes.STRING
    }
  }, {
    tableName: 'matches',
    timestamps: false
  });

  Match.associate = function(models) {
    Match.belongsTo(models.Hospital, {
      foreignKey: 'hospital_id',
      as: 'hospital'
    });
  };

  return Match;
}