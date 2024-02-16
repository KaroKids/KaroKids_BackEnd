const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = (sequelize) => {
  sequelize.define('Ordenes', {
    categoria_id: {
      type : DataTypes.UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4
    },
    //usuario_id: FK
    //carrito_id: FK
    metodo_pago: {
        type: DataTypes.ENUM,
        values: ["efectivo", "debito", "credito", "credito sin inicial", "plan separe"],
        allowNull: false
    },
    direccion_envio: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    direccion_facturacion: {
        type: DataTypes.STRING(200),
        allowNull: false
    },
    estado_pago: {
        type: DataTypes.ENUM,
        values: ["pendiente", "aprobado", "cancelado"],
        allowNull: false
    },
    estado_pedido: {
        type: DataTypes.ENUM,
        values: ["empaquetado", "enviado", "entregado"],
        allowNull: false
    },
    coste_total: {
        type: DataTypes.REAL,
        allowNull: false
    }
  },
  {
    timestamps : false
  });
};