const {Router} = require ('express');
const { getProductos_descuentos, getProducto_descuento, postProducto_descuento, putProducto_descuento, deleteProducto_descuento } = require('../handlers/productos_descuentosHandlers');
const productos_descuentos = Router();

productos_descuentos.get('/',getProductos_descuentos)
productos_descuentos.get('/:id',getProducto_descuento)
productos_descuentos.post('/',postProducto_descuento)
productos_descuentos.put('/:id',putProducto_descuento)
productos_descuentos.delete('/:id',deleteProducto_descuento)

module.exports = productos_descuentos;