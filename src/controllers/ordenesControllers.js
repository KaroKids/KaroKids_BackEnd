const { Ordenes } = require("../db");

const todasLasOrdenes = async () => {
  const response = await Ordenes.findAll();
  return response;
};
const traerOrden = async (id) => {
  const response = await Ordenes.findAll({
    where: {
      usuario_id: id,
    },
  });
  if (response === null) {
    return "la orden no existe";
  } else {
    return response;
  }
};

const borrarOrden = async (id) => {
  await Ordenes.destroy({
    where: {
      id: id,
    },
  });
};

const modificarOrden = async (id) => {
  await Ordenes.update({
    where: {
      id: id,
    },
  });
};

const crearOrden = async (
  productos_compra,
  metodo_pago,
  estado_pago,
  estado_pedido,
  coste_total,
  usuario_id
) => {
  return await Ordenes.create(
    productos_compra,
    metodo_pago,
    estado_pago,
    estado_pedido,
    coste_total,
    usuario_id
  );
};

const filtrarOrdenes = async () => {};

module.exports = {
  todasLasOrdenes,
  traerOrden,
  borrarOrden,
  modificarOrden,
  crearOrden,
  filtrarOrdenes,
};
