const { Usuarios } = require("../db");
const resultadosPaginados = require("../utils/paginacion");

const filtrarEstado = (estado, arrayUsuarios) => {
	if (estado === 0) {
		const usuariosActivos = [];
        arrayUsuarios.map((usuario) => {
            if (usuario.inactivo === estado) {
                usuariosActivos.push(usuario)
            }
        })
		return usuariosActivos;
	} 
    if (estado === 1) {
        const usuariosInactivos = [];
        arrayUsuarios.map((usuario)=>{
            if (usuario.inactivo === estado) {
                usuariosInactivos.push(usuario)
            }
        })
		return usuariosInactivos;
    }
    else {
		return arrayUsuarios;
	}
};

const filtrarRol = (rol, arrayUsuarios) => {
	if (rol === "client") {
		const usuariosClientes = [];
        arrayUsuarios.map((usuario) => {
            if (usuario.roles === rol) {
                usuariosClientes.push(usuario)
            }
        })
		return usuariosClientes;
	} 
    if (rol === "admin") {
        const usuariosAdmins = [];
        arrayUsuarios.map((usuario)=>{
            if (usuario.roles === rol) {
                usuariosAdmins.push(usuario)
            }
        })
		return usuariosAdmins;
    }
    else {
		return arrayUsuarios;
	}
};

const ordenarAlfabeUsuario = (ordenar, arrayUsuarios) => {
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
    if (ordenar === 'email-asc') {
		arr.sort((a, b) => {
            return a.email_usuario.localeCompare(b.email_usuario);
		});
	}
    if (ordenar === 'email-desc') {
		arr.sort((a, b) => {
            return b.email_usuario.localeCompare(a.email_usuario);
		});
	}
};

const usuariosFiltrados = async (req, res) => {
    try{
        const{
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
            attributes: ['nombre_usuario', 'apellido_usuario'],
            raw: true
          });

        if (nombre) {
            const matchingUsuarios = arrayUsuarios.filter(usuario => {
                const nombreUsuario = usuario.nombre_usuario.toLowerCase();
                const apellidoUsuario = usuario.apellido_usuario.toLowerCase();
                const searchWord = nombre.toLowerCase();
            
                return nombreUsuario === searchWord || apellidoUsuario === searchWord;
            });

            if (matchingUsuarios.length > 0) {
                return matchingUsuarios
            } else {
                console.log('No hay coincidencias para la búsqueda realizada')
            }
		}

        // arrayUsuarios = arrayUsuarios.map((a) => a.dataValues);

        arrayUsuarios = filtrarEstado (estado, arrayUsuarios)
        arrayUsuarios = filtrarRol (rol,arrayUsuarios)
        arrayUsuarios = ordenarAlfabeUsuario (ordenar,arrayUsuarios)

        const paginacion = await resultadosPaginados(paginaActual, 8, arrayUsuarios);

        res.status(200).json(paginacion);

    }catch(error){
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}

module.exports = usuariosFiltrados;