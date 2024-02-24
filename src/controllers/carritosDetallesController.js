const { Carritos, Productos } = require("../db");
const { Op } = require("sequelize");

const agregarProducto = async (carrito_id, producto_id) => {
  const response = await Carritos.findByPk(carrito_id, {
    where: { inactivo: 0 },
    include: [
      {
        model: Productos,
        through: { attributes: [] },
      },
    ],
  });

  if (!response) {
    return "No se puede agregar un producto a un carrito inexistente";
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

const eliminarProducto = async (carrito_id, producto_id) => {
  const response = await Carritos.findByPk(carrito_id, {
    where: { inactivo: 0 },
    include: [
      {
        model: Productos,
        through: { attributes: [] },
      },
    ],
  });

  if (!response) {
    return "No se puede eliminar un producto a un carrito inexistente";
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
  agregarProducto,
  eliminarProducto,
};
