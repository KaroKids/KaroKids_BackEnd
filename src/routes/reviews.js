const { Router } = require("express");

const {
  getPromedioReviewsHandlers,
  get3ReviewsHandlers,
  createReviewsProductHandlers,
  getAllReviewsHandlers,
  getExisteReview,

} = require("../handlers/reviewsHandlers");

const reviews = Router();

reviews.get("/:producto_id", getPromedioReviewsHandlers);
reviews.post("/", createReviewsProductHandlers);
reviews.get("/all/:producto_id", getAllReviewsHandlers);
reviews.get("/ultimos/:producto_id", get3ReviewsHandlers);
reviews.get("/", getExisteReview);

module.exports = reviews;
