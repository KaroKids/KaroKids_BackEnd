

const getProducto_favoritos_favoritos = async (req, res) => {
    try{
        res.status(200).send('todos los Producto_favoritos_favoritos');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getProducto_favorito = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`aca esta el Producto_favorito ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postProducto_favorito = async (req, res) => {
    try{
        res.status(200).send('se creo el Producto_favorito');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putProducto_favorito = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico el Producto_favorito ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteProducto_favorito = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino el Producto_favorito ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getProducto_favoritos_favoritos,
    getProducto_favorito,
    postProducto_favorito,
    putProducto_favorito,
    deleteProducto_favorito
}