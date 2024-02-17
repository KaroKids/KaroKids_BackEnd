const { Tallas } = require('../db');

const todasLasTallas = async () =>{
    const response = await Tallas.findAll();
    return(response);
}
const traerTalla = async (id) =>{
    const response = await Tallas.findByPk(id);
    if(response === null){
       return('la Talla no existe');
    }else{
       
       return(response);
    }
}

const borrarTalla = async (id) =>{
   
    await Tallas.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarTalla = async (id) =>{
    await Tallas.update({
        where: {
          id: id
        }
      })
      
}

const crearTalla = async (Talla) =>{
    return await Tallas.create(Talla);
}

const filtrarTallas = async () =>{

}

module.exports = {
    todasLasTallas,
    traerTalla,
    borrarTalla,
    modificarTalla,
    crearTalla,
    filtrarTallas
}