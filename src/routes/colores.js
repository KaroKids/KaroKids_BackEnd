const {Router} = require ('express');
const { getColores, getColor, postColor, putColor, deleteColor } = require('../handlers/coloresHandlers');
const colores = Router();

colores.get('/',getColores)
colores.get('/:id',getColor)
colores.post('/',postColor)
colores.put('/:id',putColor)
colores.delete('/:id',deleteColor)

module.exports = colores;