const { Router } = require("express");
const {
  getCarrito,
  addProducto,
  deleteProducto,
  updateProducto,
  deleteCarrito,
} = require("../handlers/carritosHandlers");
const carritos = Router();

carritos.get("/", getCarrito);
carritos.put('/agregar', addProducto)
carritos.put('/eliminar', deleteProducto)
carritos.put('/modificar', updateProducto)
carritos.delete("/", deleteCarrito);

module.exports = carritos;
