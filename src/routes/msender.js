const {Router} = require ('express');
const { postSuccessMail, postReviewMail, postFailureMail, postPendingMail } = require('../handlers/mailSenderHandlers');
const mailSender = Router();

//Estas dos rutas se deben ejecutar juntas para informar al usuario acerca de su compra  de la posibilidad de calificar los productos comprados.
mailSender.post('/successMail', postSuccessMail)
mailSender.post('/reviewMail', postReviewMail)

//Estas rutas se ejecuta en caso de que la compra haya sido cancelada o que el pago haya sido rechazado.
mailSender.post('/failureMail', postFailureMail)
mailSender.post('/pendingMail', postPendingMail)

module.exports = mailSender;