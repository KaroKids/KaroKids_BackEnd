const { Router } = require("express");
const {
  getUsuarios,
  getUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario,
  putUsuarioRol,
} = require("../handlers/usuariosHandlers");
const usuarios = Router();

usuarios.get("/", getUsuarios);
usuarios.get("/usuario", getUsuario);
usuarios.post("/", postUsuario);
usuarios.put("/", putUsuario);
usuarios.put("/rol/", putUsuarioRol);
usuarios.put("/delete", deleteUsuario);

module.exports = usuarios;
