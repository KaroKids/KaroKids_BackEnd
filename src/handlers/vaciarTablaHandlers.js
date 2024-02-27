const { vaciarTabla } = require("../controllers/vaciarTablaController");

const truncateTable = async (req, res) => {
  const { table, clave } = req.body;

  try {
    const response = await vaciarTabla(table, clave);
    return res.json(response);
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

module.exports = {
  truncateTable,
};
