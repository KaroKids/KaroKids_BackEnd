const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Roles",
    {
      rol_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      rol: {
        type: DataTypes.ENUM,
        values: ["administrador", "cliente"],
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
