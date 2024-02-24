const { Usuarios, Productos } = require("../db");

const traerProductosFavoritos = async (usuario_id) => {
  const response = await Usuarios.findByPk(usuario_id);

  if (!response) {
    return "No existe ese usuario";
  } else {
    const productosFavoritos = response.getProductos();
    return productosFavoritos;
  }
};

const agregarProductoFavorito = async (usuario_id, producto_id) => {
  const response = await Usuarios.findByPk(usuario_id, {
    include: [
      {
        model: Productos,
        through: { attributes: [] },
      },
    ],
  });

  if (!response) {
    return "No se puede agregar el favorito a un usuario inexistente";
  } else {
    const producto = await Productos.findByPk(producto_id);

    if (!producto) {
      return "No existe ese producto";
    } else {
      response.addProductos(producto);
      return response;
    }
  }
};

const eliminarProductoFavorito = async (usuario_id, producto_id) => {
  const response = await Usuarios.findByPk(usuario_id, {
    include: [
      {
        model: Productos,
        through: { attributes: [] },
      },
    ],
  });

  if (!response) {
    return "No se puede eliminar el favorito a un usuario inexistente";
  } else {
    const producto = await Productos.findByPk(producto_id);

    if (!producto) {
      return "No existe ese producto";
    } else {
      response.removeProductos(producto);
      return response;
    }
  }
};

module.exports = {
  traerProductosFavoritos,
  agregarProductoFavorito,
  eliminarProductoFavorito,
};
