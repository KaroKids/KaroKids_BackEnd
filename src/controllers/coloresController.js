const { Colores } = require('../db');

const todosLosColores = async () =>{
    const response = await Colores.findAll();
    return(response);
}
const traerColor = async (id) =>{
    const response = await Colores.findByPk(id);
    if(response === null){
       return('la Color no existe');
    }else{
       
       return(response);
    }
}

const borrarColor = async (id) =>{
   
    await Colores.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarColor = async (id) =>{
    await Colores.update({
        where: {
          id: id
        }
      })
      
}

const crearColor = async (color) =>{
    return await Colores.create(color);
}

const filtrarColores = async () =>{

}

module.exports = {
    todosLosColores,
    traerColor,
    borrarColor,
    modificarColor,
    crearColor,
    filtrarColores
}