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

const crearOrden = async (orden) => {
  return await Ordenes.create(orden);
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
