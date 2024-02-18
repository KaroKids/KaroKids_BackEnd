<<<<<<< HEAD
const { Productos } = require('../db');
const { resultadosPaginados } = require('../utils/paginacion');

const todosLosProductos = async (paginaActual) =>{
    // const response = await Productos.findAll();
    // return(response);
    const itemsPorPagina = 5;
    return resultadosPaginados(paginaActual, itemsPorPagina, Productos);
}
=======
const { Productos } = require("../db");
const resultadosPaginados = require("../utils/paginacion");

const todosLosProductos = async (paginaActual) => {
	const itemsPorPagina = 5;
	return resultadosPaginados(paginaActual, itemsPorPagina, Productos);
};
>>>>>>> 08d5f4e81e0e21ee7cbf5ea1f5e7ecf9039b8242

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
