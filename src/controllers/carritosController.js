const { Carritos, Productos } = require("../db");
const { Op } = require("sequelize");

const traerCarrito = async (usuario_id) => {
  const carritoUsuario = await Carritos.findByPk(usuario_id, {
    where: { inactivo: 0 },
    include: [
      {
        model: Productos,
        through: { attributes: [] },
      },
    ],
  });

  if (!carritoUsuario) {
    return "El usuario no posee un carrito aún";
  } else {
    return carritoUsuario;
  }
};

const crearCarrito = async (usuario_id) => {
  // Busca un carrito en el modelo Carritos, asociado al usuario actual
  const carritoUsuario = await Carritos.findByPk(usuario_id, {
      where: { inactivo: 0 },
    });
      //NOTA: La inclusión del modelo Productos en la búsqueda originalmente estaba destinada a cargar los productos asociados al carrito junto con la consulta del carrito mismo. Sin embargo, al agregar un campo productos_compra en la tabla Carritos, ahora puedes acceder directamente a esta información desde el carrito recuperado sin necesidad de unir tablas o cargar relaciones adicionales.

  //Si no lo encuentra, lo crea y retorna la variable "nuevoCarrito" que contiene el valor de "carrito_id" creado. SI el carrito ya existe, retorna el "carrito_id" en la variable "carritoUsuario".
  if (!carritoUsuario) {
    const nuevoCarrito = await Carritos.create({
      usuario_id: usuario_id,
      inactivo: 0,
    });

    return nuevoCarrito;
  } else {
    return carritoUsuario;
  }
};

const borrarCarrito = async (carrito_id) => {
  const response = await Carritos.findOne({
    where: {
      [Op.and]: [{ carrito_id: carrito_id }, { inactivo: 0 }],
    },
  });

  if (!response) {
    return "No se pudo borrar el carrito indicado";
  } else {
    await response.update({
      inactivo: 1,
    });

    return "El carrito fue eliminado exitosamente";
  }
};

module.exports = {
  traerCarrito,
  borrarCarrito,
  crearCarrito,
};
