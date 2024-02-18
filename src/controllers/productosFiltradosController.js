const { Sequelize } = require("sequelize");
const { Productos } = require("../db");
const resultadosPaginados = require("../utils/paginacion");

async function productosFiltrados(req, res) {
	
	try {
		const {edad, genero, talla, color, minPrecio, maxPrecio } =
			req.query;
			let {paginaActual} = req.query;
		if(!paginaActual){
			paginaActual = 1;
		}

		const filtros = {};
		if (edad) {
			filtros.genero = genero;
		}

		if (genero) {
			filtros.genero = genero;
		}

		if (talla) {
			filtros.talla = talla;
		}

		if (color) {
			filtros.color = color;
		}

		if (minPrecio && maxPrecio) {
			filtros.precio = {
				[Sequelize.Op.between]: [parseFloat(minPrecio), parseFloat(maxPrecio)],
			};
		}

		const paginacion = await resultadosPaginados(
			paginaActual,
			5,
			Productos,
			filtros
		);

		res.status(200).json(paginacion);
	} catch (error) {
		res.status(500).json({ error: error.message });
	}
}

module.exports = productosFiltrados;
