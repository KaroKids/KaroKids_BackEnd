const {
  traerCarrito,
  crearCarrito,
  actualizarCarrito,
  borrarProductoCarrito,
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
  const {
    usuario_id,
    producto_id,
    compra_talla,
    compra_color,
    compra_cantidad,
  } = req.body;

  try {
    const response = await crearCarrito(
      usuario_id,
      producto_id,
      compra_talla,
      compra_color,
      compra_cantidad
    ); //La constante "response" va a contener el objeto "carritoUsuario".

    return res.status(201).send(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const updateCarrito = async (req, res) => {
  //Permite actualizar el carrito luego de la eliminación de un producto.
  const { carrito_id, producto_id } = req.body;

  try {
    const response = await actualizarCarrito(carrito_id, producto_id);
    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const deleteCarrito = async (req, res) => {
  const {
    usuario_id,
    producto_id,
    compra_talla,
    compra_color,
    compra_cantidad,
  } = req.body;

  try {
    const response = await borrarProductoCarrito(
      usuario_id,
      producto_id,
      compra_talla,
      compra_color,
      compra_cantidad
    );

    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getCarrito,
  postCarrito,
  updateCarrito,
  deleteCarrito,
};
