

const getStocks = async (req, res) => {
    try{
        res.status(200).send('todos los Stocks');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getStock = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`aca esta el Stock ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postStock = async (req, res) => {
    try{
        res.status(200).send('se creo el Stock');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putStock = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico el Stock ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteStock = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino el Stock ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getStocks,
    getStock,
    postStock,
    putStock,
    deleteStock
}