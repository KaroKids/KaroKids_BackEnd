require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(
  `postgres://${DB_USER}:${DB_PASSWORD}@${DB_HOST}/nombre_de_la_tabla`,
  { logging: false, native: false }
);

//const { tabla1, tabla2 } = sequelize.models;

//Acá debemos realizar las conexiones de los modelos.

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db_connection.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db_connection.js');
};
