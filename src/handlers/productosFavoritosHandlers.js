const {
  traerProductosFavoritos,
  agregarProductoFavorito,
  eliminarProductoFavorito,
} = require("../controllers/productosFavoritosControllers");

const getProductosFavoritos = async (req, res) => {
  const { usuario_id } = req.body;
  try {
    const response = await traerProductosFavoritos(usuario_id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const addProductoFavorito = async (req, res) => {
  const { usuario_id, producto_id } = req.body;
  try {
    const response = await agregarProductoFavorito(usuario_id, producto_id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProductoFavorito = async (req, res) => {
  const { usuario_id, producto_id } = req.body;
  try {
    const response = await eliminarProductoFavorito(usuario_id, producto_id);
    res.status(200).send(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getProductosFavoritos,
  addProductoFavorito,
  deleteProductoFavorito,
};
