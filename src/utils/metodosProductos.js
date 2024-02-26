//NOTA: La inclusión del modelo Productos originalmente estaba destinada a cargar los productos asociados al carrito junto con la consulta del carrito mismo. Sin embargo, al agregar un campo productos_compra en la tabla Carritos, ahora se puede acceder directamente a esta información desde el carrito recuperado sin necesidad de unir tablas o cargar relaciones adicionales.

const { Carritos } = require("../db");

const agregarProducto = async (
  carritoUsuario,
  producto_id,
  compra_talla,
  compra_color,
  compra_cantidad
) => {
  //Se crea un objeto nuevaCompra con los valores de: producto_id, compra_talla, compra_color y compra_cantidad.

  const nuevaCompra = {
    producto_id,
    compra_talla,
    compra_color,
    compra_cantidad,
  };

  //Se actualiza el campo "productos_compra" del carrito asociado.
  try {
    // Se obtiene el valor actual de "productos_compra" del carrito
    let productosCompraActual = carritoUsuario.productos_compra || [];
    // Se agrega el nuevo objeto al arreglo

    productosCompraActual.forEach((producto) => {
      if (
        producto.producto_id === producto_id &&
        producto.compra_talla === compra_talla &&
        producto.compra_color === compra_color
      ) {
        throw new Error("El producto ya está en el carrito");
      }
    });

    productosCompraActual.push(nuevaCompra);

    // Se realiza la actualización utilizando el método update de Sequelize
    await Carritos.update(
      { productos_compra: productosCompraActual },
      { where: { carrito_id: carritoUsuario.carrito_id } }
    );

    // Se vuelve a consultar el carrito actualizado de la base de datos
    const carritoActualizado = await Carritos.findByPk(
      carritoUsuario.carrito_id
    );

    return carritoActualizado;
  } catch (error) {
    if (error.message === "El producto ya está en el carrito") {
      throw new Error("El producto ya está en el carrito");
    } else {
      throw new Error("Error al agregar el producto al carrito: ", error);
    }
  }
};

module.exports = {
  agregarProducto,
};
