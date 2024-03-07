//const { Op } = require("sequelize");
const { Calificaciones } = require("../db");

const getAllReviews = async (producto_id) => {
  try {
    const reviewsProducts = await Calificaciones.findAll({
      where: [{ producto_id: producto_id }],
      attributes: ["puntuacion", "comentario", "createdAt"],
    });
    //si no tiene puntuacion return 0
    //si tiene puntuacion, debo calcular el promedio
    const atributos = [];
    reviewsProducts.map((valor) => {
      atributos.push(valor.dataValues);
    });
    console.log(atributos);
    return atributos;
  } catch (error) {
    throw new Error("El producto no tiene calificaciones");
  }
};

const getPromedioReviews = async (producto_id) => {
  try {
    const reviewsProducts = await Calificaciones.findAll({
      where: [{ producto_id: producto_id }],
      attributes: ["puntuacion"],
    });
    //si no tiene puntuacion return 0
    //si tiene puntuacion, debo calcular el promedio

    const valores = reviewsProducts.map((valor) => {
      return valor.dataValues.puntuacion;
    });

    const suma = valores.reduce(
      (acumulador, valorActual) => acumulador + valorActual,
      0
    );

    let promedioPuntuacion = 0;
    if (valores.length === 0) {
      console.log("El producto no tiene calificaciones");
    } else {
      const promedio = suma / valores.length;

      const mitad = Math.floor(promedio) + 0.5;

      if (promedio === mitad) {
        promedioPuntuacion = promedio;
      } else if (promedio > mitad) {
        promedioPuntuacion = Math.ceil(promedio);
      } else if (promedio < mitad) {
        promedioPuntuacion = Math.floor(promedio);
      }
    }
    return promedioPuntuacion;
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
  /* Entrar a la tabla Ordenes con el valor de usuario_id, producto_id y encontrar el valor de "estado_pago" */

  // const buscarProducto = await Ordenes.findOne({
  //   where: {
  //     [Op.and]: [{ usuario_id: usuario_id }, { estado_pago: "aprobado" }],
  //   },
  //   attributes: ["productos_compra"],
  // });

  // if (buscarProducto && buscarProducto.productos_compra) {
  //   const productosFiltrados = buscarProducto.productos_compra.filter(
  //     (producto) => producto.id === producto_id
  //   );

  //   if (productosFiltrados.length > 0) {
  //     // Utilizamos Promise.all para esperar a que todas las promesas se resuelvan
  //     const newReviewsProducts = await Promise.all(
  //       productosFiltrados.map(async () => {
  return await Calificaciones.create({
    producto_id,
    usuario_id,
    puntuacion,
    comentario,
  });
  // })
  //);
  //console.log("Calificación creada y asociada exitosamente");
  //return newReviewsProducts;
  // }
};

module.exports = { getPromedioReviews, createReviewsProducts, getAllReviews };
