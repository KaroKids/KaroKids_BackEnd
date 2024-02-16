

const getRoles = async (req, res) => {
    try{
        res.status(200).send('todos los Roles');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getRol = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`aca esta el Rol ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postRol = async (req, res) => {
    try{
        res.status(200).send('se creo el Rol');
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