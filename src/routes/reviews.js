const { Router } = require("express");

const {
  getPromedioReviewsHandlers,
  createReviewsProductHandlers,
  getAllReviewsHandlers,
} = require("../handlers/reviewsHandlers");

const reviews = Router();

reviews.get("/:producto_id", getPromedioReviewsHandlers); //reviews/c77e5271-7c45-4b8e-aa5b-55e8ff309d38
reviews.post("/", createReviewsProductHandlers); // esta ruta es para comentarios
reviews.get("/all/:producto_id", getAllReviewsHandlers);

module.exports = reviews;
