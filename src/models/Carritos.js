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
      productos: {
        type: DataTypes.ARRAY(DataTypes.JSON), //Array de JSONs
        allowNull: false,
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
