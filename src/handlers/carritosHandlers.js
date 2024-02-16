

const getCarritos = async (req, res) => {
    try{
        res.status(200).send('todos los Carritos');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getCarrito = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`aca esta el Carrito ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postCarrito = async (req, res) => {
    try{
        res.status(200).send('se creo el Carrito');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putCarrito = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico el Carrito ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteCarrito = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino el Carrito ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getCarritos,
    getCarrito,
    postCarrito,
    putCarrito,
    deleteCarrito
}