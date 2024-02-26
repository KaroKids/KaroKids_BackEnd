const { Carritos, Usuarios } = require("../db");
const { Op } = require("sequelize");
const { agregarProducto } = require("../utils/metodosProductos"); //Traemos de "utils" los métodos de adición y supresión de productos del carrito.

const traerCarrito = async (usuario_id) => {
  try {
    const carritoUsuario = await Carritos.findByPk(usuario_id, {
      where: { inactivo: 0 },
    });

    if (!carritoUsuario) {
      throw new Error("Su carrito está vacío. ¡Comience a comprar!");
    }

    return carritoUsuario;
  } catch (error) {
    throw new Error("Aún no ha creado un carrito de compra", error);
  }
};

const crearCarrito = async (
  usuario_id,
  producto_id,
  compra_talla,
  compra_color,
  compra_cantidad
) => {
  try {
    let buscarUsuario = await Usuarios.findByPk(usuario_id);

    // Busca un carrito en el modelo Carritos, asociado al usuario actual

    if (!buscarUsuario) {
      return "No existe el usuario recibido";
    } else {
      let carritoUsuario = await Carritos.findOne({
        where: [{ usuario_id: usuario_id }, { inactivo: false }],
      });

      //Si no lo encuentra, lo crea y retorna la variable "nuevoCarrito" que contiene un objeto con un valor nuevo de "carrito_id" y todo su contenido asociado.
      if (!carritoUsuario) {
        let nuevoCarrito = await Carritos.create({
          inactivo: false,
        });

        await nuevoCarrito.setUsuario(buscarUsuario);

        console.log("El usuario no tiene carrito, pero ya se creó");
        carritoUsuario = nuevoCarrito; //Objeto con los campos: "carrito_id", "usuario_id", "productos_compra" e "inactivo".
      }
      console.log(
        "El usuario ya tiene carrito, se procederá a agregar el producto al carrito existente"
      );
      //Una vez que se aseguró un "usuario_id" y un "carrito_id" debería almacenar en la tabla Carritos toda la información de la compra que le llegó en data.
      carritoUsuario = await agregarProducto(
        carritoUsuario,
        producto_id,
        compra_talla,
        compra_color,
        compra_cantidad
      );

      console.log("Productos del carrito: ", carritoUsuario.productos_compra);

      return carritoUsuario;
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const actualizarCarrito = async (usuario_id, producto_id) => {
  //Permite actualizar el carrito luego de la eliminación de un producto.
  try {
    const carritoUsuario = await eliminarProducto(usuario_id, producto_id);

    return carritoUsuario;
  } catch (error) {
    throw new Error("No se pudo actualizar el carrito");
  }
};

const borrarProductoCarrito = async (
  usuario_id,
  producto_id,
  compra_talla,
  compra_color
) => {
  try {
    // Obtener el carrito del usuario
    let carritoUsuario = await Carritos.findOne({
      where: [{ usuario_id: usuario_id }, { inactivo: false }],
    });

    console.log("Antiguos productos: ", carritoUsuario);

    if (carritoUsuario) {
      // Filtrar el array productos_compra para eliminar el producto con el producto_id dado
      const nuevosProductos = carritoUsuario.productos_compra.filter(
        (producto) =>
          producto.producto_id !== producto_id ||
          producto.compra_talla !== compra_talla ||
          producto.compra_color !== compra_color
      );

      // Actualizar el carrito con los nuevos productos
      await carritoUsuario.update({ productos_compra: nuevosProductos });

      return carritoUsuario;
    } else {
      throw new Error("No se encontró el carrito especificado");
    }
  } catch (error) {
    throw new Error("No se pudo eliminar el producto del carrito", error);
  }
};

module.exports = {
  traerCarrito,
  crearCarrito,
  actualizarCarrito,
  borrarProductoCarrito,
};
