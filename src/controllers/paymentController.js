const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");
const { borrarCarrito } = require("./carritosController");
const { crearOrden } = require("./ordenesControllers");
const { decrementarCantidad } = require("./productosControllers");
const { successMailSender, reviewMailSender, failureMailSender, pendingMailSender } = require("./mailSenderControllers");
const {Usuarios, Ordenes} = require ("../db")
const client = new MercadoPagoConfig({
  accessToken:
    "TEST-499968136850667-022122-eb0fd0859f803321cf3c3ea2e4a16a42-404824788",
});

const success = async (req, res) => {
  try{
  const payment = new Payment(client);
  const query = req.query;
   const data = await payment.get({ id: query.payment_id });
    const user_id = req.query.user_id;
    let usuario = await Usuarios.findOne({where :{usuario_id : user_id},
      include: [
        {
          model: Ordenes,
          attributes: ["orden_id",],
          order: [["createdAt", "DESC"]],
          limit: 1,
        },
      ],
    });
    usuario = usuario.dataValues
    const orden_id = usuario.Ordenes[0].dataValues.orden_id
    const email = usuario.email_usuario
    const nombre = usuario.nombre_usuario
     const productosComprados = data.additional_info.items;  
     for (const producto of productosComprados) {
       const info = producto.description.split("-");
       
       await decrementarCantidad(
         producto.id,
         info[0],
         info[1],
         producto.quantity
         );
        }
     await borrarCarrito(user_id);
     await successMailSender(nombre , email , orden_id, productosComprados, data)
     await reviewMailSender(nombre , email , orden_id, productosComprados, data)
     res.redirect("http://localhost:5173/productos");

  }catch(error){
    console.log(error)
  }
};

const failure = async (req, res) => {
  try{
 
     const orden_id = "asdasd"
     const email = "seyjoaluminio@gmail.com"
     const nombre = "sebastian"

     await failureMailSender(nombre , email , orden_id)
     res.redirect("http://localhost:5173/productos");

  }catch(error){
    console.log(error)
  }
}
 
const createOrder = async (req, res) => {
  const { user_id, cart } = req.body;
  console.log(cart);
  const cartFixed = cart.map((product) => {
    return {
      id: product.producto_id,
      title: product.producto_nombre,
      picture_url: product.producto_imagen,
      description:
        product.compra_talla + "-" + product.compra_color.toLowerCase(),
      quantity: product.compra_cantidad,
      unit_price: product.producto_precio,
    };
  });

  try {
    const body = {
      items: cartFixed,
      back_urls: {
         success: `https://karokids.onrender.com/payment/success?user_id=${user_id}`,
         failure: `https://karokids.onrender.com/payment/failure?user_id=${user_id}`,
         pending: `https://karokids.onrender.com/payment/pending?user_id=${user_id}`,
   
      },
      notification_url: `https://karokids.onrender.com/payment/webhook?user_id=${user_id}`,
      payment_methods: {
        excluded_payment_types: [
          {
            id: "ticket",
          },
        ],
      },
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });

    return res.json({ id: result.id });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const receiveWebhook = async (req, res) => {
  const payment = new Payment(client);
  const query = req.query;
  try {
    if (query.type === "payment") {
      const { payment_type_id, status, transaction_amount, additional_info } =
        await payment.get({ id: query["data.id"] });

      const estadoPago = {
        approved: "aprobado",
        pending: "pendiente",
        in_process: "En proceso",
        rejected: "cancelado",
        cancelled: "cancelado",
        refunded: "Reembolsado",
        charged_back: "Cargo revertido",
      };
      const metodoPago = {
        credit_card: "credito",
        debit_card: "debito",
        ticket: "efectivo",
        bank_transfer: "plan-separe",
      };

      const user_id = req.query.user_id;

      await crearOrden({
        productos_compra: additional_info.items,
        metodo_pago: metodoPago[payment_type_id],
        estado_pago: estadoPago[status],
        estado_pedido: "empaquetado",
        coste_total: transaction_amount,
        usuario_id: user_id,
      });

      return res.status(201).json({ message: "Orden creada exitosamente" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, receiveWebhook, success, failure };
