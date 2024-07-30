const { todasLasEntidades, traerEntidad, crearEntidad } = require("../controllers/entidadController");


const getEntidades = async (req, res) => {
    try{
        const response = await todasLasEntidades()
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getEntidad = async (req, res) => {
    const {id} = req.params;
    try{
        const response = await traerEntidad(id)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postEntidad = async (req, res) => {
    const {a} = req.body;
    try{
        const response = await crearEntidad(a)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putEntidad = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico el Entidad ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteEntidad = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino el Entidad ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getEntidades,
    getEntidad,
    postEntidad,
    putEntidad,
    deleteEntidad
}