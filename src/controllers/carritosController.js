const { Carritos } = require('../db');

const todosLosCarritos = async () =>{
    const aux = await Carritos.findAll();
    return(aux);
}
const traerCarrito = async (id) =>{
    const aux = await Carritos.findByPk(id);
    if(aux === null){
       return('la Carrito no existe');
    }else{
       
       return(aux);
    }
}

const borrarCarrito = async (id) =>{
   
    await Carritos.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarCarrito = async (id) =>{
    await Carritos.update({
        where: {
          id: id
        }
      })
      
}

const crearCarrito = async (Carrito) =>{
    return await Carritos.create(Carrito);
}

const filtrarCarritos = async () =>{

}

module.exports = {
    todosLosCarritos,
    traerCarrito,
    borrarCarrito,
    modificarCarrito,
    crearCarrito,
    filtrarCarritos
}