const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Configuraciones', {
    pk: {
      type : DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4
    },
    codigo: {
        type: DataTypes.STRING,
        allowNull: true
    },
    valor: {
        type: DataTypes.STRING,
        allowNull: true
    }
  },
  {
    timestamps : false
  });
};