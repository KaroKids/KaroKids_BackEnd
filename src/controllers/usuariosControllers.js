const { Usuarios } = require('../db');

const todasLasUsuarios = async () =>{
    const aux = await Usuarios.findAll();
    return(aux);
}
const traerUsuario = async (id) =>{
    const aux = await Usuarios.findByPk(id);
    if(aux === null){
       return('la Usuario no existe');
    }else{
       
       return(aux);
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
    todasLasUsuarios,
    traerUsuario,
    borrarUsuario,
    modificarUsuario,
    crearUsuario,
    filtrarUsuarios
}