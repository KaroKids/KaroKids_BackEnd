const { Usuarios } = require('../db');

const todosLosUsuarios = async () =>{
    const response = await Usuarios.findAll();
    return(response);
}
const traerUsuario = async (id) =>{
    const response = await Usuarios.findByPk(id);
    if(response === null){
       return('la Usuario no existe');
    }else{
       
       return(response);
    }
}

const borrarUsuario = async (id) =>{
   
    await Usuarios.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarUsuario = async (id) =>{
    await Usuarios.update({
        where: {
          id: id
        }
      })
      
}

const crearUsuario = async (Usuario) =>{
    return await Usuarios.create(Usuario);
}

const filtrarUsuarios = async () =>{

}

module.exports = {
    todosLosUsuarios,
    traerUsuario,
    borrarUsuario,
    modificarUsuario,
    crearUsuario,
    filtrarUsuarios
}