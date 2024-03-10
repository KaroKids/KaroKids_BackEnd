//const { Op } = require("sequelize");
const { Calificaciones, Usuarios } = require("../db");

const getAllReviews = async (producto_id) => {
  try {
    const reviewsProducts = await Calificaciones.findAll({
      where: [{ producto_id: producto_id }],
      attributes: ["usuario_id", "puntuacion", "comentario", "createdAt"],
    });

    //si no tiene puntuacion return 0
    //si tiene puntuacion, debo calcular el promedio
    const atributos = await Promise.all(
      reviewsProducts.map(async (valor) => {
        const userName = await Usuarios.findOne({
          where: { usuario_id: valor.dataValues.usuario_id },
          attributes: ["nombre_usuario"],
        });
        return {
          nombre_usuario: userName.dataValues.nombre_usuario,
          ...valor.dataValues,
        };
      })
    );

    return atributos;
  } catch (error) {
    throw new Error(error);
  }
};

const getLast3Reviews = async (producto_id) => {
  try {
    const reviewsProducts = await Calificaciones.findAll({
      where: { producto_id: producto_id }, // Filtro por producto_id
      attributes: ["usuario_id", "puntuacion", "comentario", "createdAt"], // Seleccionar los atributos requeridos
      order: [["createdAt", "DESC"]], // Ordenar por fecha de creación en orden descendente
      limit: 3, // Limitar a las últimas tres calificaciones
    });

    // Si no hay calificaciones, retorna un arreglo vacío
    if (reviewsProducts.length === 0) {
      return [];
    }

    const atributos = await Promise.all(
      reviewsProducts.map(async (valor) => {
        const userName = await Usuarios.findOne({
          where: { usuario_id: valor.dataValues.usuario_id },
          attributes: ["nombre_usuario"],
        });
        return {
          nombre_usuario: userName.dataValues.nombre_usuario,
          ...valor.dataValues,
        };
      })
    );

    // Mapear los valores y retornarlos
    return atributos;
  } catch (error) {
    throw new Error("Error al obtener las calificaciones del producto");
  }
};

const getPromedioReviews = async (producto_id) => {
  try {
    const reviewsProducts = await Calificaciones.findAll({
      where: [{ producto_id: producto_id }],
      attributes: ["puntuacion"],
    });

    const valores = reviewsProducts.map((valor) => {
      return valor.dataValues.puntuacion;
    });

    const suma = valores.reduce(
      (acumulador, valorActual) => acumulador + valorActual,
      0
    );

    let promedioPuntuacion = 0;
    let totalCalificaciones = valores.length;
    let promedioReal = 0;
    if (totalCalificaciones === 0) {
    } else {
      promedioReal = suma / totalCalificaciones;

      const mitad = Math.floor(promedioReal) + 0.5;

      if (promedioReal === mitad) {
        promedioPuntuacion = promedioReal;
      } else if (promedioReal > mitad) {
        promedioPuntuacion = Math.ceil(promedioReal);
      } else if (promedioReal < mitad) {
        promedioPuntuacion = Math.floor(promedioReal);
      }
    }

    promedioReal = parseFloat(promedioReal.toFixed(1));

    const response = { promedioPuntuacion, totalCalificaciones, promedioReal };
    return response;
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

module.exports = {
  getPromedioReviews,
  getLast3Reviews,
  createReviewsProducts,
  getAllReviews,
};
