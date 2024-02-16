require("dotenv").config();
const { Sequelize } = require("sequelize");

const fs = require("fs");
const path = require("path");
const { DB } = process.env;

const sequelize = new Sequelize(DB, {
  logging: false,
  native: false,
});
const basename = path.basename(__filename);

const modelDefiners = [];

fs.readdirSync(path.join(__dirname, "/models"))
  .filter(
    (file) =>
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
  )
  .forEach((file) => {
    modelDefiners.push(require(path.join(__dirname, "/models", file)));
  });

modelDefiners.forEach((model) => model(sequelize));

let entries = Object.entries(sequelize.models);
let capsEntries = entries.map((entry) => [
  entry[0][0].toUpperCase() + entry[0].slice(1),
  entry[1],
]);
sequelize.models = Object.fromEntries(capsEntries);

const {
  Categorias,
  Colores,
  Direcciones,
  Entidades,
  Productos_Descuentos,
  Productos,
  Roles,
  Stocks,
  Tallas,
  Usuarios,
} = sequelize.models;

// Relaciones de tablas
Usuarios.hasOne(Entidades, { foreignKey: "usuario_id" });
////////////////////////////////////////////////
Entidades.hasMany(Direcciones, { foreignKey: "entidad_id" });
////////////////////////////////////////////////
Roles.hasMany(Usuarios, { foreignKey: "rol_id" });
////////////////////////////////////////////////
Usuarios.belongsToMany(Productos, {
  foreignKey: "usuario_id",
  through: "Productos_Favoritos",
});
Productos.belongsToMany(Usuarios, {
  foreignKey: "producto_id",
  through: "Productos_Favoritos",
});
////////////////////////////////////////////////
Productos.belongsToMany(Categorias, {
  foreignKey: "producto_id",
  through: "Productos_Categorias",
});
Categorias.belongsToMany(Productos, {
  foreignKey: "categoria_id",
  through: "Productos_Categorias",
});
////////////////////////////////////////////////

module.exports = {
  ...sequelize.models, // para poder importar los modelos así: const { Product, User } = require('./db.js');
  conn: sequelize, // para importart la conexión { conn } = require('./db.js');
  Categorias,
  Colores,
  Direcciones,
  Entidades,
  Productos_Descuentos,
  Productos,
  Roles,
  Stocks,
  Tallas,
  Usuarios,
};
