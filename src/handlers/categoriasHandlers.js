

const getCategorias = async (req, res) => {
    try{
        res.status(200).send('todos los Categorias');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getCategoria = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`aca esta el Categoria ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postCategoria = async (req, res) => {
    try{
        res.status(200).send('se creo el Categoria');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putCategoria = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico el Categoria ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteCategoria = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino el Categoria ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getCategorias,
    getCategoria,
    postCategoria,
    putCategoria,
    deleteCategoria
}