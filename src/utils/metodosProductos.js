//NOTA: La inclusión del modelo Productos originalmente estaba destinada a cargar los productos asociados al carrito junto con la consulta del carrito mismo. Sin embargo, al agregar un campo productos_compra en la tabla Carritos, ahora se puede acceder directamente a esta información desde el carrito recuperado sin necesidad de unir tablas o cargar relaciones adicionales.

const { Carritos } = require("../db");

const agregarProducto = async (carritoUsuario, producto_id, compra_talla, compra_color, compra_cantidad) => {
  //Se crea un objeto nuevaCompra con los valores de: producto_id, compra_talla, compra_color y compra_cantidad.
  const nuevaCompra = {
    producto_id,
    compra_talla,
    compra_color,
    compra_cantidad
  }
  
  //Se actualiza el campo "productos_compra" del carrito asociado.
  try {
    await carritoUsuario.update({
      productos_compra: [...carritoUsuario.productos_compra, nuevaCompra]
    });

    return carritoUsuario;
  } catch (error) {
    throw new Error("Error al agregar el producto al carrito: ", error);
  }
};

const eliminarProducto = async (carrito_id, producto_id) => {
  try {
    // Obtener el carrito del usuario
    const carrito = await Carritos.findByPk(carrito_id, {
      where: { inactivo: 0 },
    });

    if (carrito) {
      // Filtrar el array productos_compra para eliminar el producto con el producto_id dado
      const nuevosProductos = carrito.productos_compra.filter(producto => producto.producto_id !== producto_id);

      // Actualizar el carrito con los nuevos productos
      await carrito.update({ productos_compra: nuevosProductos });

      return carrito;
    } else {
      throw new Error('No se encontró el carrito especificado');
    }
  } catch (error) {
    throw new Error('No se pudo eliminar el producto del carrito', error);
  }
};

module.exports = {
  agregarProducto,
  eliminarProducto,
};