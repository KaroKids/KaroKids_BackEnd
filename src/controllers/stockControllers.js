const { Stocks } = require('../db');

const todosLosStocks = async () =>{
    const response = await Stocks.findAll();
    return(response);
}
const traerStock = async (id) =>{
    const response = await Stocks.findByPk(id);
    if(response === null){
       return('la Stock no existe');
    }else{
       
       return(response);
    }
}

const borrarStock = async (id) =>{
   
    await Stocks.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarStock = async (id) =>{
    await Stocks.update({
        where: {
          id: id
        }
      })
      
}

const crearStock = async (cantidad_producto, producto_id, talla_id, color_id) =>{
    return await Stocks.create({cantidad_producto, producto_id, talla_id, color_id});
}

const filtrarStocks = async () =>{

}

module.exports = {
    todosLosStocks,
    traerStock,
    borrarStock,
    modificarStock,
    crearStock,
    filtrarStocks
}