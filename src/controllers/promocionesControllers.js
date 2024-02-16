const { Promociones } = require('../db');

const todasLasPromociones = async () =>{
    const aux = await Promociones.findAll();
    return(aux);
}
const traerPromocion = async (id) =>{
    const aux = await Promociones.findByPk(id);
    if(aux === null){
       return('la Promocion no existe');
    }else{
       
       return(aux);
    }
}

const borrarPromocion = async (id) =>{
   
    await Promociones.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarPromocion = async (id) =>{
    await Promociones.update({
        where: {
          id: id
        }
      })
      
}

const crearPromocion = async (Promocion) =>{
    return await Promociones.create(Promocion);
}

const filtrarPromociones = async () =>{

}

module.exports = {
    todasLasPromociones,
    traerPromocion,
    borrarPromocion,
    modificarPromocion,
    crearPromocion,
    filtrarPromociones
}