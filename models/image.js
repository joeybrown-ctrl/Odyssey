module.exports = function(sequelize, DataTypes) {
    const Image = sequelize.define("Image", {
        image: {
            type: DataTypes.STRING,
            allowNull: false
        },

        caption: {
            type:DataTypes.STRING,
            allowNull: true
        }
    });

    Image.associate = function(models) {
        // We're saying that a Note should belong to an User
        // A Note can't be created without an User due to the foreign key constraint
        Image.belongsTo(models.City, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return Image
}