const { Router } = require("express");
const {
  getCarrito,
  postCarrito,
  deleteCarrito,
} = require("../handlers/carritosHandlers");
const carritos = Router();

carritos.get("/", getCarrito);
carritos.post("/", postCarrito);
carritos.delete("/", deleteCarrito);

module.exports = carritos;
