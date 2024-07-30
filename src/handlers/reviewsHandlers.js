const {
  getPromedioReviews,
  getLast3Reviews,
  createReviewsProducts,
  getAllReviews,
  existeReview,
} = require("../controllers/reviewsControllers");

const getAllReviewsHandlers = async (req, res) => {
  const { producto_id } = req.params;
  try {
    const response = await getAllReviews(producto_id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const get3ReviewsHandlers = async (req, res) => {
  const { producto_id } = req.params;
  try {
    const response = await getLast3Reviews(producto_id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getPromedioReviewsHandlers = async (req, res) => {
  const { producto_id } = req.params;
  try {
    const response = await getPromedioReviews(producto_id);
    return res.status(200).json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createReviewsProductHandlers = async (req, res) => {
  const { producto_id, usuario_id, puntuacion, comentario } = req.body;
  try {
    const response = await createReviewsProducts(
      producto_id,
      usuario_id,
      puntuacion,
      comentario
    );

    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
};

const getExisteReview = async (req, res) => {
  const { usuario_id, producto_id } = req.query;
  console.log("params handler", { usuario_id, producto_id });
  try {
    const response = { existe: await existeReview(usuario_id, producto_id) };

    console.log("response handler", response);
    res.status(200).json(response);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error });
  }
};

/* const getReviewsPageHandlers = async (req, res) => {
  try {
    const response = await getReviewsPage();
    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createReviewsPageHandlers = async (req, res) => {
  const { producto_id, usuario_id, puntuacion, comentario } = req.body;
  try {
    const response = await createReviewsPage(
      producto_id,
      usuario_id,
      puntuacion,
      comentario
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}; */

module.exports = {
  getPromedioReviewsHandlers,
  get3ReviewsHandlers,
  createReviewsProductHandlers,
  getAllReviewsHandlers,
  getExisteReview,
};
