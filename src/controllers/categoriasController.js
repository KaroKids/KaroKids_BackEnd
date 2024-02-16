const { Categorias } = require('../db');

const todasLasCategorias = async () =>{
    const aux = await Categorias.findAll();
    return(aux);
}
const traerCategoria = async (id) =>{
    const aux = await Categorias.findByPk(id);
    if(aux === null){
       return('la Categoria no existe');
    }else{
       
       return(aux);
    }
}

const borrarCategoria = async (id) =>{
   
    await Categorias.destroy({
        where: {
          id: id
        }
      })
      
}

const modificarCategoria = async (id) =>{
    await Categorias.update({
        where: {
          id: id
        }
      })
      
}

const crearCategoria = async (Categoria) =>{
    return await Categorias.create(Categoria);
}

const filtrarCategorias = async () =>{

}

module.exports = {
    todasLasCategorias,
    traerCategoria,
    borrarCategoria,
    modificarCategoria,
    crearCategoria,
    filtrarCategorias
}