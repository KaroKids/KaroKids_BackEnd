const { Router } = require("express");
const { truncateTable } = require("../handlers/vaciarTablaHandlers");
const vaciarTabla = Router();

vaciarTabla.delete("/", truncateTable);

module.exports = vaciarTabla;
