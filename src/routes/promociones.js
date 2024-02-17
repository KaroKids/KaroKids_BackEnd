const {Router} = require('express');
const { getPromociones, getPromocion, putPromocion, deletePromocion, postPromocion } = require('../handlers/promocionesHandlers');
const promociones = Router();

promociones.get('/',getPromociones)
promociones.get('/:id',getPromocion)
promociones.post('/',postPromocion)
promociones.put('/:id',putPromocion)
promociones.delete('/:id',deletePromocion)
promociones.get('/',getPromociones)
promociones.get('/:id',getPromocion)
promociones.post('/',postPromocion)
promociones.put('/:id',putPromocion)
promociones.delete('/:id',deletePromocion)

module.exports = promociones;
module.exports = promociones;