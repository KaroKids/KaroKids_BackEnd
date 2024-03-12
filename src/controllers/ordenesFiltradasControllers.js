const { Ordenes, Usuarios } = require("../db");
const { Op } = require("sequelize");
const resultadosPaginados = require("../utils/paginacion");

const filtrarEstado = (estado, array1) => {
	if (estado) {
		const arr = [];
        array1.map((o)=>{
            if(o.estado_pago === estado){
                arr.push(o)
            }
        })
		return arr;
	} else {
		return array1;
	}
};

const ordenar = (orden, array) => {
	let arr = [];
	arr = array;
	if (orden == 1) {
		arr.sort(function (a, b) {
			if (a.coste_total > b.coste_total) {
				return 1;
			}
			if (b.coste_total > a.coste_total) {
				return -1;
			}
			return 0;
		});
	}
	if (orden == 2) {
		arr.sort(function (a, b) {
			if (a.coste_total > b.coste_total) {
				return -1;
			}
			if (b.coste_total > a.coste_total) {
				return 1;
			}
			return 0;
		});
	}
	if (orden == 3) {
			arr.sort(function(a, b) {
                return a.Usuario.apellido_usuario.localeCompare(b.Usuario.apellido_usuario);
              });
	}
	if (orden == 4) {
		arr.sort(function(a, b) {
            return b.Usuario.apellido_usuario.localeCompare(a.Usuario.apellido_usuario);
          });
	}
    if (orden == 5) {
		arr.sort(function (a, b) {
			if (a.createdAt > b.createdAt) {
				return 1;
			}
			if (b.createdAt > a.createdAt) {
				return -1;
			}
			return 0;
		});
	}
	if (orden == 6) {
		arr.sort(function (a, b) {
			if (a.createdAt > b.createdAt) {
				return -1;
			}
			if (b.createdAt > a.createdAt) {
				return 1;
			}
			return 0;
		});
	}
	return arr;
};

async function ordenesFiltradas(req, res) {
    try{
        const{
            estado,
            orden,
            nombre,
        }= req.query;
        let {paginaActual} = req.query;
        if(!paginaActual){
            paginaActual = 1;
        }

        let array = [];
        if(nombre) {
            const searchWords = nombre.split(" ");

			const whereCondition = {
				[Op.and]: searchWords.map((word) => ({
					apellido_usuario: { [Op.iLike]: `%${word}%` },
				})),
			};
			array = await Ordenes.findAll({
				 
                include: [
                    {
                      model: Usuarios,
                      attributes: ['nombre_usuario', 'apellido_usuario'],
                      where: whereCondition
                    }
                  ]
			});
		} else {
			array = await Ordenes.findAll({
                include: [
                  {
                    model: Usuarios,
                    attributes: ['nombre_usuario', 'apellido_usuario']
                  }
                ]
              });
		}
        array = array.map((a) => a.dataValues);

        array = filtrarEstado (estado, array)
        array = await ordenar(orden,array)

        const paginacion = await resultadosPaginados(paginaActual, 8, array);

        res.status(200).json(paginacion);

    }catch(error){
        console.log(error)
        res.status(500).json({ error: error.message });
    }
}
module.exports = ordenesFiltradas;