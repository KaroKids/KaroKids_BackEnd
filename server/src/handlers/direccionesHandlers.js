

const getDirecciones = async (req, res) => {
    try{
        res.status(200).send('todos los Direcciones');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getDireccion = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`aca esta el Direccion ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postDireccion = async (req, res) => {
    try{
        res.status(200).send('se creo el Direccion');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putDireccion = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico el Direccion ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteDireccion = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino el Direccion ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getDirecciones,
    getDireccion,
    postDireccion,
    putDireccion,
    deleteDireccion
}