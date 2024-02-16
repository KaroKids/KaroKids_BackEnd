const {Router} = require ('express');
const { getEntidades, getEntidad, postEntidad, putEntidad, deleteEntidad } = require('../handlers/entidadHandlers');
const entidad = Router();

entidad.get('/',getEntidades)
entidad.get('/:id',getEntidad)
entidad.post('/',postEntidad)
entidad.put('/:id',putEntidad)
entidad.delete('/:id',deleteEntidad)

module.exports = entidad;