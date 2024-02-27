const { Router } = require("express");
const {
  getCarrito,
  addProducto,
  deleteProducto,
  updateProducto,
  deleteCarrito,
} = require("../handlers/carritosHandlers");
const carritos = Router();

carritos.get("/:usuario_id", getCarrito); //carritos/c77e5271-7c45-4b8e-aa5b-55e8ff309d38
carritos.put('/agregar', addProducto)
carritos.put('/eliminar', deleteProducto)
carritos.put('/modificar', updateProducto)
carritos.delete("/:usuario_id", deleteCarrito); //carritos/c77e5271-7c45-4b8e-aa5b-55e8ff309d38

module.exports = carritos;
