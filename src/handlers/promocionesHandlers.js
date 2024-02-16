

const getPromociones = async (req, res) => {
    try{
        res.status(200).send('todos los Promociones');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getPromocion = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`aca esta el Promocion ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postPromocion = async (req, res) => {
    try{
        res.status(200).send('se creo el Promocion');
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