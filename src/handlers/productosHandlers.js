const {
  crearProducto,
  todosLosProductos,
  traerProducto,
  borrarProducto,
  destacarProducto,
  productosDestacados,
  modificarProducto,
  decrementarCantidad
} = require("../controllers/productosControllers");

const getProductos = async (req, res) => {
  const { paginaActual } = req.query;
  if (!paginaActual) {
    paginaActual = 1;
  }

  try {
    const response = await todosLosProductos(paginaActual);
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProductosDestacados = async (req, res) => {
  const { limite } = req.body;

  try {
    const response = await productosDestacados(limite);
    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await traerProducto(id);
    res.json(response);
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
    edad,
    genero,
    precio,
    destacado,
    inactivo,
    stock,
  } = req.body;
  try {
    const response = await crearProducto(
      nombre,
      descripcion,
      imagen_principal,
      imagenes_secundarias,
      edad,
      genero,
      precio,
      destacado,
      inactivo,
      stock
    );

    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
const decrementarStock = async (req,res)=>{
  const {producto_id, compra_talla, compra_color, compra_cantidad} = req.body;
  try {
    const response = await decrementarCantidad (
      producto_id,
      compra_talla,
      compra_color.toLowerCase(),
      compra_cantidad);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};


const putProducto = async (req, res) => {
  const { 
    producto_id,
    nombre,
    descripcion,
    imagen_principal,
    imagenes_secundarias,
    edad,
    genero,
    precio,
    destacado,
    inactivo,
    stock } = req.body;
  try {
    const response = await modificarProducto (
      producto_id,
      nombre,
      descripcion,
      imagen_principal,
      imagenes_secundarias,
      edad,
      genero,
      precio,
      destacado,
      inactivo,
      stock);

    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteProducto = async (req, res) => {
  const { producto_id } = req.body;
  try {
    const response = await borrarProducto(producto_id);

    res.json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const standOutProducto = async (req, res) => {
  const { producto_id } = req.body;

  try {
    const response = await destacarProducto(producto_id);

    res.json(response);
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
  standOutProducto,
  getProductosDestacados,
  decrementarStock
};
