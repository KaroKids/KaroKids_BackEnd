const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Promociones", {
    promocion_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    tipo_media: {
      type: DataTypes.ENUM("img_carrusel", "img_banner", "vid_banner"),
      allowNull: true,
    },
    url_media: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    inactivo: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: "0",
    },
  });
};
