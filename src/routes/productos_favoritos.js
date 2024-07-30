const { Router } = require("express");
const {
  getProductosFavoritos,
  addProductoFavorito,
  deleteProductoFavorito,
  getTopFavoritos,
} = require("../handlers/productosFavoritosHandlers");
const productos_favoritos = Router();

productos_favoritos.get("/usuario/:usuario_id", getProductosFavoritos);
productos_favoritos.get("/top", getTopFavoritos);
productos_favoritos.post("/", addProductoFavorito);
productos_favoritos.put("/", deleteProductoFavorito);

module.exports = productos_favoritos;
