const { Router } = require("express");
const usuarios = require("./usuarios");
const productos = require("./productos");
const ordenes = require("./ordenes");
const promociones = require("./promociones");
const entidad = require("./entidad");
const direcciones = require("./direcciones");
const carritos = require("./carritos.js");
const productos_favoritos = require("./productos_favoritos");
const productos_descuentos = require("./productos_descuentos");
const categorias = require("./categorias");
const colores = require("./colores");
const stock = require("./stock");
const tallas = require("./tallas");
const payment = require("./payment");

const router = Router();

router.use("/usuarios", usuarios);
router.use("/productos", productos);
router.use("/ordenes", ordenes);
router.use("/promociones", promociones);
router.use("/entidad", entidad);
router.use("/direcciones", direcciones);
router.use("/carritos", carritos);
router.use("/productos_favoritos", productos_favoritos);
router.use("/productos_descuentos", productos_descuentos);
router.use("/categorias", categorias);
router.use("/colores", colores);
router.use("/stock", stock);
router.use("/tallas", tallas);
router.use("/payment", payment);

module.exports = router;
