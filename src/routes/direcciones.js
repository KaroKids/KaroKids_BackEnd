const {Router} = require ('express');
const { getDirecciones, getDireccion, postDireccion, putDireccion, deleteDireccion } = require('../handlers/direccionesHandlers');
const direcciones = Router();

direcciones.get('/',getDirecciones)
direcciones.get('/:id',getDireccion)
direcciones.post('/',postDireccion)
direcciones.put('/:id',putDireccion)
direcciones.delete('/:id',deleteDireccion)

module.exports = direcciones;