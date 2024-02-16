const { Entidad } = require('../db');

const todasLasEntidades = async () =>{
    const aux = await Entidad.findAll();
    return(aux);
}
const traerEntidad = async (id) =>{
    const aux = await Entidad.findByPk(id);
    if(aux === null){
       return('la Entidad no existe');
    }else{
       
       return(aux);
    }
}

const borrarEntidad = async (id) =>{
   
    await Entidad.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarEntidad = async (id) =>{
    await Entidad.update({
        where: {
          id: id
        }
      })
      
}

const crearEntidad = async (Entidad) =>{
    return await Entidad.create(Entidad);
}

const filtrarEntidad = async () =>{

}

module.exports = {
    todasLasEntidades,
    traerEntidad,
    borrarEntidad,
    modificarEntidad,
    crearEntidad,
    filtrarEntidad
}