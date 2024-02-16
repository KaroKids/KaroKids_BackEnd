const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Carritos', {
    carrito_id: {
      type : DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4
    },
    //usuario_id: FK
    productos: {
        type: DataTypes.ARRAY,
        allowNull: false
    },
    inactivo: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
  },
  {
    timestamps : false
  });
};