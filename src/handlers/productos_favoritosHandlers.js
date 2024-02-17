const { todosLosProductos_favoritos, traerProducto_favorito, crearProducto_favorito } = require("../controllers/productos_favoritosControllers");


const getProductos_favoritos = async (req, res) => {
    try{
        const response = await todosLosProductos_favoritos()
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getProducto_favorito = async (req, res) => {
    const {id} = req.params;
    try{
        const response = await traerProducto_favorito(id);
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postProducto_favorito = async (req, res) => {
    const {a} = req.body;
    try{
        const response = await crearProducto_favorito(a)
        res.status(200).json(response);
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
    getProductos_favoritos,
    getProducto_favorito,
    postProducto_favorito,
    putProducto_favorito,
    deleteProducto_favorito
}