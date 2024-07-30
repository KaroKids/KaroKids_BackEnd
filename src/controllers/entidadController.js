const { Entidades } = require('../db');

const todasLasEntidades = async () =>{
    const response = await Entidades.findAll();
    return(response);
}
const traerEntidad = async (id) =>{
    const response = await Entidades.findByPk(id);
    if(response === null){
       return('la Entidad no existe');
    }else{
       
       return(response);
    }
}

const borrarEntidad = async (id) =>{
   
    await Entidades.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarEntidad = async (id) =>{
    await Entidades.update({
        where: {
          id: id
        }
      })
      
}

const crearEntidad = async (Entidad) =>{
    return await Entidades.create(Entidad);
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