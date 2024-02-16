const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Productos_Descuentos",
    {
      producto_descuento_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      //producto_id: FK
      descuento: {
        type: DataTypes.FLOAT,
        allowNull: true,
      },
    },
    {
      timestamps: false,
    }
  );
};
