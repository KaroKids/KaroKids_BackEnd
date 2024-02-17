const { crearUsuario, todosLosUsuarios, traerUsuario } = require("../controllers/usuariosControllers");


const getUsuarios = async (req, res) => {
    try{
        const response = await todosLosUsuarios()
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getUsuario = async (req, res) => {
    const {id} = req.params;
    try{
        const response = await traerUsuario(id)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postUsuario = async (req, res) => {
    const {a} = req.body;
    try{
        const response = await crearUsuario(a)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putUsuario = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico el usuario ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteUsuario = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino el usuario ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getUsuarios,
    getUsuario,
    postUsuario,
    putUsuario,
    deleteUsuario
}