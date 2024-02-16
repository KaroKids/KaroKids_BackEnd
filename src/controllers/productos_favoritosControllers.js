const { Productos_favoritos } = require('../db');

const todosLosProductos_favoritos = async () =>{
    const aux = await Productos_favoritos.findAll();
    return(aux);
}
const traerProducto_favorito = async (id) =>{
    const aux = await Productos_favoritos.findByPk(id);
    if(aux === null){
       return('la Producto_favorito no existe');
    }else{
       
       return(aux);
    }
}

const borrarProducto_favorito = async (id) =>{
   
    await Productos_favoritos.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarProducto_favorito = async (id) =>{
    await Productos_favoritos.update({
        where: {
          id: id
        }
      })
      
}

const crearProducto_favorito = async (Producto_favorito) =>{
    return await Productos_favoritos.create(Producto_favorito);
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