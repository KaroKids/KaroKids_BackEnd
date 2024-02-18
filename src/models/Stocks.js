const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Stocks", {
    stock_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    cantidad_producto: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
};
