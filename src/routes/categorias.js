const {Router} = require ('express');
const { getCategorias, getCategoria, postCategoria, putCategoria, deleteCategoria } = require('../handlers/categoriasHandlers');
const categorias = Router();

categorias.get('/',getCategorias)
categorias.get('/:id',getCategoria)
categorias.post('/',postCategoria)
categorias.put('/:id',putCategoria)
categorias.delete('/:id',deleteCategoria)

module.exports = categorias;