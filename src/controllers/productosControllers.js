const { Productos } = require("../db");
const resultadosPaginados = require("../utils/paginacion");

const todosLosProductos = async (paginaActual) => {
	const itemsPorPagina = 5;
	return resultadosPaginados(paginaActual, itemsPorPagina, Productos);
};

const traerProducto = async (id) => {
	const response = await Productos.findByPk(id);
	if (response === null) {
		return "la Producto no existe";
	} else {
		return response;
	}
};

const borrarProducto = async (id) => {
	await Productos.destroy({
		where: {
			id: id,
		},
	});
};

const modificarProducto = async (id) => {
	await Productos.update({
		where: {
			id: id,
		},
	});
};

const crearProducto = async (
	nombre,
	descripcion,
	imagen_principal,
	imagenes_secundarias,
	video,
	edad,
	genero,
	precio,
	destacado,
	inactivo
) => {
	return await Productos.create({
		nombre,
		descripcion,
		imagen_principal,
		imagenes_secundarias,
		video,
		edad,
		genero,
		precio,
		destacado,
		inactivo,
	});
};

const filtrarProductos = async () => {};

module.exports = {
	todosLosProductos,
	traerProducto,
	borrarProducto,
	modificarProducto,
	crearProducto,
	filtrarProductos,
};
