

const getProductos = async (req, res) => {
    try{
        res.status(200).send('todos los productos');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getProducto = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`aca esta el producto ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postProducto = async (req, res) => {
    try{
        res.status(200).send('se creo el producto');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putProducto = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico el producto ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteProducto = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino el producto ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getProductos,
    getProducto,
    postProducto,
    putProducto,
    deleteProducto
}