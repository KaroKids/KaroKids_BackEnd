const { Promociones } = require('../db');

const todasLasPromociones = async () =>{
    const response = await Promociones.findAll();
    return(response);
}
const traerPromocion = async (id) =>{
    const response = await Promociones.findByPk(id);
    if(response === null){
       return('la Promocion no existe');
    }else{
       
       return(response);
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