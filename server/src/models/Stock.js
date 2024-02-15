const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Stock', {
    stock_id: {
      type : DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4
    },
    //producto_id: FK
    //talla_id: FK
    //color_id: FK
    cantidad_producto: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
  },
  {
    timestamps : false
  });
};