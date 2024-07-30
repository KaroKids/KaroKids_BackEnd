const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Usuarios", {
    usuario_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    nombre_usuario: {
      type: DataTypes.STRING,
    },
    apellido_usuario: {
      type: DataTypes.STRING,
    },
    email_usuario: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    roles: {
      type: DataTypes.ENUM("client", "admin"),
      defaultValue: "client",
    },
    inactivo: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: "0",
    },
  });
};
