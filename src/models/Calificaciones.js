const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Calificaciones", {
    calificacion_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },

    puntuacion: {
      type: DataTypes.INTEGER,
    },
    comentario: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });
};
