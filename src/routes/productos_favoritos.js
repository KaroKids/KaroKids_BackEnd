const { Router } = require("express");
const {
  getProductosFavoritos,
  addProductoFavorito,
  deleteProductoFavorito,
} = require("../handlers/productosFavoritosHandlers");
const productos_favoritos = Router();

productos_favoritos.get("/:usuario_id", getProductosFavoritos);
productos_favoritos.post("/", addProductoFavorito);
productos_favoritos.delete("/", deleteProductoFavorito);

module.exports = productos_favoritos;
