const { Router } = require("express");
const {
  getProducto,
  putProducto,
  deleteProducto,
  postProducto,
} = require("../handlers/productosHandlers");
const productosFiltrados = require("../controllers/ProductosFiltradosControllers");
const productos = Router();

productos.get("/", productosFiltrados);
productos.get("/:id", getProducto);
productos.post("/", postProducto);
productos.put("/:id", putProducto);
productos.delete("/:id", deleteProducto);

module.exports = productos;
