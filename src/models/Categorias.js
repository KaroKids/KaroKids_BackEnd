const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define(
    "Categorias",
    {
      categoria_id: {
        type: DataTypes.UUID,
        primaryKey: true,
        allowNull: false,
        defaultValue: UUIDV4,
      },
      categoria: {
        type: DataTypes.STRING(15),
        allowNull: false,
      },
    },
    {
      timestamps: false,
    }
  );
};
