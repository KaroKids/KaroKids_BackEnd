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

const crearCarrito = async (usuario_id) => {
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
    const crearCarrito = await Carritos.create({
      usuario_id: usuario_id,
      inactivo: 0,
    });
    return crearCarrito;
  } else {
    return carritoUsuario;
  }
};

module.exports = {
  traerCarrito,
  borrarCarrito,
  crearCarrito,
};
