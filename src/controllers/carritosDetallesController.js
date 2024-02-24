const { Carritos, Productos } = require("../db");
const { Op } = require("sequelize");

  //Requerimos el controller que chequea la existencia/crea un carrito.
  const crearCarrito = require('../controllers/carritosController') 

const agregarProducto = async (data) => {
  //Hacemos un destructuring de la información que llega en el objeto data desde el Front. Data contiene: {usuario_id, producto_id, compra_talla, compra_color, compra_cantidad}
  const { usuario_id, producto_id, compra_talla, compra_color, compra_cantidad } = data //Esto se debería hacer en el handler "carritosDetallesHandler" y pasar toda la data destructurada por props.

  //Debería chequear si el usuario ya cuenta con un carrito asociado.
  //Este controller ya hace esa tarea y devuelve un valor de "carrito_id", que se va a almacenar en "carritoUsuario".
  try {
    const carritoUsuario = await crearCarrito(usuario_id);
    
    return carritoUsuario
  } catch (error) {
    throw new Error ('Error al buscar/crear carrito: ', error)
  }

  //Una vez que se aseguró un "usuario_id" y un "carrito_id" debería almacenar en la tabla Carritos toda la información de la compra que le llegó en data.
  //Pushea en el arreglo "productos_compra", los valores: {producto_id, compra_talla, compra_color y compra_cantidad}.
  const nuevaCompra = {
    producto_id, 
    compra_talla, 
    compra_color, 
    compra_cantidad
  }
      
  try {
    // Actualización del campo "productos_compra" del carrito
    await carritoUsuario.update({
      productos_compra: [...carritoUsuario.productos_compra, nuevaCompra]
    });

    return carritoUsuario;
  } catch (error) {
    throw new Error("Error al agregar el producto al carrito: ", error);
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
