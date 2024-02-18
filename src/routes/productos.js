const { Router } = require("express");
const {
	getProducto,
	putProducto,
	deleteProducto,
	postProducto,
} = require("../handlers/productosHandlers");
const productos = Router();
const productosFiltrados = require("../controllers/productosFiltradosController");

productos.get("/", productosFiltrados);
productos.get("/:id", getProducto);
productos.post("/", postProducto);
productos.put("/:id", putProducto);
productos.delete("/:id", deleteProducto);

module.exports = productos;
