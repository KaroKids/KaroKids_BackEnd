// const response = await Productos.findAll();
// return(response);
const { Productos } = require("../db");
const resultadosPaginados = require("../utils/paginacion");

  // //* Requerimos las credenciales del archivo .env y definimos la configuración de Cloudinary.
  // require("dotenv").config();
  // const cloudinary = require("cloudinary").v2;
  
  // cloudinary.config({
  //   cloud_name: process.env.CLOUDINARY_NAME,
  //   api_key: process.env.CLOUDINARY_API_KEY,
  //   api_secret: process.env.CLOUDINARY_API_SECRET,
  //   secure: true,
  // });
  // //*

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
  // try {
    // // Subimos la imagen principal a Cloudinary
    // const result_principal = await cloudinary.uploader.upload(imagen_principal);
    // const imagen_principal_url = result_principal.secure_url;

    // // Subimos las imágenes secundarias a Cloudinary
    // const imagenes_secundarias_urls = [];
    // for (const imagen of imagenes_secundarias) {
    //   const result_secundaria = await cloudinary.uploader.upload(imagen);
    //   imagenes_secundarias_urls.push(result_secundaria.secure_url);
    // }

    return await Productos.create({
      nombre,
      descripcion,
      imagen_principal,
      imagenes_secundarias,
      // imagen_principal: imagen_principal_url,
      // imagenes_secundarias: imagenes_secundarias_urls,
      video,
      edad,
      genero,
      precio,
      destacado,
      inactivo,
      stock,
    });
  // } catch (error) {
  //   console.error("Error al cargar la imagen", error);
  //   throw new Error("Error al cargar la imagen");
  // }
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
