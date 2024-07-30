const { response } = require("express");
const {
  // todasLasOrdenes,
  traerOrden,
  crearOrden,
  modificarOrden,
  traerOrdenPorId,
} = require("../controllers/ordenesControllers");
// const ordenesFiltradas = require("../controllers/ordenesFiltradasControllers");

// const getOrdenes = async (req, res) => {
//   try {
//     const response = await ordenesFiltradas();
//     res.status(200).json(response);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// };

const getOrden = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await traerOrden(id);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postOrden = async (req, res) => {
  let {
    productos_compra,
    metodo_pago,
    estado_pago,
    estado_pedido,
    coste_total,
    usuario_id,
  } = req.body;
  try {

    
    console.log(productos_compra)
    console.log(metodo_pago)
    console.log(estado_pago)
    console.log(estado_pedido)
    console.log(coste_total)
    console.log(usuario_id)
    const response = await crearOrden(
      {productos_compra,
      metodo_pago,
      estado_pago,
      estado_pedido,
      coste_total,
      usuario_id}
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putOrden = async (req, res) => {
  const { id , estado} = req.body;
  try {
    const response = await modificarOrden(id, estado)
    res.status(200).json(response);
  } catch (error) {
    console.log(error)
    res.status(400).json({ error: error.message });
  }
};

const deleteOrden = async (req, res) => {
  const { id } = req.params;
  try {
    res.status(200).send(`se elimino la orden ${id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getOrdenById = async (req, res) => {
  const { orden_id } = req.params;
  const response = await traerOrdenPorId(orden_id);
  try {
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

module.exports = {
  // getOrdenes,
  getOrden,
  postOrden,
  putOrden,
  deleteOrden,
  getOrdenById,
};
