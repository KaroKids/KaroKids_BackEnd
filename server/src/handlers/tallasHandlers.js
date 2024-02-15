

const getTallas = async (req, res) => {
    try{
        res.status(200).send('todos los Tallas');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getTalla = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`aca esta el Talla ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postTalla = async (req, res) => {
    try{
        res.status(200).send('se creo el Talla');
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