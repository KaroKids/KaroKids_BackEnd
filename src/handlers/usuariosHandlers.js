

const getUsuarios = async (req, res) => {
    try{
        res.status(200).send('todos los usuarios');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getUsuario = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`aca esta el usuario ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postUsuario = async (req, res) => {
    try{
        res.status(200).send('se creo el usuario');
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