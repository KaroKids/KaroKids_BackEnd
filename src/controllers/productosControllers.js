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
  const itemsPorPagina = 8;

  return resultadosPaginados(paginaActual, itemsPorPagina, Productos);
};

const productosDestacados = async (limite) => {
  try {
    const productos = await Productos.findAll({
      where: {
        destacado: true,
      },
      limit: limite,
      attributes: [
        "producto_id",
        "nombre",
        "descripcion",
        "imagen_principal",
        "precio",
      ],
    });

    return productos;
  } catch (error) {
    return error;
  }
};

const traerProducto = async (id) => {
  const response = await Productos.findByPk(id);
  if (response === null) {
    return "El producto no existe";
  } else {
    return response;
  }
};

const borrarProducto = async (producto_id) => {
  try {
    const producto = await Productos.findByPk(producto_id);

    if (!producto) {
      return "No existe ese producto";
    }

    await Productos.update(
      { inactivo: !producto.inactivo },
      {
        where: { producto_id: producto_id },
      }
    );

    return await Productos.findByPk(producto_id);
  } catch (error) {
    return error;
  }
};

const modificarProducto = async (
  producto_id,
  nombre,
  descripcion,
  imagen_principal,
  imagenes_secundarias,
  edad,
  genero,
  precio,
  destacado,
  inactivo,
  stock) => {
    try {
      const productoActual = await Productos.findByPk(producto_id,{
        attributes: { exclude: ["createdAt", "updatedAt"]},
      })

      const cloudinaryRegex = /^https:\/\/res\.cloudinary\.com\/dk4ysl2hw\/image\/upload\/.*$/
      const extensionRegex = /\.(png|jpe?g|gif|webp|svg|heic|heif)$/i;

      if (nombre !== productoActual.nombre) {
        await Productos.update(
          { nombre: nombre },
          { where: { producto_id: producto_id } }
        );
      }
      if (descripcion !== productoActual.descripcion) {
        await Productos.update(
          { descripcion: descripcion },
          { where: { producto_id: producto_id } }
        );
      }
      if (imagen_principal !== productoActual.imagen_principal) {
        if (imagen_principal !== cloudinaryRegex.test(imagen_principal)) {
          //subir a cloudinary
        } else if (extensionRegex.test(imagen_principal)) {
          const img_princip_cloudinary = await cloudinary.uploader.upload(
            imagen_principal,
            {
              upload_preset: "preset_imagenes_productos",
              allowed_formats: ["png", "jpg", "jpeg", "gif", "webp", "svg", "heic"],
            },
            function (err, result) {
              if (err) {
                throw new Error("Error al subir la imagen primaria: ", err);
              }
              try {
                return result.secure_url;
              } catch (err) {
                throw new Error("Error en img_principal_cloud: ", err);
              }
            }
          );
          //transformar y subir a cloudinary
          await Productos.update(
            { descripcion: descripcion },
            { where: { producto_id: producto_id } }
          );
        }
      }
    } catch (error) {
      
    }
  await Productos.update({
    where: {
      id: producto_id,
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
    const img_principal_cloud = await cloudinary.uploader.upload(
      imagen_principal,
      {
        upload_preset: "preset_imagenes_productos",
        allowed_formats: ["png", "jpg", "jpeg", "gif", "webp", "svg", "heic"],
      },
      function (err, result) {
        if (err) {
          throw new Error("Error al subir la imagen primaria: ", err);
        }
        try {
          return result.secure_url;
        } catch (err) {
          throw new Error("Error en img_principal_cloud: ", err);
        }
      }
    );

    // Subimos las imágenes secundarias a Cloudinary y almacenamos las URLs retornadas en un arreglo.
    const imagenes_secundarias_cloud = [];

    for (let i = 0; i < imagenes_secundarias.length; i++) {
      await cloudinary.uploader.upload(
        imagenes_secundarias[i],
        {
          upload_preset: "preset_imagenes_productos",
          allowed_formats: ["png", "jpg", "jpeg", "gif", "webp", "svg", "heic"],
        },
        function (err, result) {
          if (err) {
            throw new Error("Error al subir las imagenes secundarias: ", err);
          }

          try {
            imagenes_secundarias_cloud.push(result.secure_url);
          } catch (err) {
            throw new Error(
              "Error al construir el array imagenes_secundarias_cloud: ",
              err
            );
          }
        }
      );
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

const destacarProducto = async (producto_id) => {
  if (!producto_id) {
    return "El producto no existe";
  } else {
    const producto = await Productos.findByPk(producto_id);

    await Productos.update(
      { destacado: !producto.destacado },
      {
        where: { producto_id: producto_id },
      }
    );

    return await Productos.findByPk(producto_id);
  }
};

module.exports = {
  todosLosProductos,
  traerProducto,
  borrarProducto,
  modificarProducto,
  crearProducto,
  filtrarProductos,
  destacarProducto,
  productosDestacados,
};
