const {
  traerCarrito,
  crearCarrito,
  borrarCarrito,
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

const postCarrito = async (req, res) => {
  //Hacemos un destructuring de la información que llega en el objeto data desde el Front. Data contiene: {usuario_id, producto_id, compra_talla, compra_color, compra_cantidad}
  const { usuario_id, producto_id, compra_talla, compra_color, compra_cantidad } = req.body;

  try {
    const response = await crearCarrito(usuario_id, producto_id, compra_talla, compra_color, compra_cantidad); //La constante "response" va a contener el objeto "carritoUsuario".

    return res.status(201).send("Se creó el carrito y se añadió el producto exitosamente!");
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteCarrito = async (req, res) => {
  const { carrito_id } = req.body;

  try {
    const response = await borrarCarrito(carrito_id);

    return res.send(`Se elimino el carrito (${id})`);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCarrito,
  postCarrito,
  deleteCarrito,
};
