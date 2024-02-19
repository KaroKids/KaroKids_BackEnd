
    // const response = await Productos.findAll();
    // return(response);
const { Productos } = require("../db");
const resultadosPaginados = require("../utils/paginacion");

//* Requerimos la configuración de Cloudinary de la carpeta "utils".
//!NOTA: Previamente, en el FrontEnd, por lo general convierten la imagen a Base64. En este video (https://www.youtube.com/watch?v=FsD_gUbYsb8), en el minuto 1:44, se puede ver como se convierte la imagen con una función "setFileToBase" en el código del formulario de creación de producto del admin (en su VSCode se ve que está en una carpeta "admin").
const cloudinary = require('../utils/cloudinary');
//*

const todosLosProductos = async (paginaActual) => {
	const itemsPorPagina = 5;
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
	//* Constante con el protocolo para subir la imagen directamente a Cloudinary en una carpeta que se crea automáticamente llamada "imagenes_productos". Se pueden setear ciertos parámetros como los que aparecen comentados.
		const img_princ_cloud = await cloudinary.uploader.upload(imagen_principal, {
			folder: "Imagenes_productos",
			// width: 300,
			// crop: "scale",
		})

		const img_sec_cloud = imagenes_secundarias.map(elemento => {
			//Acá habría que desarrollar el método para hacer lo mismo que con la imagen principal pero para cada elemento del array de strings.
		})
	//*

	return await Productos.create({
		nombre,
		descripcion,
		// imagen_principal,
		imagen_principal: {
			public_id: img_princ_cloud.public_id,
			url: img_princ_cloud.secure_url
		},
		imagenes_secundarias,
		video,
		edad,
		genero,
		precio,
		destacado,
		inactivo,
		stock
	});
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
