const { Direcciones } = require('../db');

const todasLasDirecciones = async () =>{
    const aux = await Direcciones.findAll();
    return(aux);
}
const traerDireccion = async (id) =>{
    const aux = await Direcciones.findByPk(id);
    if(aux === null){
       return('la Direccion no existe');
    }else{
       
       return(aux);
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