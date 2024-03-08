const { Ordenes, Usuarios } = require("../db");

const todasLasOrdenes = async () => {
  try {
    const ordenes = await Ordenes.findAll({
      include: [
        {
          model: Usuarios,
          attributes: ['nombre_usuario', 'apellido_usuario']
        }
      ]
    });

    return ordenes;
  } catch (error) {
    throw new Error('Error al obtener todas las ordenes: ' + error.message);
  }
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
