const { Carritos } = require("../db");
const { Op } = require("sequelize");

//Traemos de "utils" los métodos de adición y supresión de productos del carrito.
const { agregarProducto, eliminarProducto } = require('../utils/metodosProductos')

const traerCarrito = async (usuario_id) => {
  try {
    const carritoUsuario = await Carritos.findByPk(usuario_id, {
      where: { inactivo: 0 },
    });
    
    if (!carritoUsuario) {
      throw new Error('Su carrito está vacío. ¡Comience a comprar!');
    }

    return carritoUsuario;
  } catch (error) {
   throw new Error ("Aún no ha creado un carrito de compra", error) 
  }
};


const crearCarrito = async (usuario_id, producto_id, compra_talla, compra_color, compra_cantidad) => {
  try {
     // Busca un carrito en el modelo Carritos, asociado al usuario actual
    let carritoUsuario = await Carritos.findByPk(usuario_id, {
      where: { inactivo: 0 },
    });
      //Si no lo encuentra, lo crea y retorna la variable "nuevoCarrito" que contiene un objeto con un valor nuevo de "carrito_id" y todo su contenido asociado. 
    if (!carritoUsuario) {
      const nuevoCarrito = await Carritos.create({
        usuario_id: usuario_id,
        inactivo: 0,
      });
      carritoUsuario = nuevoCarrito; //Objeto con los campos: "carrito_id", "usuario_id", "productos_compra" e "inactivo".
    }

    //Una vez que se aseguró un "usuario_id" y un "carrito_id" debería almacenar en la tabla Carritos toda la información de la compra que le llegó en data.
    carritoUsuario = agregarProducto(carritoUsuario, producto_id, compra_talla, compra_color, compra_cantidad)

    return carritoUsuario;
  } catch (error) {
    throw new Error ('Error al buscar/crear el carrito: ', error)
  }

};

const borrarCarrito = async (carrito_id) => {
  try {
    const response = await Carritos.findOne({
      where: {
        [Op.and]: [{ carrito_id: carrito_id }, { inactivo: 0 }],
      },
    });
    
    if (!response) {
      throw new Error ("No se encontró el carrito indicado. ", error);
    }

    await response.update({
      inactivo: 1,
    })
    
    return ("El carrito fue eliminado exitosamente");
  } catch (error) {
    throw new Error ('Error del controller "borrarCarrito": ', error)
  }

  }

module.exports = {
  traerCarrito,
  borrarCarrito,
  crearCarrito,
};
