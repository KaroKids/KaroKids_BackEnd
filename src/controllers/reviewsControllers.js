const { Calificaciones, Usuarios, Productos } = require("../db");

const getReviewsProducts = async (producto_id) => {
  try {
    const reviewsProducts = await Calificaciones.findOne({
      where: [{ producto_id: producto_id }],
      attributes: ["puntuacion", "comentario"],
    });
    return reviewsProducts;
  } catch (error) {
    throw new Error("El producto no tiene calificaciones");
  }
};

const createReviewsProducts = async (
  producto_id,
  usuario_id,
  puntuacion,
  comentario
) => {
  const newReviewsProducts = await Calificaciones.create({
    puntuacion: puntuacion,
    comentario: comentario,
  });

  newReviewsProducts.setUsuarios(usuario_id),
    newReviewsProducts.setProductos(producto_id);

  console.log("Calificación creada y asociada exitosamente.");

  console.log("newReviewsProducts", newReviewsProducts);
  return newReviewsProducts;
};

module.exports = { getReviewsProducts, createReviewsProducts };
