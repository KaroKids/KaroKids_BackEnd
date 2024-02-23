const { Carritos, Usuarios } = require("../db");
const { Op } = require("sequelize");

const todosLosCarritos = async () => {
  const response = await Carritos.findAll();
  return response;
};

const traerCarrito = async (usuario_id) => {
  const response = await Carritos.findOne({
    where: {
      [Op.and]: [{ usuario_id: usuario_id }, { inactivo: 0 }],
    },
  });

  if (!response) {
    return "No existe un carrito para ese usuario";
  } else {
    return response;
  }
};

const borrarCarrito = async (usuario_id) => {
  const response = await Carritos.findOne({
    where: {
      [Op.and]: [{ usuario_id: usuario_id }, { inactivo: 0 }],
    },
  });

  if (!response) {
    return "No se pudo borrar";
  } else {
    await response.update({
      inactivo: 1,
    });

    return "El carrito fue eliminado exitosamente";
  }
};

const modificarCarrito = async (id) => {
  await Carritos.update({
    where: {
      id: id,
    },
  });
};

const crearCarrito = async (usuario_id) => {
  const usuario = Usuarios.findByPk(usuario_id);

  if (usuario) {
    const response = await Carritos.create({ inactivo: 0 });
    usuario.addCarritos(response);
    return response;
  }

  return "El usuario no está registrado, y por lo tanto, el carrito no fue creado";
};

module.exports = {
  todosLosCarritos,
  traerCarrito,
  borrarCarrito,
  modificarCarrito,
  crearCarrito,
};
