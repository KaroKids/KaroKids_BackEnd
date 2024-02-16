const { Productos_descuento } = require('../db');

const todosLosProductos_descuento = async () =>{
    const aux = await Productos_descuento.findAll();
    return(aux);
}
const traerProducto_descuento = async (id) =>{
    const aux = await Productos_descuento.findByPk(id);
    if(aux === null){
       return('la Producto_descuento no existe');
    }else{
       
       return(aux);
    }
}

const borrarProducto_descuento = async (id) =>{
   
    await Productos_descuento.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarProducto_descuento = async (id) =>{
    await Productos_descuento.update({
        where: {
          id: id
        }
      })
      
}

const crearProducto_descuento = async (Producto_descuento) =>{
    return await Productos_descuento.create(Producto_descuento);
}

const filtrarProductos_descuento = async () =>{

}

module.exports = {
    todosLosProductos_descuento,
    traerProducto_descuento,
    borrarProducto_descuento,
    modificarProducto_descuento,
    crearProducto_descuento,
    filtrarProductos_descuento
}