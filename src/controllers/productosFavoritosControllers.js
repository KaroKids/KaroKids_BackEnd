const { sequelize } = require("sequelize");
const { Usuarios, Productos, Calificaciones } = require("../db");

const traerProductosFavoritos = async (usuario_id) => {
  try {
    // Verifica si el usuario existe
    const usuario = await Usuarios.findByPk(usuario_id);
    if (!usuario) {
      return { error: "El usuario no existe" };
    }

    // Obtiene los productos actualizados
    const productosFavoritos = await usuario.getProductos({
      attributes: ["producto_id", "nombre", "imagen_principal", "precio"],
      joinTableAttributes: [],
    });

    return productosFavoritos;
  } catch (error) {
    return error;
  }
};

const topFavoritos = async (top) => {
  try {
    const favoritos = await Productos.findAll({
      include: [
        {
          model: Usuarios,
          through: "Productos_Favoritos",
        },
      ],
      attributes: ["producto_id", "nombre", "imagen_principal", "precio"],
    });

    // const favoritosFilter = favoritos.filter(
    //   (producto) => producto.Usuarios.length > 0
    // );

    return favoritos;
  } catch (error) {
    return error;
  }
};

const agregarProductoFavorito = async (usuario_id, producto_id) => {
  try {
    // Verifica si el usuario existe
    const usuario = await Usuarios.findByPk(usuario_id);
    if (!usuario) {
      return { error: "El usuario no existe" };
    }

    // Verifica si el producto existe
    const producto = await Productos.findByPk(producto_id);
    if (!producto) {
      return { error: "El producto no existe" };
    }

    // Verifica si el producto ya está en los favoritos del usuario
    const productoExistente = await usuario.hasProductos(producto_id);
    if (!productoExistente) {
      // Agrega el producto a los favoritos del usuario
      await usuario.addProductos(producto);
    }

    // Recarga las asociaciones desde la base de datos
    await usuario.reload();

    // Obtiene los productos actualizados
    const productosFavoritos = await usuario.getProductos({
      attributes: ["producto_id", "nombre", "imagen_principal", "precio"],
      joinTableAttributes: [],
    });

    return productosFavoritos;
  } catch (error) {
    console.error(error);
    return { error: "Error interno del servidor" };
  }
};

const eliminarProductoFavorito = async (usuario_id, producto_id) => {
  const usuarioFavoritos = await Usuarios.findByPk(usuario_id);

  const producto = await Productos.findByPk(producto_id);

  if (!usuarioFavoritos) {
    return "El usuario no existe";
  }

  if (!producto) {
    return "El producto no existe";
  }

  await usuarioFavoritos.removeProductos(producto);

  // Obtiene los productos actualizados
  const productosFavoritos = await usuarioFavoritos.getProductos({
    attributes: ["producto_id", "nombre", "imagen_principal", "precio"],
    joinTableAttributes: [],
  });

  return productosFavoritos;
};

module.exports = {
  traerProductosFavoritos,
  agregarProductoFavorito,
  eliminarProductoFavorito,
  topFavoritos,
};
