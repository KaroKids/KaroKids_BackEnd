const { Router } = require("express");
const {
  createOrder,
  receiveWebhook,
} = require("../controllers/paymentController");

const payment = Router();

payment.post("/create-order", createOrder);
payment.get("/success", (req, res) => res.send("success"));
payment.get("/failure", (req, res) => res.send("failure"));
payment.get("/pending", (req, res) => res.send("pending"));
payment.post("/webhook", receiveWebhook);

module.exports = payment;
