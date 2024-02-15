const {Router} = require('express');
const { getpromociones, postPromocion, putPromocion, deletePromocion, getPromocion } = require('../handlers/promocionesHandlers');
const promociones = Router();

promociones.get('/',getpromociones)
promociones.get('/:id',getPromocion)
promociones.post('/',postPromocion)
promociones.put('/:id',putPromocion)
promociones.delete('/:id',deletePromocion)

module.exports = promociones;