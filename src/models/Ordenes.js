const { DataTypes, UUIDV4 } = require("sequelize");

module.exports = (sequelize) => {
  sequelize.define("Ordenes", {
    orden_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    metodo_pago: {
      type: DataTypes.ENUM(
        "efectivo",
        "debito",
        "credito",
        "credito sin inicial",
        "plan separe"
      ),
      allowNull: false,
    },
    estado_pago: {
      type: DataTypes.ENUM("pendiente", "aprobado", "cancelado"),
      allowNull: false,
    },
    estado_pedido: {
      type: DataTypes.ENUM("empaquetado", "enviado", "entregado"),
      allowNull: false,
    },
    coste_total: {
      type: DataTypes.REAL,
      allowNull: false,
    },
  });
};
