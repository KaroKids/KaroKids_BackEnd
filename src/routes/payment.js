const { Router } = require("express");
const {
  createOrder,
  receiveWebhook,
  failure,
  success
} = require("../controllers/paymentController");

const payment = Router();

payment.post("/create-order", createOrder);
payment.get("/success", success);
payment.get("/failure", failure);
payment.post("/webhook", receiveWebhook);

module.exports = payment;
