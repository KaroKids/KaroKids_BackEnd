const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Productos_categorias', {
    producto_categoria_id: {
      type : DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4
    },
    //producto_id: FK
    //categoria_id: FK
  },
  {
    timestamps : false
  });
};