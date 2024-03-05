const {
  getReviewsProducts,
  createReviewsProducts,
} = require("../controllers/reviewsControllers");

const getReviewsProductHandlers = async (req, res) => {
  const { producto_id } = req.params;
  try {
    const response = await getReviewsProducts(producto_id);
    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const createReviewsProductHandlers = async (req, res) => {
  const { producto_id, usuario_id, puntuacion, comentario } = req.body;
  try {
    const response = await createReviewsProducts({
      producto_id,
      usuario_id,
      puntuacion,
      comentario,
    });

    res
      .status(200)
      .json({
        message: "Calificación creada y asociada exitosamente.",
        data: response,
      });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
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
  getReviewsProductHandlers,
  createReviewsProductHandlers,
  //getReviewsPageHandlers,
  //createReviewsPageHandlers,
};
