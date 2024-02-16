const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Productos', {
    promocion_id: {
      type : DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4
    },
    tipo_media: {
      type: DataTypes.ENUM,
      values: ["img_carrusel", "img_banner", "vid_banner"],
      allowNull: true
    },
    url_media: {
      type: DataTypes.STRING,
      allowNull: true
    },
    inactivo: {
      type: DataTypes.BOOLEAN,
      allowNull: true
    }
  },
  {
    timestamps : false
  });
};