const {
  agregarProducto,
  eliminarProducto,
} = require("../controllers/carritosDetallesController");

const addProducto = async (req, res) => {
  const { carrito_id, producto_id } = req.body;

  try {
    const response = await agregarProducto(carrito_id, producto_id);
    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteProducto = async (req, res) => {
  const { carrito_id, producto_id } = req.body;

  try {
    const response = await eliminarProducto(carrito_id, producto_id);
    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  addProducto,
  deleteProducto,
};
