const { successMailSender, reviewMailSender, failureMailSender, pendingMailSender } = require("../controllers/mailSenderControllers");

const postSuccessMail = async (req, res) => {
    const {nombre_usuario, usuario_email, numero_orden, productos_compra, mp_data} = req.body;
    try{
        const response = await successMailSender(nombre_usuario, usuario_email, numero_orden, productos_compra, mp_data)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postReviewMail = async (req, res) => {
    const {nombre_usuario, usuario_email} = req.body;
    try{
        const response = await reviewMailSender(nombre_usuario, usuario_email)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postFailureMail = async (req, res) => {
    const {nombre_usuario, usuario_email, numero_orden, productos_compra, mp_data} = req.body;
    try{
        const response = await failureMailSender(nombre_usuario, usuario_email, numero_orden, productos_compra, mp_data)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

const postPendingMail = async (req, res) => {
    const {nombre_usuario, usuario_email, numero_orden, productos_compra, mp_data} = req.body;
    try{
        const response = await pendingMailSender(nombre_usuario, usuario_email, numero_orden, productos_compra, mp_data)
        res.status(200).json(response);
    }
    catch(error){
        res.status(400).json({error: error.message});
    }
}

module.exports = {
    postSuccessMail, 
    postReviewMail, 
    postFailureMail,
    postPendingMail
}