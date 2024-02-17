const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Productos",
    {
      producto_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      //categoria_id: FK
      nombre: {
        type: DataTypes.STRING(50),
        allowNull: false,
      },
      descripcion: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      imagen_principal: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      imagenes_secundarias: {
        type: DataTypes.ARRAY(DataTypes.STRING), //Array de strings
        allowNull: false,
      },
      video: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      precio: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      destacado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
      inactivo: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
