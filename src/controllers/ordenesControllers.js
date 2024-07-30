const { Ordenes, Usuarios } = require("../db");

// const todasLasOrdenes = async () => {
//   try {
//     const ordenes = await Ordenes.findAll({
//       include: [
//         {
//           model: Usuarios,
//           attributes: ["nombre_usuario", "apellido_usuario"],
//         },
//       ],
//     });

//     return ordenes;
//   } catch (error) {
//     throw new Error("Error al obtener todas las ordenes: " + error.message);
//   }
// };

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

const modificarOrden = async (id, estado) => {
  await Ordenes.update(
    {estado_pago : estado},
    {where: {
      orden_id: id,
    },}
  );
  return await Ordenes.findByPk(id);
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

const traerOrdenPorId = async (orden_id) => {
  const orden = await Ordenes.findByPk(orden_id);
  return orden;
};

module.exports = {
  // todasLasOrdenes,
  traerOrden,
  borrarOrden,
  modificarOrden,
  crearOrden,
  traerOrdenPorId,
};
