const { todasLasPromociones, traerPromocion, crearPromocion } = require("../controllers/promocionesControllers");


const getPromociones = async (req, res) => {
    try{
        const response = await todasLasPromociones()
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getPromocion = async (req, res) => {
    const {id} = req.params;
    try{
        const response = await traerPromocion(id)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postPromocion = async (req, res) => {
    const {a} = req.body;
    try{
        const response = await crearPromocion(a)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putPromocion = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico el Promocion ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deletePromocion = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino el Promocion ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getPromociones,
    getPromocion,
    postPromocion,
    putPromocion,
    deletePromocion
}