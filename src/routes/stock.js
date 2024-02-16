const {Router} = require ('express');
const { getStocks, getStock, postStock, putStock, deleteStock } = require('../handlers/stockHandlers');
const stock = Router();

stock.get('/',getStocks)
stock.get('/:id',getStock)
stock.post('/',postStock)
stock.put('/:id',putStock)
stock.delete('/:id',deleteStock)

module.exports = stock;