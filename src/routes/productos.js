const {Router} = require('express');
const { getProductos, getProducto, putProducto, deleteProducto, postProducto } = require('../handlers/productosHandlers');
const productos = Router();

productos.get('/',getProductos)
productos.get('/:id',getProducto)
productos.post('/',postProducto)
productos.put('/:id',putProducto)
productos.delete('/:id',deleteProducto)

module.exports = productos;