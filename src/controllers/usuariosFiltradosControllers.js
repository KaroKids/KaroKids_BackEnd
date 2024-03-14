const { Usuarios } = require("../db");
const { Op } = require('sequelize');
const resultadosPaginados = require("../utils/paginacion");

const filtrarEstado = (estado, arrayUsuarios) => {
    if (estado) {
        console.log('estado en filtrarEstado: ', estado)
        if (estado === "false") {
            estado = false
        }
        else {
            estado = true
        }

        let estadoUsuarios = arrayUsuarios.filter(usuario => usuario.inactivo == estado);
        return estadoUsuarios
    }
    else {
        return arrayUsuarios;
    }
};

const filtrarRol = (rol, arrayUsuarios) => {
    if (rol) {
        if (rol === "client") {
            const usuariosClientes = [];
            arrayUsuarios.map((usuario) => {
                if (usuario.roles === rol) {
                    usuariosClientes.push(usuario)
                }
            })
            return usuariosClientes;
        } 
        else if (rol === "admin") {
            const usuariosAdmins = [];
            arrayUsuarios.map((usuario)=>{
                if (usuario.roles === rol) {
                    usuariosAdmins.push(usuario)
                }
            })
            return usuariosAdmins;
        }
    }
    else {
		return arrayUsuarios;
	}
};

const ordenarAlfabeUsuario = (ordenar, arrayUsuarios) => {
    if (ordenar) {
        let arr = [];
        arr = arrayUsuarios;
        if (ordenar === 'apellido-asc') {
            arr.sort((a, b) => {
                 return a.apellido_usuario.localeCompare(b.apellido_usuario);
            });
        }
        else if (ordenar === 'apellido-desc') {
            arr.sort((a, b) => {
                return b.apellido_usuario.localeCompare(a.apellido_usuario);
            });
        }
        else if (ordenar === 'nombre-asc') {
            arr.sort((a, b) => {
                return a.nombre_usuario.localeCompare(b.nombre_usuario);
            });
        }
        else if (ordenar === 'nombre-desc') {
            arr.sort((a, b) => {
                return b.nombre_usuario.localeCompare(a.nombre_usuario);
            });
        }
        else if (ordenar === 'email-asc') {
            arr.sort((a, b) => {
                return a.email_usuario.localeCompare(b.email_usuario);
            });
        }
        else if (ordenar === 'email-desc') {
            arr.sort((a, b) => {
                return b.email_usuario.localeCompare(a.email_usuario);
            });
        }
        return arr
    }
    else {
        return arrayUsuarios
    }
};

const usuariosFiltrados = async (req, res) => {
    try{
        let {
            estado,
            ordenar,
            rol,
            nombre,
        } = req.query;

        let {paginaActual} = req.query;

        if (!paginaActual) {
            paginaActual = 1;
        }

        let arrayUsuarios = await Usuarios.findAll({
            raw: true
          });

        if (nombre) {
            console.log('nombre', nombre)

            let nuevoNombre = nombre.split('-')
            let nombre1 = nuevoNombre[0]
            let nombre2 = nuevoNombre[1]
            let nombre3 = nuevoNombre[2]
            let nombre4 = nuevoNombre[3]
            const response = await Usuarios.findAll({
                where: {
                    [Op.or]: [
                        { nombre_usuario: { [Op.iLike]: `%${nombre1}%` } },
                        { nombre_usuario: { [Op.iLike]: `%${nombre2}%` } },
                        { nombre_usuario: { [Op.iLike]: `%${nombre3}%` } },
                        { nombre_usuario: { [Op.iLike]: `%${nombre4}%` } },
                        { apellido_usuario: { [Op.iLike]: `%${nombre1}%` } },
                        { apellido_usuario: { [Op.iLike]: `%${nombre2}%` } },
                        { apellido_usuario: { [Op.iLike]: `%${nombre3}%` } },
                        { apellido_usuario: { [Op.iLike]: `%${nombre4}%` } },
                    ]
                },
                raw: true
            });

            if (response.length > 0) {
                arrayUsuarios = response
            } else {
                console.log('No hay coincidencias para la búsqueda realizada')
            }
		}
        
        arrayUsuarios = filtrarEstado (estado, arrayUsuarios)
        arrayUsuarios = filtrarRol (rol,arrayUsuarios)
        arrayUsuarios = ordenarAlfabeUsuario (ordenar,arrayUsuarios)

        const paginacion = await resultadosPaginados(paginaActual, 8, arrayUsuarios);

        res.status(200).json(paginacion);
    }catch(error){
        console.log('No existen resultados para los criterios establecidos')
        res.status(500).json({ error: error.message });
    }
}

module.exports = usuariosFiltrados;