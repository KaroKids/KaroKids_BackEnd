const { Op } = require("sequelize");
const { Calificaciones, Ordenes } = require("../db");

const getReviewsProducts = async (producto_id) => {
  try {
    const reviewsProducts = await Calificaciones.findOne({
      where: [{ producto_id: producto_id }],
      attributes: ["puntuacion", "comentario", "usuario_id"],
    });
    return reviewsProducts;
  } catch (error) {
    throw new Error("El producto no tiene calificaciones");
  }
};

const createReviewsProducts = async ({
  producto_id,
  usuario_id,
  puntuacion,
  comentario,
}) => {
  /* Entrar a la tabla Ordenes con el valor de usuario_id, producto_id y encontrar el valor de "estado_pago" */

  const buscarProducto = await Ordenes.findOne({
    where: {
      [Op.and]: [{ usuario_id: usuario_id }, { estado_pago: "aprobado" }],
    },
    attributes: ["productos_compra"],
  });

  if (buscarProducto && buscarProducto.productos_compra) {
    const productosFiltrados = buscarProducto.productos_compra.filter(
      (producto) => producto.id === producto_id
    );

    if (productosFiltrados.length > 0) {
      // Utilizamos Promise.all para esperar a que todas las promesas se resuelvan
      const newReviewsProducts = await Promise.all(
        productosFiltrados.map(async () => {
          return await Calificaciones.create({
            producto_id,
            usuario_id,
            puntuacion,
            comentario,
          });
        })
      );

      return newReviewsProducts;
    }
  }
};

module.exports = { getReviewsProducts, createReviewsProducts };
