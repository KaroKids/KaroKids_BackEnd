const {
	crearProducto,
	todosLosProductos,
	traerProducto,
} = require("../controllers/productosControllers");

const { Colores, Tallas, Stocks } = require("../db");

const getProductos = async (req, res) => {
<<<<<<< HEAD
    const {paginaActual} = req.query
    try{
        const response = await todosLosProductos(paginaActual)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}
=======
	const { paginaActual } = req.query;
	try {
		const response = await todosLosProductos(paginaActual);
		res.status(200).json(response);
	} catch (error) {
		res.status(400).json({ error: error.message });
	}
};
>>>>>>> 08d5f4e81e0e21ee7cbf5ea1f5e7ecf9039b8242

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
		color,
		talla,
		cantidad_producto,
	} = req.body;
	try {
		const idColor = await Colores.findAll({ where: { color: color } });
		const idTalla = await Tallas.findAll({ where: { talla: talla } });
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
			inactivo
		);
		const stock = await Stocks.create({
			cantidad_producto: cantidad_producto,
			color_id: idColor[0].color_id,
			talla_id: idTalla[0].talla_id,
			producto_id: response.producto_id,
		});
		res.status(200).json({ response, stock });
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
