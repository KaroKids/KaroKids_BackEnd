//paginaActual: Se introduce el valor que llega por QUERY de la página en la que se encuentra posicionado el usuario. --> Permite definir el atributo OFFSET para el modelo.

//itemsPorPagina: Es el numero de elementos que se quieren visualizar. --> Permite definir el atributo LIMIT para el modelo.

//ModeloActual: Toma el modelo con el que se va a trabajar.

//Necesito saber cuánto elementos tiene la tabla en total.

//OFFSET = (pagina - 1) * LIMIT

//SELECT * FROM tabla OFFSET 0 LIMIT 10 ---> Devolverá lo que se encuentre entre OFFSET y LIMIT. En este caso, los primeros 10 elementos.
const { Stocks } = require("../db");

const resultadosPaginados = async (
  paginaActual,
  itemsPorPagina,
  modeloActual,
  whereProducto,
  whereStock
) => {
  // try {
  //   const limitAttribute = itemsPorPagina;
  //   let totalElementos = await modeloActual.count();
  //   let totalPaginas = Math.ceil(totalElementos / limitAttribute); //Este parámetro se va a utilizar para manejar apropiadamente los últimos elementos disponibles para visualizar en el Front, por eso no se usa acá y simplemente se retorna.
  //   const offsetAttribute = (paginaActual - 1) * limitAttribute;

  //   const elementosPaginados = await modeloActual.findAll({
  //     include: [
  //       {
  //         model: Stocks,
  //       },
  //     ],
  //     offset: offsetAttribute,
  //     limit: limitAttribute,
  //   });

  //   return { elementosPaginados, totalPaginas };
  // } catch (error) {
  //   throw new Error(
  //     "Error al obtener los usuarios paginados: " + error.message
  //   );
  // }
  try {
    const limitAttribute = itemsPorPagina;
    let totalElementos = await modeloActual.count();
    let totalPaginas = Math.ceil(totalElementos / limitAttribute); //Este parámetro se va a utilizar para manejar apropiadamente los últimos elementos disponibles para visualizar en el Front, por eso no se usa acá y simplemente se retorna.
    const offsetAttribute = (paginaActual - 1) * limitAttribute;

    console.log(
      Object.keys(whereProducto).length,
      Object.keys(whereStock).length
    );
    if (whereProducto) {
      const filter = await modeloActual.findAll({
        include: [
          {
            model: Stocks,
            where: whereStock,
          },
        ],
        where: whereProducto,
        offset: offsetAttribute,
        limit: limitAttribute,
      });

      totalElementos = await modeloActual.count({
        include: [{ model: Stocks, where: whereStock }],
        where: whereProducto,
      });
      totalPaginas = Math.ceil(totalElementos / limitAttribute);
      return { filter, totalPaginas };
    } else {
      const elementosPaginados = await modeloActual.findAll({
        offset: offsetAttribute,
        limit: limitAttribute,
      });

      return { elementosPaginados, totalPaginas };
    }
  } catch (error) {
    throw new Error(
      "Error al obtener los usuarios paginados: " + error.message
    );
  }
};

module.exports = resultadosPaginados;
