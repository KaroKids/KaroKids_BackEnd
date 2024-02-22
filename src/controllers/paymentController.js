const { MercadoPagoConfig, Preference, Payment } = require("mercadopago");

const client = new MercadoPagoConfig({
  accessToken:
    "TEST-3395648537928946-022217-68a657898d160b4ebe5d2032f1329091-1694080585",
});

const createOrder = async (req, res) => {
  const body = {
    items: [
      {
        title: "remera",
        quantity: 2,
        unit_price: 200,
        currency_id: "ARS",
      },
    ],
    back_urls: {
      success: "http://localhost:3001/payment/success",
      failure: "http://localhost:3001/payment/failure",
      pending: "http://localhost:3001/payment/pending",
    },
    notification_url:
      "https://e1de-2800-810-4ff-12af-ecce-d8d5-20a9-9c44.ngrok-free.app/payment/webhook",
  };
  const preference = new Preference(client);
  const result = await preference.create({ body });

  console.log(result);

  res.send(result);
};
const receiveWebhook = async (req, res) => {
  const payment = new Payment(client);
  const query = req.query;

  try {
    if (query.type === "payment") {
      const data = await payment.get({ id: query["data.id"] });
      console.log(data);

      res.status(204);
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: error.message });
  }
};

module.exports = { createOrder, receiveWebhook };
