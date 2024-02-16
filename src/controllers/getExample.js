const getExample = async (req, res) => {
  try {
    return res.send("Funciona la ruta getExample");
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

module.exports = getExample;
