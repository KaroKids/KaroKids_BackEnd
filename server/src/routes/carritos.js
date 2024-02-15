const {Router} = require ('express');
const { getCarritos, getCarrito, postCarrito, putCarrito, deleteCarrito } = require('../handlers/carritosHandlers');
const carritos = Router();

carritos.get('/',getCarritos)
carritos.get('/:id',getCarrito)
carritos.post('/',postCarrito)
carritos.put('/:id',putCarrito)
carritos.delete('/:id',deleteCarrito)

module.exports = carritos;