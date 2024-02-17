const { todosLosRoles, traerRol, crearRol } = require("../controllers/rolesController");

const getRoles = async (req, res) => {
    try{
        const response = await todosLosRoles()
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getRol = async (req, res) => {
    const {id} = req.params;
    try{
        const response = await traerRol(id)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postRol = async (req, res) => {
    const {a} = req.body;
    try{
        const response = await crearRol(a)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putRol = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico el Rol ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteRol = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino el Rol ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getRoles,
    getRol,
    postRol,
    putRol,
    deleteRol
}