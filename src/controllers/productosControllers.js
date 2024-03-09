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

      //todo Actualizacion por cambio de nombre
      if (nombre !== productoActual.nombre) {
        await Productos.update(
          { nombre: nombre },
          { where: { producto_id: producto_id } }
        );
      }

      //todo Actualizacion por cambio de descripcion
      if (descripcion !== productoActual.descripcion) {
        await Productos.update(
          { descripcion: descripcion },
          { where: { producto_id: producto_id } }
        );
      }

      //todo Actualizacion por cambio de Imagen Principal
      if (imagen_principal !== productoActual.imagen_principal) {
        //Caso: imagen nueva, aún no subida a Cloudinary --> Imagen de PC o de celular. ¿LLegará hasheada?
        if (!cloudinaryRegex.test(imagen_principal)) {
          //Condición: ¿Cumple con los formatos permitidos?
          if (extensionRegex.test(imagen_principal)) {
            const imgPrincipal_cloudinary = await cloudinary.uploader.upload(
              imagen_principal,
              {
                upload_preset: "preset_imagenes_productos",
                allowed_formats: ["png", "jpg", "jpeg", "gif", "webp", "svg", "heic"],
              },
              function (err, result) {
                if (err) {
                  throw new Error("Error al subir nueva imagen primaria: ", err);
                }
                try {
                  return result.secure_url;
                } catch (err) {
                  throw new Error("ModificarProducto Controller: Error en imgPrincipal_cloudinary. ", err);
                }
              }
            );
            
            await Productos.update(
              { imagen_principal: imgPrincipal_cloudinary.secure_url },
              { where: { producto_id: producto_id } }
            );
          } else {
            throw new Error ('ModificarProducto Controller: Formato de imagen principal no permitido')
          }
        } 
      }

      //todo Actualizacion por cambio de Imagenes secundarias
      //Si el arreglo llega vacío, lo actualiza inmediatamente.
      if (imagenes_secundarias.length === 0) {
        await Productos.update(
          { imagenes_secundarias: imagenes_secundarias },
          { where: { producto_id: producto_id } }
        );
      }

      const cloudinaryRegex = /^https:\/\/res\.cloudinary\.com\/dk4ysl2hw\/image\/upload\//;
      const extensionRegex = /\.(png|jpe?g|gif|webp|svg|heic|heif)$/i;

      console.log('Array de imagenes recibido:', imagenes_secundarias)

      //* --------------OPCIÓN ORIGINAL--------------
      //Si el nuevo arreglo no llega vacío y es diferente al original
      if (imagenes_secundarias !== productoActual.imagenes_secundarias) {
        let imagenesSec_cloudinary = [];
  
        for (let i = 0; i < imagenes_secundarias.length; i++) {
          let imagenRecibida = imagenes_secundarias[i];
          console.log("imagenRecibida: ", imagenRecibida)
  
          //Si el arreglo original no la incluye
          if (!productoActual.imagenes_secundarias.includes(imagenRecibida)) {
            console.log('Entró al primer if')
            //Si no es un enlace de Cloudinary ---> ESTA CONDICIÓN NO ES NECESARIA PORQUE LA BASE DE DATOS NO LO VA A TENER ASOCIADA A ESTE PRODUCTO DE TODOS MODOS, AUNQUE LA IMAGEN YA ESTÉ EN CLOUDINARY.
            // if (!cloudinaryRegex.test(imagenRecibida)) { 
              // console.log('Entró al segundo if')
              //Si cumple con los formatos permitidos
              if (extensionRegex.test(imagen_principal)) {
                console.log('Entró al tercer if')
                // Subirla y pushear el resultado en imagenesSec_cloudinary
                try {
                  const result = await cloudinary.uploader.upload(imagenRecibida, {
                    upload_preset: "preset_imagenes_productos",
                    allowed_formats: ["png", "jpg", "jpeg", "gif", "webp", "svg", "heic"],
                  });
                  imagenesSec_cloudinary.push(result.secure_url);
                } catch (error) {
                  console.error(`Error al subir la nueva imagen secundaria ${imagenRecibida} a Cloudinary: `, error);
                  throw new Error("ModificarProducto Controller: Error al subir las imágenes secundarias a Cloudinary");
                }
              } else {
                console.log('Entró al primer else')
                //Si no cumple con ninguna condición y su formato no es uno de los permitidos
                console.error(`Formato no permitido: `, error);
                throw new Error(`ModificarProducto Controller: Formato no permitido para la imagen secundaria ${imagenRecibida}`);
              }
            // } 
            // else {
            //   console.log('Entró al segundo else')
            //   //Si el arreglo original no la incluye y es un enlace de Cloudinary
            //   imagenesSec_cloudinary.push(imagenRecibida);
            // }
          } else {
            console.log('Entró al tercer else')
            //Si el arreglo original la incluye
            imagenesSec_cloudinary.push(imagenRecibida);
          }
        }
        console.log('Salió del bucle')
        console.log('Arreglo de imagenes secundarias actualizado: ', imagenesSec_cloudinary)
  
        await Productos.update(
          { imagenes_secundarias: imagenesSec_cloudinary },
          { where: { producto_id: producto_id } }
        );
      }

          //* --------------OTRA ALTERNATIVA--------------
          // if (imagenes_secundarias !== productoActual.imagenes_secundarias) {
          //   const imagenesSec_cloudinary2 = productoActual.imagenes_secundarias.map(async (imagen, index) => {
          //     //Si el arreglo original no la incluye
          //     if (imagenes_secundarias[index] !== imagen) {
          //       //Si no es un enlace de Cloudinary
          //       if (!cloudinaryRegex.test(imagenes_secundarias[index])) {
          //         console.log('Entró al segundo if')
          //         //Si cumple con los formatos permitidos
          //         if (extensionRegex.test(imagen_principal)) {
          //           console.log('Entró al tercer if')
          //           // Subirla y pushear el resultado en imagenesSec_cloudinary
          //           try {
          //             const result = await cloudinary.uploader.upload(imagenes_secundarias[index], {
          //               upload_preset: "preset_imagenes_productos",
          //               allowed_formats: ["png", "jpg", "jpeg", "gif", "webp", "svg", "heic"],
          //             });
          //             return result.secure_url;
          //           } catch (error) {
          //             console.error(`Error al subir la nueva imagen secundaria ${imagenes_secundarias[index]} a Cloudinary: `, error);
          //             throw new Error("ModificarProducto Controller: Error al subir las imágenes secundarias a Cloudinary");
          //           }
          //         } else {
          //           console.log('Entró al primer else')
          //           //Si no cumple con ninguna condición y su formato no es uno de los permitidos
          //           console.error(`Formato no permitido: `, error);
          //           throw new Error(`ModificarProducto Controller: Formato no permitido para la imagen secundaria ${imagenes_secundarias[index]}`);
          //         }
          //       } else {
          //         console.log('Entró al segundo else')
          //         //Si el arreglo original no la incluye y es un enlace de Cloudinary
          //         return imagenes_secundarias[index];
          //       }
          //     } else {
          //       console.log('Entró al tercer else')
          //       //Si el arreglo original la incluye
          //       return imagenes_secundarias[index];
          //     }
          //   })

          //   await Productos.update(
          //     { imagenes_secundarias: imagenesSec_cloudinary2 },
          //     { where: { producto_id: producto_id } }
          //   );
          // }


      //todo Actualizacion por cambio de edad/categoría
      if (edad !== productoActual.edad) {
        await Productos.update(
          { edad: edad },
          { where: { producto_id: producto_id } }
        );
      }

      //todo Actualizacion por cambio de genero
      if (genero !== productoActual.genero) {
        await Productos.update(
          { genero: genero },
          { where: { producto_id: producto_id } }
        );
      }

      //todo Actualizacion por cambio de precio
      if (precio !== productoActual.precio) {
        await Productos.update(
          { precio: precio },
          { where: { producto_id: producto_id } }
        );
      }

      //todo Actualizacion por cambio de destacado
      if (destacado !== productoActual.destacado) {
        await Productos.update(
          { destacado: destacado },
          { where: { producto_id: producto_id } }
        );
      }

      //todo Actualizacion por cambio de inactivo
      if (inactivo !== productoActual.inactivo) {
        await Productos.update(
          { inactivo: inactivo },
          { where: { producto_id: producto_id } }
        );
      }

      //todo Actualizacion por cambio de stock
      if (stock !== productoActual.stock) {
        await Productos.update(
          { stock: stock },
          { where: { producto_id: producto_id } }
        );
      }

      console.log(`Se modificó exitosamente el producto ${producto_id}`)
      return await Productos.findByPk(producto_id);
    } catch (error) {
     console.error(error)
     throw new Error ("Error en modificarProducto Controller")
    }
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
