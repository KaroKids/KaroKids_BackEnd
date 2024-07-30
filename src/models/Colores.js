const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Colores",
    {
      color_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      color: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
