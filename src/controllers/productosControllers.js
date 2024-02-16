const { Productos } = require('../db');

const todosLosProductos = async () =>{
    const aux = await Productos.findAll();
    return(aux);
}

const traerProducto = async (id) =>{
    const aux = await Productos.findByPk(id);
    if(aux === null){
       return('la Producto no existe');
    }else{
       
       return(aux);
    }
}

const borrarProducto = async (id) =>{
   
    await Productos.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarProducto = async (id) =>{
    await Productos.update({
        where: {
          id: id
        }
      })
      
}

const crearProducto = async (nombre, descripcion, imagen_principal, imagenes_secundarias, video, precio, destacado, inactivo) =>{
    return await Productos.create({nombre, descripcion, imagen_principal, imagenes_secundarias, video, precio, destacado, inactivo});
}

const filtrarProductos = async () =>{

}

module.exports = {
    todosLosProductos,
    traerProducto,
    borrarProducto,
    modificarProducto,
    crearProducto,
    filtrarProductos
}