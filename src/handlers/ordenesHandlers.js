

const getOrdenes = async (req, res) => {
    try{
        const result = await todasLasOrdenes();
        res.status(200).json(result);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getOrden = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`aca esta la orden ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postOrden = async (req, res) => {
    try{
        res.status(200).send('se creo la orden');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putOrden = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico la orden ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteOrden = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino la orden ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getOrdenes,
    getOrden,
    postOrden,
    putOrden,
    deleteOrden
}