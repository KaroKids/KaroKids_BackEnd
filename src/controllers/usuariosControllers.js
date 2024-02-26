const { Usuarios, Carritos } = require("../db");
const { Op } = require("sequelize");

const todosLosUsuarios = async () => {
	const response = await Usuarios.findAll();
	return response;
};

const traerUsuarioNombre = async (nombre_usuario, apellido_usuario) => {
	if (nombre_usuario && apellido_usuario) {
		const response = await Usuarios.findAll({
			where: {
				nombre_usuario: { [Op.iLike]: `%${nombre_usuario}%` },
				apellido_usuario: { [Op.iLike]: `%${apellido_usuario}%` },
			},
		});
		return response;
	} else if (apellido_usuario) {
		const response = await Usuarios.findAll({
			where: { apellido_usuario: { [Op.iLike]: `%${apellido_usuario}%` } },
		});
		return response;
	} else {
		const response = await Usuarios.findAll({
			where: { nombre_usuario: { [Op.iLike]: `%${nombre_usuario}%` } },
		});
		return response;
	}
};

const traerUsuario = async (usuario_id) => {
	const response = await Usuarios.findByPk(usuario_id);
	if (response === null) {
		return "El usuario no existe";
	} else {
		return response;
	}
};

const crearUsuario = async (
	uid_firebase,
	nombre_usuario,
	apellido_usuario,
	email_usuario,
	roles
) => {
	const response = await Usuarios.create({
		uid_firebase,
		nombre_usuario,
		apellido_usuario,
		email_usuario,
		roles,
	});
	let nuevoCarrito = await Carritos.create({
		inactivo: false,
	});

	await nuevoCarrito.setUsuario(response);
	console.log(nuevoCarrito);
	return response;
};

const modificarUsuario = async (
	nombre_usuario,
	apellido_usuario,
	email_usuario,
	usuario_id
) => {
	await Usuarios.update(
		{
			nombre_usuario: nombre_usuario,
			apellido_usuario: apellido_usuario,
			email_usuario: email_usuario,
		},
		{
			where: {
				usuario_id: usuario_id,
			},
		}
	);
};

const borrarUsuario = async (usuario_id) => {
	const user = await Usuarios.findByPk(usuario_id);
	await Usuarios.update(
		{ inactivo: !user.inactivo },
		{
			where: { usuario_id: usuario_id },
		}
	);
	return !user.inactivo;
};

const modificarRol = async (usuario_id, roles) => {
	return await Usuarios.update(
		{ roles: roles },
		{
			where: { usuario_id: usuario_id },
		}
	);
};

module.exports = {
	todosLosUsuarios,
	traerUsuario,
	traerUsuarioNombre,
	borrarUsuario,
	modificarUsuario,
	crearUsuario,
	modificarRol,
};
