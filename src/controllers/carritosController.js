const { Carritos, Usuarios } = require("../db");
const { Op } = require("sequelize");
const {
	agregarProducto,
	eliminarProducto,
} = require("../utils/metodosProductos"); //Traemos de "utils" los métodos de adición y supresión de productos del carrito.

const traerCarrito = async (usuario_id) => {
	try {
		let carritoUsuario = await Carritos.findOne({
			where: [{ usuario_id: usuario_id }, { inactivo: false }],
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
		// Busca un carrito en el modelo Carritos, asociado al usuario actual
		let carritoUsuario = await Carritos.findOne({
			where: [{ usuario_id: usuario_id }, { inactivo: false }],
		});

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
	} catch (error) {
		throw new Error("Error al buscar/crear el carrito: ", error);
	}
};

const actualizarCarrito = async (carrito_id, producto_id) => {
	//Permite actualizar el carrito luego de la eliminación de un producto.
	try {
		const carritoUsuario = await eliminarProducto(carrito_id, producto_id);

		return carritoUsuario;
	} catch (error) {
		throw new Error("No se pudo actualizar el carrito");
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
			throw new Error("No se encontró el carrito indicado. ", error);
		}

		await response.update({
			inactivo: 1,
		});

		return "El carrito fue eliminado exitosamente";
	} catch (error) {
		throw new Error('Error del controller "borrarCarrito": ', error);
	}
};

module.exports = {
	traerCarrito,
	crearCarrito,
	actualizarCarrito,
	borrarCarrito,
};
