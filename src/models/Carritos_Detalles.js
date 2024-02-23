const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Carritos_Detalles",
    {
      carrito_detalle_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      inactivo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: "0",
      },
    },
    {
      timestamps: false,
    }
  );
};
