module.exports = function (sequelize, DataTypes) {
  const City = sequelize.define("City", {
    cityName: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    visited: {
      type: DataTypes.BOOLEAN,
      default: false,
    },
  });

  City.associate = function (models) {
    City.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
    });
    City.hasMany(models.Note)
  };

  return City;
};
