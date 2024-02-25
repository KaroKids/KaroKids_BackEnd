const { Router } = require("express");
const {
  getCarrito,
  postCarrito,
  updateCarrito,
  deleteCarrito,
} = require("../handlers/carritosHandlers");
const carritos = Router();

carritos.get("/", getCarrito);
carritos.post("/", postCarrito);
carritos.put('/', updateCarrito) //Sería un método put o un método post la acción d eeliminar un producto del carrito?
carritos.delete("/", deleteCarrito);

module.exports = carritos;
