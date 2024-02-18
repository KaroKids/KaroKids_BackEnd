const {
	crearProducto,
	todosLosProductos,
	traerProducto,
} = require("../controllers/productosControllers");

const { Colores, Tallas, Stocks } = require("../db");

const getProductos = async (req, res) => {
	const { paginaActual } = req.query;
	if(!paginaActual){
		paginaActual = 1;
	}
	console.log(paginaActual)
	try {
		const response = await todosLosProductos(paginaActual);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const getProducto = async (req, res) => {
	const { id } = req.params;
	try {
		const response = await traerProducto(id);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const postProducto = async (req, res) => {
	const {
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
		stock
	} = req.body;
	try {
		const response = await crearProducto(
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
			stock
		);
		
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const putProducto = async (req, res) => {
	const { id } = req.params;
	try {
		res.status(200).send(`se modifico el producto ${id}`);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

const deleteProducto = async (req, res) => {
	const { id } = req.params;
	try {
		res.status(200).send(`se elimino el producto ${id}`);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};

module.exports = {
	getProductos,
	getProducto,
	postProducto,
	putProducto,
	deleteProducto,
};
