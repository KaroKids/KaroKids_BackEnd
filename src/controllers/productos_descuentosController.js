const { Productos_Descuentos} = require('../db');

const todosLosProductos_descuento = async () =>{
    const response = await Productos_Descuentos.findAll();
    return(response);
}
const traerProducto_descuento = async (id) =>{
    const response = await Productos_Descuentos.findByPk(id);
    if(response === null){
       return('la Producto_descuento no existe');
    }else{
       
       return(response);
    }
}

const borrarProducto_descuento = async (id) =>{
   
    await Productos_Descuentos.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarProducto_descuento = async (id) =>{
    await Productos_Descuentos.update({
        where: {
          id: id
        }
      })
      
}

const crearProducto_descuento = async (Producto_descuento) =>{
    return await Productos_Descuentos.create(Producto_descuento);
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