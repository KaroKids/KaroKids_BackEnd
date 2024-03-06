const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");
const { borrarCarrito } = require("./carritosController");
const { crearOrden } = require("./ordenesControllers");

const client = new MercadoPagoConfig({
  accessToken:
    "TEST-499968136850667-022122-eb0fd0859f803321cf3c3ea2e4a16a42-404824788",
});

const success = async (req, res) => {
  res.redirect("https://karokids-frontend.vercel.app/productos");
};

const createOrder = async (req, res) => {
  const { user_id, cart } = req.body;
  console.log(cart);
  const cartFixed = cart.map((product) => {
    return {
      id: product.producto_id,
      title: product.producto_nombre,
      picture_url: product.producto_imagen,
      compra_talla: product.compra_talla,
      compra_color: product.compra_color,
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
      auto_return: "approved",
    };
    const preference = new Preference(client);
    const result = await preference.create({ body });

    console.log(result);
    return res.json({ id: result.id });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
};

const receiveWebhook = async (req, res) => {
  const payment = new Payment(client);
  const query = req.query;
  console.log(query);
  try {
    if (query.type === "payment") {
      const { payment_type_id, status, transaction_amount, additional_info } =
        await payment.get({ id: query["data.id"] });

      const estadoPago = {
        approved: "aprobado",
        pending: "pendiente",
        in_process: "En proceso",
        rejected: "Rechazado",
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
      console.log(user_id);

      const order = await crearOrden({
        productos_compra: additional_info.items,
        metodo_pago: metodoPago[payment_type_id],
        estado_pago: estadoPago[status],
        estado_pedido: "empaquetado",
        coste_total: transaction_amount,
        usuario_id: user_id,
      });

      console.log(order);

      await borrarCarrito(user_id);

      return res.status(201).json({ message: "Orden creada exitosamente" });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, receiveWebhook, success };
