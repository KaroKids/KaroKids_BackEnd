const { Productos, Colores, Tallas } = require("../db");
const { Op } = require("sequelize");
const resultadosPaginados = require("../utils/paginacion");

async function productosFiltrados(req, res) {
  try {
    const { genero, talla, color, minPrecio, maxPrecio, paginaActual } =
      req.query;

    const whereStock = {};
    const whereProducto = {};

    if (color) {
      const colorId = await Colores.findOne({ where: { color: color } });
      whereStock.color_id = colorId.dataValues.color_id;
    }
    if (talla) {
      const tallaId = await Tallas.findOne({ where: { talla: talla } });
      whereStock.talla_id = tallaId.dataValues.talla_id;
    }

    if (genero) whereProducto.genero = genero;
    if (minPrecio && maxPrecio)
      whereProducto.precio = { [Op.between]: [minPrecio, maxPrecio] };

    // const filter = await Productos.findAll({
    //   include: [
    //     {
    //       model: Stocks,
    //       where: whereStock,
    //     },
    //   ],
    //   where: whereProducto,
    // });

    const productosFiltrados = await resultadosPaginados(
      paginaActual,
      2,
      Productos,
      whereProducto,
      whereStock
    );

    res.json(productosFiltrados);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = productosFiltrados;
