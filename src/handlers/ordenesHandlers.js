const { todasLasOrdenes, traerOrden, crearOrden } = require("../controllers/ordenesControllers");


const getOrdenes = async (req, res) => {
    try{
        const response = await todasLasOrdenes()
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getOrden = async (req, res) => {
    const {id} = req.params;
    try{
        const response = await traerOrden(id)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postOrden = async (req, res) => {
    const {a} = req.body;
    try{
        const response = await crearOrden(a)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putOrden = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico la orden ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteOrden = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino la orden ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getOrdenes,
    getOrden,
    postOrden,
    putOrden,
    deleteOrden
}