const { todosLosColores, traerColor, crearColor } = require("../controllers/coloresController");


const getColores = async (req, res) => {
    try{
        const response = await todosLosColores()
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const getColor = async (req, res) => {
    const {id} = req.params;
    try{
        const response = await traerColor(id)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postColor = async (req, res) => {
    const {a} = req.body;
    try{
        const response = await crearColor(a)
        res.status(200).json(response);
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