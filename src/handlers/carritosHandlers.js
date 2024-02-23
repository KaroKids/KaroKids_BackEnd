const {
  todosLosCarritos,
  traerCarrito,
  borrarCarrito,
  modificarCarrito,
  crearCarrito,
} = require("../controllers/carritosController");

const getCarritos = async (req, res) => {
  try {
    const response = await todosLosCarritos();
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getCarrito = async (req, res) => {
  const { usuario_id } = req.params;
  try {
    const response = await traerCarrito(usuario_id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postCarrito = async (req, res) => {
  const { usuario_id } = req.body;

  try {
    const response = await crearCarrito(usuario_id);

    res.status(200).send("se creo el Carrito");
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putCarrito = async (req, res) => {
  const { carrito_id } = req.params;

  try {
    const response = await modificarCarrito(carrito_id);
    res.status(200).send(`se modifico el Carrito ${id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteCarrito = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const response = await borrarCarrito(usuario_id);

    res.status(200).send(`se elimino el Carrito ${id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCarritos,
  getCarrito,
  postCarrito,
  putCarrito,
  deleteCarrito,
};
