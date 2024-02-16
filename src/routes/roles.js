const {Router} = require ('express');
const { getRoles, getRol, postRol, putRol, deleteRol } = require('../handlers/rolesHandlers');
const roles = Router();

roles.get('/',getRoles)
roles.get('/:id',getRol)
roles.post('/',postRol)
roles.put('/:id',putRol)
roles.delete('/:id',deleteRol)

module.exports = roles;