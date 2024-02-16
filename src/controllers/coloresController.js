const { Colores } = require('../db');

const todosLosColores = async () =>{
    const aux = await Colores.findAll();
    return(aux);
}
const traerColor = async (id) =>{
    const aux = await Colores.findByPk(id);
    if(aux === null){
       return('la Color no existe');
    }else{
       
       return(aux);
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

const crearColor = async (Color) =>{
    return await Colores.create(Color);
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