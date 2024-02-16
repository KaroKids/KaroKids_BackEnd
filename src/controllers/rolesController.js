const { Roles } = require('../db');

const todosLosRoles = async () =>{
    const aux = await Roles.findAll();
    return(aux);
}
const traerRol = async (id) =>{
    const aux = await Roles.findByPk(id);
    if(aux === null){
       return('la Rol no existe');
    }else{
       
       return(aux);
    }
}

const borrarRol = async (id) =>{
   
    await Roles.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarRol = async (id) =>{
    await Roles.update({
        where: {
          id: id
        }
      })
      
}

const crearRol = async (Rol) =>{
    return await Roles.create(Rol);
}

const filtrarRoles = async () =>{

}

module.exports = {
    todosLosRoles,
    traerRol,
    borrarRol,
    modificarRol,
    crearRol,
    filtrarRoles
}