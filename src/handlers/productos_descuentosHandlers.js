

const getProductos_descuentos= async (req, res) => {
    try{
        res.status(200).send('todos los Producto_descuentos_descuentos');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getProducto_descuento = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`aca esta el Producto_descuento ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postProducto_descuento = async (req, res) => {
    try{
        res.status(200).send('se creo el Producto_descuento');
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