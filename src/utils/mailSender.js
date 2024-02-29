require('dotenv').config;
const nodeMailer = require('nodemailer');
const path = require('path')

const mailSender = (nombre_usuario, usuario_email) => {
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
          user: process.env.ADMIN_EMAIL, //?Dirección de email del remitente.
          pass: process.env.ADMIN_EMAIL_PASSWORD, //?App password de la cuenta de Gmail.
        },
      });
    
      const html = `
          <h1>Hola ${nombre_usuario}</h1>
          <h2>¡Muchas gracias por elegirnos!</h2>
          <h2>Acabamos de registrar tu compra con el siguiente detalle:</h2>
          <section>
              Listado de productos //?Recibiría la información de data.description
              Por un monto total de: COP 123000 //?Recibiría la información de data.currency_id y de data.transaction_amount
              
          </section>
          <h5>Descarga tu factura electrónica aquí:</h5>
          <>archivo PDF</>
      `

    const mailOptions = {
        from: {
            name: 'Karo Kids',
            address: '<karokids@gmail.com>'
        },
        to: usuario_email,
        // to: [ "user1@example.com", "user2@example.com", "user3@example.com", ], // Se puede colocar una lista de receptores.
        subject: "¡Nueva compra en KaroKids registrada con éxito! ✔", // Subject line
        text: "Hello world?", // plain text body
        html: html, // html body
        attachments: [
            {
                filename: 'factura.pdf',
                path: path.join(__dirname, 'factura.pdf'),
                contentType: 'application/pdf'
            },
            { //Por si quisiéramos renderizar el logo de la empresa en el cuerpo del mail
                filename: 'logo.png',
                path: path.join(__dirname, 'logo.png'),
                contentType: 'application/image'
            }
        ]
    }
    
    const sendMail = async (transporter, mailOptions) => {
        try {
            await transporter.sendMail(mailOptions)
            console.log('¡Email enviado con éxito!')
        } catch (error) {
            console.error(error)

        }
    }

    // sendMail(transporter, mailOptions)

}

module.exports = mailSender;

//! VIDEO: minuto 8:00
//* NOTA:
// Al hacer el checkout en la pasarela de pagos, se obtiene un objeto "data" como respuesta. Este objeto almacena:
//  data.order= {id: '2342234', type: 'mercadopago'}
//?  data.description = string con el nombre del producto.
//?  data.currency_id = string con las siglas de la moneda.
//  data.payer = {first_name:'', last_name:'', email:'', id:'122342'}
//  data.payment_method_id: string con el método de pago. Ej: 'master'
//  data.payment_type_id: string con el tipo de pago. Ej: 'credit_card'
//?  data.transaction_amount: valor numérico total de la compra.
//  data.status: string que indica el estado de la compra. Ej: 'approved'.
//  data.status_detail: string que indica el detalle del status de la compra. Ej: 'accredited' -->Con esta opción se podría determinar si se ejecuta: successmail o rejectedMail