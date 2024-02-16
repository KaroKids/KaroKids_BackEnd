

const getColores = async (req, res) => {
    try{
        res.status(200).send('todos los Colores');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getColor = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`aca esta el Color ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postColor = async (req, res) => {
    try{
        res.status(200).send('se creo el Color');
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const putColor = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se modifico el Color ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const deleteColor = async (req, res) => {
    const {id} = req.params;
    try{
        res.status(200).send(`se elimino el Color ${id}`);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    getColores,
    getColor,
    postColor,
    putColor,
    deleteColor
}