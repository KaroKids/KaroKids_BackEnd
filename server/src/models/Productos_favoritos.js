const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Productos_favoritos', {
    producto_favorito_id: {
      type : DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4
    },
    //usuario_id: FK
    //producto_id: FK
  },
  {
    timestamps : false
  });
};