const {Router} = require ('express');
const { postSuccessMail, postReviewMail, postFailureMail } = require('../handlers/mailSenderHandlers');
const mailSender = Router();

//Estas dos rutas se deben ejecutar juntas para informar al usuario acerca de su compra  de la posibilidad de calificar los productos comprados.
mailSender.post('/successMail', postSuccessMail)
mailSender.post('/reviewMail', postReviewMail)

//Esta ruta se ejecuta en caso de qeu la compra haya sido cancelada o qeu el pago haya sido rechazado.
mailSender.post('/failureMail', postFailureMail)

module.exports = mailSender;