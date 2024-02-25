//NOTA: La inclusión del modelo Productos originalmente estaba destinada a cargar los productos asociados al carrito junto con la consulta del carrito mismo. Sin embargo, al agregar un campo productos_compra en la tabla Carritos, ahora se puede acceder directamente a esta información desde el carrito recuperado sin necesidad de unir tablas o cargar relaciones adicionales.

// const { Carritos, Productos } = require("../db");
const { Carritos } = require("../db");
const { Op } = require("sequelize");

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
        const carrito = await Carritos.findByPk(carrito_id, {
        where: { inactivo: 0 },
        });
        
        if (carrito) {
            // const carritoUsuario = await Carritos.sequelize //Método de Seqeulize para borrar el objeto que contiene a "producto_id" ubicado dentro del array "productos_compra".
            return carritoUsuario
            }
    } catch (error) {
        throw new Error ('No se pudo eliminar el producto', error)
    }
};


module.exports = {
  agregarProducto,
  eliminarProducto,
};
