const { todosLosProductos_descuento, traerProducto_descuento, crearProducto_descuento } = require("../controllers/productos_descuentosController");


const getProductos_descuentos= async (req, res) => {
    try{
        const response = await todosLosProductos_descuento()
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getProducto_descuento = async (req, res) => {
    const {id} = req.params;
    try{
        const response = await traerProducto_descuento(id)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postProducto_descuento = async (req, res) => {
    const {descuento} = req.body;
    try{
        const response = await crearProducto_descuento(descuento)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putProducto_descuento = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico el Producto_descuento ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteProducto_descuento = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino el Producto_descuento ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getProductos_descuentos,
    getProducto_descuento,
    postProducto_descuento,
    putProducto_descuento,
    deleteProducto_descuento
}