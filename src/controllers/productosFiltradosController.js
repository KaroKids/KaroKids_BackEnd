const { Productos } = require("../db");
const resultadosPaginados = require("../utils/paginacion");

const filtrarEdad = (edad, array1) => {
  if (edad) {
    const arr = [];
    array1.map((a) => {
      if (a.edad === edad) {
        arr.push(a);
      }
    });
    return arr;
  } else {
    return array1;
  }
};

const filtrarGenero = (genero, array1) => {
  if (genero) {
    const arr = [];
    array1.map((a) => {
      if (a.genero === genero) {
        arr.push(a);
      }
    });
    return arr;
  } else {
    return array1;
  }
};

const filtrarTalla = async (talla, array1) => {
  if (talla) {
    const arr = [];
    array1.map((a) => {
      if (a.stock.hasOwnProperty(talla)) {
        if (a.stock[talla].length) {
          arr.push(a);
        }
      }
    });
    return arr;
  } else {
    return array1;
  }
};

const filtrarColor = (color, talla, array1) => {
  if (color) {
    const arr = [];
    if (talla) {
      array1.map((a) => {
        if (a.stock[talla].find((item) => item.color === color)) {
          arr.push(a);
        }
      });
    } else {
      array1.map((a) => {
        if (
          Object.values(a.stock).some((tallas) =>
            tallas.find((item) => item.color === color)
          )
        ) {
          arr.push(a);
        }
      });
    }
    return arr;
  } else {
    return array1;
  }
};

const filtrarPrecio = (minPrecio, maxPrecio, array1) => {
  if (minPrecio && maxPrecio) {
    const arr = [];
    array1.map((a) => {
      if (a.precio < maxPrecio && a.precio > minPrecio) {
        arr.push(a);
      }
    });
    return arr;
  } else {
    return array1;
  }
};

async function productosFiltrados(req, res) {
  try {
    const { edad, genero, talla, color, minPrecio, maxPrecio } = req.query;
    let { paginaActual } = req.query;
    if (!paginaActual) {
      paginaActual = 1;
    }
    console.log(edad);
    console.log(genero);
    console.log(talla);
    console.log(color);
    console.log(minPrecio);
    console.log(maxPrecio);
    console.log(paginaActual);
    var array = await Productos.findAll();
    array = array.map((a) => a.dataValues);

    array = filtrarEdad(edad, array);
    array = filtrarGenero(genero, array);
    array = await filtrarTalla(talla, array);
    array = filtrarColor(color, talla, array);
    array = filtrarPrecio(minPrecio, maxPrecio, array);

    const paginacion = await resultadosPaginados(paginaActual, 5, array);

    res.status(200).json(paginacion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

module.exports = productosFiltrados;