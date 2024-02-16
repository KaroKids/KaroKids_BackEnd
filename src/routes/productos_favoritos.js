const {Router} = require ('express');
const { getProductos_favoritos, getProducto_favorito, postProducto_favorito, putProducto_favorito, deleteProducto_favorito } = require('../handlers/productos_favoritosHandlers');
const productos_favoritos = Router();

productos_favoritos.get('/',getProductos_favoritos)
productos_favoritos.get('/:id',getProducto_favorito)
productos_favoritos.post('/',postProducto_favorito)
productos_favoritos.put('/:id',putProducto_favorito)
productos_favoritos.delete('/:id',deleteProducto_favorito)

module.exports = productos_favoritos;