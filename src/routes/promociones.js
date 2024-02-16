const {Router} = require('express');
const { getPromociones, getPromocion, putPromocion, deletePromocion, postPromocion } = require('../handlers/PromocionesHandlers');
const Promociones = Router();

Promociones.get('/',getPromociones)
Promociones.get('/:id',getPromocion)
Promociones.post('/',postPromocion)
Promociones.put('/:id',putPromocion)
Promociones.delete('/:id',deletePromocion)

module.exports = Promociones;