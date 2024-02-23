// const response = await Productos.findAll();
// return(response);
const { Productos } = require("../db");
const resultadosPaginados = require("../utils/paginacion");

//* Requerimos las credenciales del archivo .env y definimos la configuración de Cloudinary.
require("dotenv").config();
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});
//*

const todosLosProductos = async (paginaActual) => {
  const itemsPorPagina = 12;
  return resultadosPaginados(paginaActual, itemsPorPagina, Productos);
};

const traerProducto = async (id) => {
  const response = await Productos.findByPk(id);
  if (response === null) {
    return "la Producto no existe";
  } else {
    return response;
  }
};

const borrarProducto = async (id) => {
  await Productos.destroy({
    where: {
      id: id,
    },
  });
};

const modificarProducto = async (id) => {
  await Productos.update({
    where: {
      id: id,
    },
  });
};

const crearProducto = async (
  nombre,
  descripcion,
  imagen_principal,
  imagenes_secundarias,
  video,
  edad,
  genero,
  precio,
  destacado,
  inactivo,
  stock
) => {
  try {
    // Subimos la imagen principal a Cloudinary
    const img_principal_cloud = await cloudinary.uploader.upload(imagen_principal,
      {
        upload_preset: 'preset_imagenes_productos',
        allowed_formats: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg']
      },
      function(err, result) {
        if (err) {
          console.log(err)
        }
        // console.log('Result1:', result)
        try {
          console.log('img_principal_cloud', result.secure_url)
          return result.secure_url
        } catch (err) {
          console.log(err)
        }
      })
    

    // Subimos las imágenes secundarias a Cloudinary
    const imagenes_secundarias_cloud = [];

    for (let i = 0; i < imagenes_secundarias.length; i++) {
      const uploaded_secundaria = await cloudinary.uploader.upload(imagenes_secundarias[i],
        {
          upload_preset: 'preset_imagenes_productos',
          allowed_formats: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg']
        },
        function(err, result) {
          if (err) {
            console.log('error de cloudinary', err)
          }
          // console.log('Result2:', result)
          try {
            // console.log(`Esta es la url de tu imagen secundaria`, result.secure_url)

            imagenes_secundarias_cloud.push(result.secure_url);
            // console.log('array de cloudinary', imagenes_secundarias_cloud)
          } catch (err) {
            console.log(err)
          }
        })
    }

    return await Productos.create({
      nombre,
      descripcion,
      imagen_principal: img_principal_cloud.secure_url,
      imagenes_secundarias: imagenes_secundarias_cloud,
      video,
      edad,
      genero,
      precio,
      destacado,
      inactivo,
      stock,
    });
  } catch (error) {
    console.error("Error al cargar la imagen", error);
    throw new Error("Error al cargar la imagen");
  }
};

const filtrarProductos = async () => {};

module.exports = {
  todosLosProductos,
  traerProducto,
  borrarProducto,
  modificarProducto,
  crearProducto,
  filtrarProductos,
};