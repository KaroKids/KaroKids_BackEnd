require("dotenv").config();
const { Productos } = require("../db");
const resultadosPaginados = require("../utils/paginacion");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

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
  edad,
  genero,
  precio,
  destacado,
  inactivo,
  stock
) => {
  try {
    // Subimos la imagen principal a Cloudinary y retornamos la URL que nos devuelve el host.
    const img_principal_cloud = await cloudinary.uploader.upload(imagen_principal,
      {
        upload_preset: 'preset_imagenes_productos',
        allowed_formats: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg']
      },
      function(err, result) {
        if (err) {
          throw new Error ('Error al subir la imagen primaria: ', err)
        }
        try {
          return result.secure_url
        } catch (err) {
          throw new Error ('Error en img_principal_cloud: ', err)
        }
      })
    

    // Subimos las imágenes secundarias a Cloudinary y almacenamos las URLs retornadas en un arreglo.
    const imagenes_secundarias_cloud = [];

    for (let i = 0; i < imagenes_secundarias.length; i++) {
      await cloudinary.uploader.upload(imagenes_secundarias[i],
        {
          upload_preset: 'preset_imagenes_productos',
          allowed_formats: ['png', 'jpg', 'jpeg', 'gif', 'webp', 'svg']
        },
        function(err, result) {
          if (err) {
            throw new Error ('Error al subir las imagenes secundarias: ', err)
          }

          try {
            imagenes_secundarias_cloud.push(result.secure_url);
          } catch (err) {
            throw new Error ('Error al construir el array imagenes_secundarias_cloud: ', err)
          }
        })
    }

    return await Productos.create({
      nombre,
      descripcion,
      imagen_principal: img_principal_cloud.secure_url,
      imagenes_secundarias: imagenes_secundarias_cloud,
      edad,
      genero,
      precio,
      destacado,
      inactivo,
      stock,
    });
  } catch (error) {
    throw new Error("Error en el controller crearProducto");
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