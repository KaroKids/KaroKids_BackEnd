const { todasLasCategorias, traerCategoria, crearCategoria } = require("../controllers/categoriasController");


const getCategorias = async (req, res) => {
    try{
        const response = await todasLasCategorias()
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getCategoria = async (req, res) => {
    const {id} = req.params;
    try{
        const response = await traerCategoria(id)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postCategoria = async (req, res) => {
    const {categoria} = req.body;
    try{
        const response = await crearCategoria(categoria)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putCategoria = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico el Categoria ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteCategoria = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino el Categoria ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getCategorias,
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria
}