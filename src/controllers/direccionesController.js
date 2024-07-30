const { Direcciones } = require('../db');

const todasLasDirecciones = async () =>{
    const response = await Direcciones.findAll();
    return(response);
}
const traerDireccion = async (id) =>{
    const response = await Direcciones.findByPk(id);
    if(response === null){
       return('la Direccion no existe');
    }else{
       
       return(response);
    }
}

const borrarDireccion = async (id) =>{
   
    await Direcciones.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarDireccion = async (id) =>{
    await Direcciones.update({
        where: {
          id: id
        }
      })
      
}

const crearDireccion = async (Direccion) =>{
    return await Direcciones.create(Direccion);
}

const filtrarDirecciones = async () =>{

}

module.exports = {
    todasLasDirecciones,
    traerDireccion,
    borrarDireccion,
    modificarDireccion,
    crearDireccion,
    filtrarDirecciones
}