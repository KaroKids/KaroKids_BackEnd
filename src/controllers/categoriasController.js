const { Categorias } = require('../db');

const todasLasCategorias = async () =>{
    const response = await Categorias.findAll();
    return(response);
}
const traerCategoria = async (id) =>{
    const response = await Categorias.findByPk(id);
    if(response === null){
       return('la Categoria no existe');
    }else{
       
       return(response);
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

const crearCategoria = async (categoria) =>{
    return await Categorias.create({categoria});
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