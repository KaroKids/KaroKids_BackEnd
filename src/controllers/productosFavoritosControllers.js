const { Usuarios, Productos } = require("../db");

const traerProductosFavoritos = async (usuario_id) => {
  try {
    const usuarioFavoritos = await Usuarios.findByPk(usuario_id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Productos,
          attributes: ["producto_id"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!usuarioFavoritos) {
      return "El usuario no existe";
    }

    const productos = [];

    for (const productoFavorito of usuarioFavoritos.Productos) {
      const buscarProducto = await Productos.findByPk(
        productoFavorito.producto_id,
        {
          attributes: ["producto_id", "nombre", "imagen_principal", "precio"],
        }
      );
      productos.push(buscarProducto);
    }

    return productos;
  } catch (error) {
    return error;
  }
};

const agregarProductoFavorito = async (usuario_id, producto_id) => {
  try {
    const usuarioFavoritos = await Usuarios.findByPk(usuario_id, {
      attributes: { exclude: ["createdAt", "updatedAt"] },
      include: [
        {
          model: Productos,
          attributes: ["producto_id"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    const producto = await Productos.findByPk(producto_id);

    if (!usuarioFavoritos) {
      return "El usuario no existe";
    }

    if (!producto) {
      return "El producto no existe";
    }

    await usuarioFavoritos.addProductos(producto_id);

    const productos = [];

    for (const productoFavorito of usuarioFavoritos.Productos) {
      const buscarProducto = await Productos.findByPk(
        productoFavorito.producto_id,
        {
          attributes: ["producto_id", "nombre", "imagen_principal", "precio"],
        }
      );
      productos.push(buscarProducto);
    }

    return productos;
  } catch (error) {
    return error;
  }
};

const eliminarProductoFavorito = async (usuario_id, producto_id) => {
  let usuarioFavoritos = await Usuarios.findByPk(usuario_id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: Productos,
        attributes: ["producto_id"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  const producto = await Productos.findByPk(producto_id);

  if (!usuarioFavoritos) {
    return "El usuario no existe";
  }

  if (!producto) {
    return "El producto no existe";
  }

  await usuarioFavoritos.removeProductos(producto);

  usuarioFavoritos = await Usuarios.findByPk(usuario_id, {
    attributes: { exclude: ["createdAt", "updatedAt"] },
    include: [
      {
        model: Productos,
        attributes: ["producto_id"],
        through: {
          attributes: [],
        },
      },
    ],
  });

  const productos = [];

  for (const productoFavorito of usuarioFavoritos.Productos) {
    const buscarProducto = await Productos.findByPk(
      productoFavorito.producto_id,
      {
        attributes: ["producto_id", "nombre", "imagen_principal", "precio"],
      }
    );
    productos.push(buscarProducto);
  }

  return productos;
};

module.exports = {
  traerProductosFavoritos,
  agregarProductoFavorito,
  eliminarProductoFavorito,
};
