const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Carritos",
    {
      carrito_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      productos_compra: {
        type: DataTypes.ARRAY(DataTypes.JSON),
      },
    },
    {
      timestamps: false,
    }
  );
};
