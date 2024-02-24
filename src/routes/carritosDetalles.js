const { Router } = require("express");
const {
  addProducto,
  deleteProducto,
} = require("../handlers/carritosDetallesHandlers");
const carritosDetalles = Router();

carritosDetalles.post("/", addProducto);
carritosDetalles.delete("/", deleteProducto);

module.exports = carritosDetalles;
