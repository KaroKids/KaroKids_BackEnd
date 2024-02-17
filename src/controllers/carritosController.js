const { Carritos } = require('../db');

const todosLosCarritos = async () =>{
    const response = await Carritos.findAll();
    return(response);
}
const traerCarrito = async (id) =>{
    const response = await Carritos.findByPk(id);
    if(response === null){
       return('la Carrito no existe');
    }else{
       
       return(response);
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