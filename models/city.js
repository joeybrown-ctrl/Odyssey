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
        allowNull: true,
      },
    });
    City.hasMany(models.Note, { onDelete: "cascade", hooks: true });
    City.hasMany(models.Image, { onDelete: "cascade", hooks: true });
  };

  return City;
};
