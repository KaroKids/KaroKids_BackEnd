const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Entidad', {
    entidad_id: {
      type : DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4
    },
    imagen_perfil: {
        type: DataTypes.STRING(200),
        allowNull: false //Añadimos imagen por defecto?
    },
    // usuario_id: FK
    nombres: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    apellidos: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    identificacion: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    fecha_nacimiento: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    genero: {
        type: DataTypes.ENUM,
        values: ['masculino', 'femenino'],
        allowNull: false
    },
    telefono_principal: {
        type: DataTypes.STRING(15),
        allowNull: false
    },
    telefono_secundario: {
        type: DataTypes.STRING(15),
        allowNull: false
    }
  },
  {
    timestamps : false
  });
};