const { todasLasTallas, traerTalla, crearTalla } = require("../controllers/tallasControllers");


const getTallas = async (req, res) => {
    try{
        const response = await todasLasTallas();
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getTalla = async (req, res) => {
    const {id} = req.params;
    try{
        const response = await traerTalla(id);
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postTalla = async (req, res) => {
    const {a} = req.body;
    try{
        const response = await crearTalla(a);
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putTalla = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico el Talla ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteTalla = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino el Talla ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getTallas,
    getTalla,
    postTalla,
    putTalla,
    deleteTalla
}