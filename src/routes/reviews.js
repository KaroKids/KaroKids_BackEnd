const { Router } = require("express");

const {
  getReviewsProductHandlers,
  createReviewsProductHandlers,
  //getReviewsPageHandlers,
  //createReviewsPageHandlers,
} = require("../handlers/reviewsHandlers");

const reviews = Router();

reviews.get("/:producto_id", getReviewsProductHandlers); //reviews/c77e5271-7c45-4b8e-aa5b-55e8ff309d38
reviews.post("/", createReviewsProductHandlers); // esta ruta es para comentarios
//reviews.get("/page", getReviewsPageHandlers);
//reviews.post("/page", createReviewsPageHandlers);

module.exports = reviews;
