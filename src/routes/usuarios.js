const {Router} = require ('express');
const { getUsuarios, getUsuario, postUsuario, putUsuario, deleteUsuario } = require('../handlers/usuariosHandlers');
const usuarios = Router();

usuarios.get('/',getUsuarios)
usuarios.get('/:id',getUsuario)
usuarios.post('/',postUsuario)
usuarios.put('/:id',putUsuario)
usuarios.delete('/:id',deleteUsuario)

module.exports = usuarios;