const { Router } = require("express");
const {
  getOrdenes,
  getOrden,
  postOrden,
  putOrden,
  deleteOrden,
  getOrdenById,
} = require("../handlers/ordenesHandlers");;
const ordenesFiltradas = require('../controllers/ordenesFiltradasControllers');
const ordenes = Router();

ordenes.get("/", ordenesFiltradas);
ordenes.get("/:id", getOrden);
ordenes.post("/", postOrden);
ordenes.put("/", putOrden);
ordenes.delete("/:id", deleteOrden);
ordenes.get("/detail/:orden_id", getOrdenById);

module.exports = ordenes;
