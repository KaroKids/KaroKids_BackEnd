const {Router} = require('express');
const {getOrdenes, getOrden, postOrden, putOrden, deleteOrden} = require ('../handlers/ordenesHandlers');
const ordenesFiltradas = require('../controllers/ordenesFiltradasControllers');
const ordenes = Router();

ordenes.get('/',ordenesFiltradas)
ordenes.get('/:id',getOrden)
ordenes.post('/',postOrden)
ordenes.put('/',putOrden)
ordenes.delete('/:id',deleteOrden)

module.exports = ordenes;