const { Router } = require("express");
const {
  getCarrito,
  postCarrito,
  putCarrito,
  deleteCarrito,
} = require("../handlers/carritosHandlers");
const carritos = Router();

carritos.get("/:usuarioId", getCarrito);
carritos.post("/:usuarioId", postCarrito);
carritos.put("/:carritoId", putCarrito);
carritos.delete("/:carritoId", deleteCarrito);

module.exports = carritos;
