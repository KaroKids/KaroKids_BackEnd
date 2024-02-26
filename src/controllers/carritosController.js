const { Carritos} = require("../db");

const traerCarrito = async (usuario_id) => {
	try {
		let carritoUsuario = await Carritos.findOne({
			where: [{ usuario_id: usuario_id }],
		});

		if (!carritoUsuario) {
			throw new Error("Su carrito está vacío. ¡Comience a comprar!");
		}
		return carritoUsuario;
	} catch (error) {
		console.log(error);
		throw new Error("No se encontró el carrito", error);
	}
};

const agregarProducto = async (
	usuario_id,
	producto_id,
	compra_talla,
	compra_color,
	compra_cantidad,
	producto_precio
) => {
	try {
		// Busca un carrito en el modelo Carritos, asociado al usuario actual
		let carritoUsuario = await Carritos.findOne({
			where: [{ usuario_id: usuario_id }],
		});

		const nuevaCompra = {
			producto_id,
			compra_talla,
			compra_color,
			compra_cantidad,
			producto_precio
		  };
		
		// Se obtiene el valor actual de "productos_compra" del carrito y se agrega el nuevo objeto al arreglo
		let productosCompraActual = carritoUsuario.productos_compra || [];
	
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
	
		return carritoActualizado
	} catch (error) {
		if (error.message === "El producto ya está en el carrito") {
		  throw new Error("El producto ya está en el carrito");
		} else {
		  throw new Error("Error al agregar el producto al carrito: ", error);
		}
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
				producto.compra_talla !== compra_talla ||
				producto.compra_color !== compra_color
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
	compra_cantidad ) => {
	//Permite actualizar el carrito luego de la eliminación de un producto.
	try {
		let carritoUsuario = await Carritos.findOne({
			where: [{ usuario_id: usuario_id }],
		});

		let productosCompraActual = carritoUsuario.productos_compra;
	
		const productosCompraActualizado = productosCompraActual.map((producto) => {
			if (
			producto.producto_id === producto_id &&
			producto.compra_talla === compra_talla &&
			producto.compra_color === compra_color
			) {
				producto.cantidad = compra_cantidad
			}
			return producto
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

		return carritoActualizado
	} catch (error) {
		if (error.message === "El producto ya está en el carrito") {
		  throw new Error("El producto ya está en el carrito");
		} else {
		  throw new Error("Error al agregar el producto al carrito: ", error);
		}
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
	
		return carritoActualizado
	} catch (error) {
		throw new Error("No se pudo actualizar el carrito");
	}
};

module.exports = {
	traerCarrito,
	agregarProducto,
	eliminarProducto,
	actualizarProducto,
	borrarCarrito
};
