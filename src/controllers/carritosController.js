const { Carritos } = require("../db");

const traerCarrito = async (usuario_id) => {
  try {
    let carritoUsuario = await Carritos.findOne({
      where: [{ usuario_id: usuario_id }],
    });

    if (!carritoUsuario) {
      throw new Error("El usuario no posee carrito creado");
    }

    return carritoUsuario;
  } catch (error) {
    throw new Error("No se encontró el carrito", error);
  }
};

const agregarProducto = async (
  usuario_id,
  producto_id,
  compra_talla,
  compra_color,
  compra_cantidad,
  producto_precio,
  producto_nombre
) => {
  try {
    // Busca un carrito en el modelo Carritos, asociado al usuario actual
    let carritoUsuario = await Carritos.findOne({
      where: [{ usuario_id: usuario_id }],
    });

    if (!carritoUsuario) {
      throw new Error("El usuario no posee carrito creado");
    }
    let productosActualizados = []
    if(carritoUsuario.productos_compra.length){
        productosActualizados = carritoUsuario.productos_compra
    }
    const nuevaCompra = {
      producto_id : producto_id,
      compra_talla : compra_talla.toUpperCase(),
      compra_color : compra_color.toUpperCase(),
      compra_cantidad : compra_cantidad,
      producto_precio : producto_precio,
      producto_nombre : producto_nombre
    };

   productosActualizados.push(nuevaCompra)

    await Carritos.update(
      { productos_compra: productosActualizados },
      { where: { carrito_id: carritoUsuario.carrito_id } }
    );

    // Se vuelve a consultar el carrito actualizado de la base de datos
    const carritoActualizado = await Carritos.findByPk(
      carritoUsuario.carrito_id
    );

    return carritoActualizado;
  } catch (error) {
    throw new Error(error.message);
  }
};

const eliminarProducto = async (
  usuario_id,
  producto_id,
  compra_talla,
  compra_color
) => {
  try {
    // Obtener el carrito del usuario
    let carritoUsuario = await Carritos.findOne({
      where: [{ usuario_id: usuario_id }],
    });

    // Filtrar el array productos_compra para eliminar el producto con el producto_id dado
    const nuevosProductos = carritoUsuario.productos_compra.filter(
      (producto) =>
        producto.producto_id !== producto_id ||
        producto.compra_talla !== compra_talla.toUpperCase() ||
        producto.compra_color !== compra_color.toUpperCase()
    );

    // Actualizar el carrito con los nuevos productos
    await carritoUsuario.update({ productos_compra: nuevosProductos });

    return carritoUsuario;
  } catch (error) {
    throw new Error("No se pudo eliminar el producto del carrito", error);
  }
};

const actualizarProducto = async (
  usuario_id,
  producto_id,
  compra_talla,
  compra_color,
  compra_cantidad
) => {
  //Permite actualizar el carrito luego de la eliminación de un producto.
  try {
    let carritoUsuario = await Carritos.findOne({
      where: [{ usuario_id: usuario_id }],
    });

    let productosCompraActual = carritoUsuario.productos_compra;

    const productosCompraActualizado = productosCompraActual.map((producto) => {
      if (
        producto.producto_id === producto_id &&
        producto.compra_talla === compra_talla.toUpperCase() &&
        producto.compra_color === compra_color.toUpperCase()
      ) {
        producto.compra_cantidad = compra_cantidad;
      }
      return producto;
    });

    // Se realiza la actualización utilizando el método update de Sequelize
    await Carritos.update(
      { productos_compra: productosCompraActualizado },
      { where: { carrito_id: carritoUsuario.carrito_id } }
    );

    // Se vuelve a consultar el carrito actualizado de la base de datos
    const carritoActualizado = await Carritos.findByPk(
      carritoUsuario.carrito_id
    );

    return carritoActualizado;
  } catch (error) {
    throw new Error("Error al actualizar el producto del carrito: ", error);
  }
};

const borrarCarrito = async (usuario_id) => {
  //Permite actualizar el carrito luego de la eliminación de un producto.
 
  try {
    let carritoUsuario = await Carritos.findOne({
      where: [{ usuario_id: usuario_id }],
    });

    const resetArray = [];

    await Carritos.update(
      { productos_compra: resetArray },
      { where: { carrito_id: carritoUsuario.carrito_id } }
    );

    const carritoActualizado = await Carritos.findByPk(
      carritoUsuario.carrito_id
    );

    return carritoActualizado;
  } catch (error) {
    throw new Error("No se pudo vaciar el carrito");
  }
};

module.exports = {
  traerCarrito,
  agregarProducto,
  eliminarProducto,
  actualizarProducto,
  borrarCarrito,
};
