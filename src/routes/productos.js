const { Router } = require("express");
const {
  getProducto,
  putProducto,
  deleteProducto,
  postProducto,
  standOutProducto,
} = require("../handlers/productosHandlers");
const productosFiltrados = require("../controllers/productosFiltradosController");
const productos = Router();

productos.get("/", productosFiltrados);
productos.get("/:id", getProducto);
productos.post("/", postProducto);
productos.put("/modificar", putProducto);
productos.put("/", deleteProducto);
productos.put("/destacado", standOutProducto);

module.exports = productos;
