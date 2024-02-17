const { Productos_Favoritos } = require('../db');

const todosLosProductos_favoritos = async () =>{
    const response = await Productos_Favoritos.findAll();
    return(response);
}
const traerProducto_favorito = async (id) =>{
    const response = await Productos_Favoritos.findByPk(id);
    if(response === null){
       return('la Producto_favorito no existe');
    }else{
       
       return(response);
    }
}

const borrarProducto_favorito = async (id) =>{
   
    await Productos_Favoritos.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarProducto_favorito = async (id) =>{
    await Productos_Favoritos.update({
        where: {
          id: id
        }
      })
      
}

const crearProducto_favorito = async (Producto_favorito) =>{
    return await Productos_Favoritos.create(Producto_favorito);
}

const filtrarProductos_favoritos = async () =>{

}

module.exports = {
    todosLosProductos_favoritos,
    traerProducto_favorito,
    borrarProducto_favorito,
    modificarProducto_favorito,
    crearProducto_favorito,
    filtrarProductos_favoritos
}