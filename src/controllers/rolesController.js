const { Roles } = require('../db');

const todosLosRoles = async () =>{
    const response = await Roles.findAll();
    return(response);
}
const traerRol = async (id) =>{
    const response = await Roles.findByPk(id);
    if(response === null){
       return('la Rol no existe');
    }else{
       
       return(response);
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