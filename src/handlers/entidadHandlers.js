

const getEntidades = async (req, res) => {
    try{
        res.status(200).send('todos los Entidades');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getEntidad = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`aca esta el Entidad ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postEntidad = async (req, res) => {
    try{
        res.status(200).send('se creo el Entidad');
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