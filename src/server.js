const express = require("express");
const router = require("./routes/index");
const morgan = require("morgan");
const cors = require("cors");
require("dotenv").config();

const server = express();

server.use(cors());
server.use(morgan("dev"));
server.use(express.json());
server.use(express.json({ limit: "65mb" })); //Límite máximo en el tamaño de los datos JSON que el servidor puede manejar de una sola vez, para evitar posibles ataques de denegación de servicio (DoS) o abusos.
server.use(express.urlencoded({ extended: true, limit: "65mb" })); //Cuando envías datos desde un formulario HTML, estos datos generalmente se envían en formato URL codificado. Este middleware analiza estos datos y los convierte en un objeto JavaScript accesible a través de req.body. El parámetro {extended: true} permite el análisis de datos codificados en la URL con formato complejo (por ejemplo, datos anidados) en lugar de solo datos simples.

server.use(router);

module.exports = server;
