require('dotenv').config();
const nodeMailer = require('nodemailer');

  //* ------------------------NOTA:----------------------------------//
    // Al hacer el checkout en la pasarela de pagos, se obtiene un objeto "data" como respuesta. Este objeto (recibido como "mp_data") almacena:
    //  data.order= {id: '2342234', type: 'mercadopago'}
    //?  data.description = string con el nombre del producto.
    //?  data.currency_id = string con las siglas de la moneda.
    //  data.payer = {first_name:'', last_name:'', email:'', id:'122342'}
    //  data.payment_method_id: string con el método de pago. Ej: 'master'
    //  data.payment_type_id: string con el tipo de pago. Ej: 'credit_card'
    //?  data.transaction_amount: valor numérico total de la compra.
    //?  data.status: string que indica el estado de la compra. Ej: 'approved'.
    //?  data.status_detail: string que indica el detalle del status de la compra. Ej: 'accredited' -->Con esta opción se podría determinar si se ejecuta: successmailSender o failureMailSender
    //* ----------------------------------------------------------//


const successMailSender = async (nombre_usuario, usuario_email, numero_orden, productos_compra, mp_data) =>{
    //* Definicion de variables:
    const nombreUsuario = nombre_usuario
    const emailUsuario  = usuario_email // Puede ser un array de strings con varios mails.
    const numeroOrden = numero_orden //? ¿Va a ser el número de orden de la DB o el que envía MP?
    const moneda = mp_data.currency_id
    const monto_total = mp_data.transaction_amount //? O el valor de "total_compra" del objeto "productos_compra"?? 
    const estado_compra = ''
    const estado_compra_detalle = ''
    const forma_pago = ''
    const forma_pago_detalle = ''

    //* Validacion de estado y aprobacion del pago:
    if (mp_data.status === 'approved') {
        estado_compra = 'Compra aprobada'
    }

    if (mp_data.status_detail === 'accredited') {
        estado_compra_detalle = 'Pago acreditado'
    }

    if (mp_data.payment_method_id === 'credit_card') {
        forma_pago = "Tarjeta de crédito"
        forma_pago_detalle = "Master"
    }

    //* Funcionalidad:    
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASSWORD,
        },
    });

    const htmlSuccessful = `<div>
    <table align="center" border="0">
        <tbody style="text-align:center">
            
            <tr>
                <td style="text-align:center">
                    <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709364802/Imagenes_Productos/Logos/Banner-logo2_vitkys.png" alt="banner_con_logo_Cloudinary" style="width:900px;height:260px" />
                </td>
            </tr>

            <tr>               
                <td>&nbsp;</td>
            </tr>

            <tr>
                <td style="text-align:center; margin:5px; padding: 5px;">
                    <h1 style="margin: 5px; padding:5px;">¡Hola ${nombreUsuario}!</h1>
                </td>
            </tr>

            <tr>
                <td style="text-align:center; margin:5px; padding: 5px;">
                    <h2 style="margin: 5px; padding:5px;">¡Muchas gracias por elegirnos y confiar en nosotros!</h2>
                </td>
            </tr>

            <tr> 
                <td style="padding:16px">
                <table border="0" align="center" width="100%" cellpadding="0" style="text-align:center; background-image:url(https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709709855/Imagenes_Productos/Logos/Banner-Reviews-desenfocado_zcdjkp.png); background-position: center;background-repeat: no-repeat; background-size: cover; border-radius:5px; max-width:1000px; width:100%">
                    <tbody>
                        <tr>
                            <td style="text-align:center; margin:5px; padding: 5px;">
                                <h3 style="margin: 20px 10px 20px 120px; padding:10px 10px 10px 80px;">Acabamos de registrar su compra con el siguiente detalle:</h3>

                            </td>
                        </tr>
                    </tbody>
                </table>
                </td>
            </tr>

            <tr>               
                <td>&nbsp;</td>
            </tr>

            <tr>
                <td style="text-align:center">
                    <table align="center" border="0" cellpadding="0" style="background-color:#ddd7cf; border:1px solid #d9dbde; border-radius:3px; font-family:arial,sans-serif; max-width:700px; width:100%">
                        <tbody>
                            <tr>
                                <td style="text-align:center; font-size:17px; padding:16px; width:100%">
                                    <strong>
                                        Número de orden: ${numeroOrden}
                                    </strong>
                                </td>
                            </tr>

                            <tr>
                                <td style="text-align:center; font-size:17px; padding:16px; width:100%">
                                    <strong>
                                        Estado: ${estado_compra} - ${estado_compra_detalle}
                                    </strong>
                                </td>
                            </tr>

                            <tr>
                                <td style="text-align:center; font-size:16px; padding:16px; width:100%">
                                    <strong>
                                        Listado de productos: 
                                    </strong>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <table border="0" cellspacing="5px" style="color:#4d4d4d; font-size:13px" width="100%">
                                        <tbody>
                                            <!-- Cada "<tr>"" podría renderizarse a partir de un map del array de productos comprados -->
                                                <!-- productos_compra?.map((producto, index) => {
                                                    <tr key="index">
                                                        <td align="left">{producto.nombre}</td>
                                                        <td align="right">{producto.compra_talla, producto.compra_color, producto.compra_cantidad}</td>
                                                    </tr>
                                                }) -->
                                            <tr>
                                                <td style="padding:5px 10px" align="left">Producto 1</td>
                                                <td style="padding:5px 10px" align="right"> Detalle 1</td>
                                                <!-- {/* <td align="center">Detalle 1</td>
                                                <td align="right">COP Precio_unitario 1</td> */} -->
                                            </tr>
                                            <tr>
                                                <td style="padding:5px 10px" align="left">Producto 2</td>
                                                <td style="padding:5px 10px" align="right"> Detalle 2</td>
                                                <!-- {/* <td align="center">Detalle 2</td>
                                                <td align="right">COP Precio_unitario 2</td> */} -->
                                            </tr>
                                            <tr>
                                                <td style="padding:5px 10px" align="left">Producto 3</td>
                                                <td style="padding:5px 10px" align="right"> Detalle 3</td>
                                                <!-- {/* <td align="center">Detalle 3</td>
                                                <td align="right">COP Precio_unitario 3</td> */} -->

                                            </tr>
                                        </tbody>
                                    </table>
                                </td>
                            </tr>

                            <tr>
                                <td style="text-align:center; font-size:16px; padding:16px 5px 5px 5px; width:100%">
                                    <strong>
                                        Monto total de la compra: ${moneda} ${monto_total}
                                    </strong>
                                </td>
                            </tr>  

                            <tr>
                                <td style="text-align:center; font-size:15px; padding:16px 5px 5px 5px; width:100%">
                                    <strong>
                                        Método de pago: ${forma_pago} - ${forma_pago_detalle}
                                    </strong>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </td>
            </tr>

            <tr>
                <td style="text-align:center; padding:10px"><br/>
                    <h4>
                        ¿Dudas o consultas? Puede comunicarse con nosotros a través de los siguientes canales de diálogo:
                    </h4>
                </td>
            </tr>

            <tr>
                <td style="text-align:center">
                    <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709711700/Imagenes_Productos/Logos/Flechas_azules_viisgd.gif" alt="gif_flechas" style="width:120px;height:50px" />
                </td>
            </tr>

            <tr> 
                <td style="padding:16px">
                <table border="0" align="center" width="100%" cellpadding="0" style="text-align:center; background-image:url(https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709365873/Imagenes_Productos/Logos/fondo-redes-difuminado_nb1teq.png); background-repeat: no-repeat; background-size: cover; border-radius:3px; max-width:650px; width:100%">
                    <tbody>
                        <tr>
                            <td style="padding:10px; width:50px">
                                <a href="https://www.facebook.com/YosoyKaroKids/" style="display:contents; text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/YosoyKaroKids/">
                                    <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709367030/Imagenes_Productos/Logos/1-FB_icon-no_background_wbjq0v.png" alt="FB_icon" width="50px" heigth="50px"/>
                                </a>
                            </td>

                            <td style="width:4px;height:40px">&nbsp;</td>

                            <td style="padding:10px; width:50px">
                                <a href="https://www.instagram.com/yosoy.karokidsmoda/" style="display:contents;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/yosoy.karokidsmoda/">
                                    <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709528362/Imagenes_Productos/Logos/2-IG_icon-no_background_k3ajsy.png" alt="IG_icon" width="50px" heigth="50px"/>
                                </a>
                            </td>

                            <td style="width:4px;height:40px">&nbsp;</td>

                            <td style="padding:10px; width:50px">
                                <a href="https://wa.link/fdh8yl" style="display:contents; text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://wa.link/fdh8yl">
                                    <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709367034/Imagenes_Productos/Logos/3-WSP_icon-no_background_fihi8y.png" alt="WSP_icon" width="55px" heigth="55px"/>
                                </a>
                            </td>
                        </tr>
                    </tbody>
                </table>
                </td>
            </tr>

        </tbody>
    </table>    
    </div>
    `

    const mailOptions = {
        from: {
            name: 'Karo Kids',
            address: process.env.ADMIN_EMAIL
        },
        to: [emailUsuario, 'jgerfuentes@gmail.com'],
        subject: "¡Nueva compra en KaroKids registrada con éxito! 🛒✔",
        html: htmlSuccessful,
        //? attachments: [
                // Se añade la ruta al archivo PDF que se encuentra almacenado de manera local.
        //     {
        //         filename: 'factura.pdf',
        //         path: path.join(__dirname, 'factura.pdf'),
        //         contentType: 'application/pdf'
        //     }
        //? ]
    }

    const sendMail = async (transporter, mailOptions) => {
        try {
            await transporter.sendMail(mailOptions)
            console.log('¡Email enviado con éxito!')
        } catch (error) {
            console.error(error)
            throw new Error ('Error en el controlador successMailSender')
        }
    }

    //* Ejecución del envío
    sendMail(transporter, mailOptions)
};


const reviewMailSender = async (nombre_usuario, usuario_email, numero_orden, productos_compra, mp_data) =>{
    //* Definicion de variables:
    const nombreUsuario = nombre_usuario
    const emailUsuario  = usuario_email // Puede ser un array de strings con varios mails.
    const numeroOrden = numero_orden //? ¿Va a ser el número de orden de la DB o el que envía MP?
    const moneda = mp_data.currency_id
    const monto_total = mp_data.transaction_amount //? O el valor de "total_compra" del objeto "productos_compra"?? 

    //* Funcionalidad
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASSWORD,
        },
    });
    
    const htmlReview = `
    <div>
        <table align="center" border="0">
            <tbody style="text-align:center">
                
                <tr>
                    <td style="text-align:center">
                        <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709364802/Imagenes_Productos/Logos/Banner-logo2_vitkys.png" alt="banner_con_logo_Cloudinary" style="width:900px;height:260px" />
                    </td>
                </tr>
     
                <tr>               
                    <td>&nbsp;</td>
                </tr>
    
                <tr>
                    <td style="text-align:center; margin:5px; padding: 5px;">
                        <h1 style="margin: 5px; padding:5px;">¡Hola ${nombreUsuario}!</h1>
                    </td>
                </tr>
    
                <tr>
                    <td style="text-align:center; margin:5px; padding: 5px;">
                        <h2 style="margin: 5px; padding:5px;">¡Muchas gracias por elegirnos y confiar en nosotros!</h2>
                    </td>
                </tr>
    
                <tr>               
                    <td>&nbsp;</td>
                </tr>
    
                <tr> 
                    <td style="padding:16px">
                    <table border="0" align="center" width="100%" cellpadding="0" style="text-align:center; background-image:url(https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709709855/Imagenes_Productos/Logos/Banner-Reviews-desenfocado_zcdjkp.png); background-position: center;background-repeat: no-repeat; background-size: cover; border-radius:5px; max-width:1000px; width:100%">
                        <tbody>
                            <tr>
                                <td style="text-align:center; margin:5px; padding: 5px;">
                                    <h3 style="margin: 20px 10px 20px 120px; padding:10px 10px 10px 80px;">En Karo Kids valoramos inmensamente la opinión de nuestros clientes, por eso es que le recordamos que cuenta con la posibilidad de puntuar y comentar todos aquellos productos que haya adquirido en nuestro local. De esta manera, podrá sumar su granito de arena a nuestro deseo de mantener una línea de comunicación activa con nuestra gente, ¡la familia KaroKids!</h3>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </td>
                </tr>
    
                <tr>               
                    <td>&nbsp;</td>
                </tr>
    
                <tr>
                    <td style="text-align:center; margin:5px; padding: 5px;">
                        <h2 style="margin: 5px; padding:5px;">Detalle de su última visita:</h2>
                    </td>
                </tr>
    
                <tr>               
                    <td>&nbsp;</td>
                </tr>
    
                <tr>
                    <td style="text-align:center">
                        <table align="center" border="0" cellpadding="0" style="background-color:#ddd7cf; border:1px solid #d9dbde; border-radius:3px; font-family:arial,sans-serif; max-width:700px; width:100%">
                            <tbody>
                                <tr>               
                                    <td style="text-align:center; font-size:17px; padding:16px; width:100%"">
                                        <strong>Número de orden: ${numeroOrden}</strong>
                                    </td>
                                </tr>
    
                                <tr>
                                    <td style="text-align:center; font-size:16px; padding:16px; width:100%">
                                        <strong>
                                            Listado de productos: 
                                        </strong>
                                    </td>
                                </tr>
    
                                <tr>
                                    <td>
                                        <table border="0" cellspacing="5px" style="color:#4d4d4d; font-size:13px" width="100%">
                                            <tbody>
                                                <!-- Cada "<tr>"" podría renderizarse a partir de un map del array de productos comprados -->
                                                    <!-- productos_compra?.map((producto, index) => {
                                                        <tr key="index">
                                                            <td align="left">{producto.nombre}</td>
                                                            <td align="right">{producto.compra_talla, producto.compra_color, producto.compra_cantidad}</td>
                                                        </tr>
                                                    }) -->
                                                <tr>
                                                    <td style="padding:5px 10px" align="left">Producto 1</td>
                                                    <td style="padding:5px 10px" align="right"> Detalle 1</td>
                                                    <!-- {/* <td align="center">Detalle 1</td>
                                                    <td align="right">COP Precio_unitario 1</td> */} -->
                                                </tr>
                                                <tr>
                                                    <td style="padding:5px 10px" align="left">Producto 2</td>
                                                    <td style="padding:5px 10px" align="right"> Detalle 2</td>
                                                    <!-- {/* <td align="center">Detalle 2</td>
                                                    <td align="right">COP Precio_unitario 2</td> */} -->
                                                </tr>
                                                <tr>
                                                    <td style="padding:5px 10px" align="left">Producto 3</td>
                                                    <td style="padding:5px 10px" align="right"> Detalle 3</td>
                                                    <!-- {/* <td align="center">Detalle 3</td>
                                                    <td align="right">COP Precio_unitario 3</td> */} -->
    
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
    
                                <tr>
                                    <td style="text-align:center; font-size:16px; padding:16px 5px 5px 5px; width:100%">
                                        <strong>
                                            Monto total de la compra: ${moneda} ${monto_total}
                                        </strong>
                                    </td>
                                </tr> 
                            </tbody>
                        </table>
                    </td>
                </tr>
    
                <tr> 
                    <td style="text-align:center; padding:10px"><br/>
                        <h3>
                            ¿Está satisfecho con su compra? Puede calificar sus productos y dejarnos un comentario accediendo a <a href="http://localhost:5173/" target="_blank" style="text-decoration:underline" data-saferedirecturl="https://www.google.com/url?q=http://localhost:5173/">su perfil de usuario</a>
                        </h3>
                    </td>
                </tr>
    
                <tr>
                    <td style="text-align:center; padding:10px"><br/>
                        <h4>
                            ¿Dudas o consultas? Puede comunicarse con nosotros a través de los siguientes canales de diálogo:
                        </h4>
                    </td>
                </tr>
    
                <tr>
                    <td style="text-align:center">
                        <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709711700/Imagenes_Productos/Logos/Flechas_azules_viisgd.gif" alt="gif_flechas" style="width:120px;height:50px" />
                    </td>
                </tr>
    
                <tr> 
                    <td style="padding:16px">
                    <table border="0" align="center" width="100%" cellpadding="0" style="text-align:center; background-image:url(https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709365873/Imagenes_Productos/Logos/fondo-redes-difuminado_nb1teq.png); background-repeat: no-repeat; background-size: cover; border-radius:3px; max-width:650px; width:100%">
                        <tbody>
                            <tr>
                                <td style="padding:10px; width:50px">
                                    <a href="https://www.facebook.com/YosoyKaroKids/" style="display:contents; text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/YosoyKaroKids/">
                                        <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709367030/Imagenes_Productos/Logos/1-FB_icon-no_background_wbjq0v.png" alt="FB_icon" width="50px" heigth="50px"/>
                                    </a>
                                </td>
    
                                <td style="width:4px;height:40px">&nbsp;</td>
    
                                <td style="padding:10px; width:50px">
                                    <a href="https://www.instagram.com/yosoy.karokidsmoda/" style="display:contents;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/yosoy.karokidsmoda/">
                                        <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709528362/Imagenes_Productos/Logos/2-IG_icon-no_background_k3ajsy.png" alt="IG_icon" width="50px" heigth="50px"/>
                                    </a>
                                </td>
    
                                <td style="width:4px;height:40px">&nbsp;</td>
    
                                <td style="padding:10px; width:50px">
                                    <a href="https://wa.link/fdh8yl" style="display:contents; text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://wa.link/fdh8yl">
                                        <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709367034/Imagenes_Productos/Logos/3-WSP_icon-no_background_fihi8y.png" alt="WSP_icon" width="55px" heigth="55px"/>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </td>
                </tr>
    
            </tbody>
        </table>    
    </div>
    `
    
    const mailOptions = {
        from: {
            name: 'Karo Kids',
            address: process.env.ADMIN_EMAIL
        },
        to: [emailUsuario, 'jgerfuentes@gmail.com'],
        subject: "¡Su compra en KaroKids pendiente de calificación! 🛒📭",
        html: htmlReview,
        //? attachments: [
                // Se añade la ruta al archivo PDF que se encuentra almacenado de manera local.
        //     {
        //         filename: 'factura.pdf',
        //         path: path.join(__dirname, 'factura.pdf'),
        //         contentType: 'application/pdf'
        //     }
        //? ]
    }
    
    const sendMail = async (transporter, mailOptions) => {
        try {
            await transporter.sendMail(mailOptions)
            console.log('¡Email enviado con éxito!')
        } catch (error) {
            console.error(error)
            throw new Error ('Error en el controlador reviewMailSender')
        }
    }

    //* Ejecución del envío
    sendMail(transporter, mailOptions)
};


const failureMailSender = async (nombre_usuario, usuario_email, numero_orden, productos_compra, mp_data) =>{
      //* Definicion de variables:
    const nombreUsuario = nombre_usuario
    const emailUsuario  = usuario_email // Puede ser un array de strings con varios mails.
    const numeroOrden = numero_orden //? ¿Va a ser el número de orden de la DB o el que envía MP?
    const moneda = mp_data.currency_id
    const monto_total = mp_data.transaction_amount //? O el valor de "total_compra" del objeto "productos_compra"?? 
    const estado_compra = ''
    const estado_compra_detalle = ''
    const forma_pago = ''
    const forma_pago_detalle = ''

    //* Funcionalidad
    const transporter = nodeMailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: process.env.ADMIN_EMAIL,
            pass: process.env.ADMIN_EMAIL_PASSWORD,
        },
    });
    
    const htmlFailure = `
    <div>
        <table align="center" border="0">
            <tbody style="text-align:center">
                
                <tr>
                    <td style="text-align:center">
                        <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709364802/Imagenes_Productos/Logos/Banner-logo2_vitkys.png" alt="banner_con_logo_Cloudinary" style="width:900px;height:260px" />
                    </td>
                </tr>
     
                <tr>               
                    <td>&nbsp;</td>
                </tr>
    
                <tr>
                    <td style="text-align:center; margin:5px; padding: 5px;">
                        <h1 style="margin: 5px; padding:5px;">¡Hola ${nombreUsuario}!</h1>
                    </td>
                </tr>
    
                <tr>
                    <td style="text-align:center; margin:5px; padding: 5px;">
                        <h2 style="margin: 5px; padding:5px;">¡Muchas gracias por elegirnos y confiar en nosotros!</h2>
                    </td>
                </tr>
    
                <tr>
                    <td>
                        <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709711465/Imagenes_Productos/Logos/4-_Warning_icon-no_background_zjx0m7.png" alt="warning_icon" width="300px" heigth="300px"/>
                    </td>
                </tr>
                
                <tr> 
                    <td style="padding:16px">
                    <table border="0" align="center" width="100%" cellpadding="0" style="text-align:center; background-image:url(https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709709855/Imagenes_Productos/Logos/Banner-Reviews-desenfocado_zcdjkp.png); background-position: center;background-repeat: no-repeat; background-size: cover; border-radius:5px; max-width:1000px; width:100%">
                        <tbody>
                            <tr>
                                <td style="text-align:center; margin:5px; padding: 5px;">
                                    <h3 style="margin: 20px 10px 20px 120px; padding:10px 10px 10px 80px;">Lamentamos informarle que hemos registrado un inconveniente con su última compra. A continuación le presentamos los detalles de la misma:</h3>
    
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </td>
                </tr>    
    
                <tr>               
                    <td>&nbsp;</td>
                </tr>
    
                <tr>
                    <td style="text-align:center">
                        <table align="center" border="0" cellpadding="0" style="background-color:#ddd7cf; border:1px solid #d9dbde; border-radius:3px; font-family:arial,sans-serif; max-width:700px; width:100%">
                            <tbody>
                                <tr>               
                                    <td style="text-align:center; font-size:17px; padding:16px; width:100%"">
                                        <strong>Número de orden: ${numeroOrden}</strong>
                                    </td>
                                </tr>
    
                                <tr>               
                                    <td style="text-align:center; font-size:17px; padding:16px; width:100%"">
                                        <strong>Estado: ${estado_compra} - ${estado_compra_detalle}</strong>
                                    </td>
                                </tr>
    
                                <tr>
                                    <td style="text-align:center; font-size:16px; padding:16px; width:100%">
                                        <strong>
                                            Listado de productos: 
                                        </strong>
                                    </td>
                                </tr>
    
                                <tr>
                                    <td>
                                        <table border="0" cellspacing="5px" style="color:#4d4d4d; font-size:13px" width="100%">
                                            <tbody>
                                                <!-- Cada "<tr>"" podría renderizarse a partir de un map del array de productos comprados -->
                                                    <!-- productos_compra?.map((producto, index) => {
                                                        <tr key="index">
                                                            <td align="left">{producto.nombre}</td>
                                                            <td align="right">{producto.compra_talla, producto.compra_color, producto.compra_cantidad}</td>
                                                        </tr>
                                                    }) -->
                                                <tr>
                                                    <td style="padding:5px 10px" align="left">Producto 1</td>
                                                    <td style="padding:5px 10px" align="right"> Detalle 1</td>
                                                    <!-- {/* <td align="center">Detalle 1</td>
                                                    <td align="right">COP Precio_unitario 1</td> */} -->
                                                </tr>
                                                <tr>
                                                    <td style="padding:5px 10px" align="left">Producto 2</td>
                                                    <td style="padding:5px 10px" align="right"> Detalle 2</td>
                                                    <!-- {/* <td align="center">Detalle 2</td>
                                                    <td align="right">COP Precio_unitario 2</td> */} -->
                                                </tr>
                                                <tr>
                                                    <td style="padding:5px 10px" align="left">Producto 3</td>
                                                    <td style="padding:5px 10px" align="right"> Detalle 3</td>
                                                    <!-- {/* <td align="center">Detalle 3</td>
                                                    <td align="right">COP Precio_unitario 3</td> */} -->
    
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
    
                                <tr>
                                    <td style="text-align:center; font-size:16px; padding:16px 5px 5px 5px; width:100%">
                                        <strong>
                                            Monto total de la compra: ${moneda} ${monto_total}
                                        </strong>
                                    </td>
                                </tr> 
    
                                <tr>
                                    <td style="text-align:center; font-size:15px; padding:16px 5px 5px 5px; width:100%">
                                        <strong>
                                            Método de pago: ${forma_pago} - ${forma_pago_detalle}
                                        </strong>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </td>
                </tr>
                
                <tr>               
                    <td>&nbsp;</td>
                </tr>
    
                <tr>
                    <td style="text-align:center; margin:5px; padding: 5px;">
                        <h2 style="margin: 5px; padding:5px;"> ⛔ Motivo del inconveniente: Pago no acreditado / Operación cancelada ⛔</h2>
                    </td>
                </tr>
    
                <tr>
                    <td style="text-align:center"><br/>
                        <h3>
                            Lo invitamos a comunicarse con nosotros a través de nuestros canales oficiales para poder brindarle asesoramiento a la mayor brevedad posible.
                        </h3>
                    </td>
                </tr>
    
                <tr>
                    <td style="text-align:center">
                        <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709711700/Imagenes_Productos/Logos/Flechas_azules_viisgd.gif" alt="gif_flechas" style="width:120px;height:50px" />
                    </td>
                </tr>
    
                <tr> 
                    <td style="padding:16px">
                    <table border="0" align="center" width="100%" cellpadding="0" style="text-align:center; background-image:url(https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709365873/Imagenes_Productos/Logos/fondo-redes-difuminado_nb1teq.png); background-repeat: no-repeat; background-size: cover; border-radius:3px; max-width:650px; width:100%">
                        <tbody>
                            <tr>
                                <td style="padding:10px; width:50px">
                                    <a href="https://www.facebook.com/YosoyKaroKids/" style="display:contents; text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.facebook.com/YosoyKaroKids/">
                                        <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709367030/Imagenes_Productos/Logos/1-FB_icon-no_background_wbjq0v.png" alt="FB_icon" width="50px" heigth="50px"/>
                                    </a>
                                </td>
    
                                <td style="width:4px;height:40px">&nbsp;</td>
    
                                <td style="padding:10px; width:50px">
                                    <a href="https://www.instagram.com/yosoy.karokidsmoda/" style="display:contents;text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://www.instagram.com/yosoy.karokidsmoda/">
                                        <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709528362/Imagenes_Productos/Logos/2-IG_icon-no_background_k3ajsy.png" alt="IG_icon" width="50px" heigth="50px"/>
                                    </a>
                                </td>
    
                                <td style="width:4px;height:40px">&nbsp;</td>
    
                                <td style="padding:10px; width:50px">
                                    <a href="https://wa.link/fdh8yl" style="display:contents; text-decoration:none" target="_blank" data-saferedirecturl="https://www.google.com/url?q=https://wa.link/fdh8yl">
                                        <img src="https://res.cloudinary.com/dk4ysl2hw/image/upload/v1709367034/Imagenes_Productos/Logos/3-WSP_icon-no_background_fihi8y.png" alt="WSP_icon" width="55px" heigth="55px"/>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    </td>
                </tr>
    
            </tbody>
        </table>    
    </div>
    `
    
    const mailOptions = {
        from: {
            name: 'Karo Kids',
            address: process.env.ADMIN_EMAIL
        },
        to: [emailUsuario, 'jgerfuentes@gmail.com'],
        subject: "⛔ ¡Nueva compra en KaroKids registrada con inconvenientes! ⛔",
        html: htmlFailure,
        //? attachments: [
                // Se añade la ruta al archivo PDF que se encuentra almacenado de manera local.
        //     {
        //         filename: 'factura.pdf',
        //         path: path.join(__dirname, 'factura.pdf'),
        //         contentType: 'application/pdf'
        //     }
        //? ]
    }
    
    const sendMail = async (transporter, mailOptions) => {
        try {
            await transporter.sendMail(mailOptions)
            console.log('¡Email enviado con éxito!')
        } catch (error) {
            console.error(error)
            throw new Error ('Error en el controlador failureMailSender')
        }
    }
    
    //* Ejecución del envío
    sendMail(transporter, mailOptions)
};

module.exports = {
    successMailSender, 
    reviewMailSender, 
    failureMailSender,
}