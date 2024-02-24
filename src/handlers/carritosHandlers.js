const {
  traerCarrito,
  borrarCarrito,
  crearCarrito,
} = require("../controllers/carritosController");

const getCarrito = async (req, res) => {
  const { usuario_id } = req.body;

  try {
    const response = await traerCarrito(usuario_id);
    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteCarrito = async (req, res) => {
  const { carrito_id } = req.body;

  try {
    const response = await borrarCarrito(usuario_id);

    return res.send(`Se elimino el carrito (${id})`);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const postCarrito = async (req, res) => {
  const { usuario_id } = req.body;

  try {
    const response = await crearCarrito(usuario_id);

    return res.status(201).send("Se creó el carrito");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCarrito,
  postCarrito,
  deleteCarrito,
};
