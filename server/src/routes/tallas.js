const {Router} = require ('express');
const { getTallas, getTalla, postTalla, putTalla, deleteTalla } = require('../handlers/tallasHandlers');
const tallas = Router();

tallas.get('/',getTallas)
tallas.get('/:id',getTalla)
tallas.post('/',postTalla)
tallas.put('/:id',putTalla)
tallas.delete('/:id',deleteTalla)

module.exports = tallas;