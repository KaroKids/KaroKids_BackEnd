const { todosLosStocks, traerStock, crearStock } = require("../controllers/stockControllers");


const getStocks = async (req, res) => {
    try{
        const response = await todosLosStocks();
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getStock = async (req, res) => {
    const {id} = req.params;
    try{
        const response = await traerStock(id);
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postStock = async (req, res) => {
    const {cantidad_producto} = req.body;
    try{
        const response = await crearStock(cantidad_producto);
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putStock = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico el Stock ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteStock = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino el Stock ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getStocks,
    getStock,
    postStock,
    putStock,
    deleteStock
}