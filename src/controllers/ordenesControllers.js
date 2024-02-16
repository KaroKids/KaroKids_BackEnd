const { Ordenes } = require('../db');

const todasLasOrdenes = async () =>{
    const aux = await Ordenes.findAll();
    return(aux);
}
const traerOrden = async (id) =>{
    const aux = await Ordenes.findByPk(id);
    if(aux === null){
       return('la orden no existe');
    }else{
       
       return(aux);
    }
}

const borrarOrden = async (id) =>{
   
    await Ordenes.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarOrden = async (id) =>{
    await Ordenes.update({
        where: {
          id: id
        }
      })
      
}

const crearOrden = async (orden) =>{
    return await Ordenes.create(orden);
}

const filtrarOrdenes = async () =>{

}

module.exports = {
    todasLasOrdenes,
    traerOrden,
    borrarOrden,
    modificarOrden,
    crearOrden,
    filtrarOrdenes
}