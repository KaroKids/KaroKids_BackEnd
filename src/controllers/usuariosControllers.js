const { Usuarios, Carritos, Ordenes } = require("../db");
// const { Op } = require("sequelize");

// const todosLosUsuarios = async () => {
//   const response = await Usuarios.findAll();
//   return response;
// };

// const traerUsuarioNombre = async (nombre_usuario, apellido_usuario) => {
//   if (nombre_usuario && apellido_usuario) {
//     const response = await Usuarios.findAll({
//       where: {
//         nombre_usuario: { [Op.iLike]: `%${nombre_usuario}%` },
//         apellido_usuario: { [Op.iLike]: `%${apellido_usuario}%` },
//       },
//     });
//     return response;
//   } else if (apellido_usuario) {
//     const response = await Usuarios.findAll({
//       where: { apellido_usuario: { [Op.iLike]: `%${apellido_usuario}%` } },
//     });
//     return response;
//   } else {
//     const response = await Usuarios.findAll({
//       where: { nombre_usuario: { [Op.iLike]: `%${nombre_usuario}%` } },
//     });
//     return response;
//   }
// };

const topUsuarios = async (top) =>{
  try {
    const ordenes = await Ordenes.findAll({
            include: [
              {
                model: Usuarios,
                attributes: ["nombre_usuario", "apellido_usuario"],
              },
            ],
          });

    let array = []
    let cont = 0
    for(orden of ordenes){
      let esta = false
      array = array.map((item) => {
            console.log(item.usuario.usuario_id + "  ===  " + orden.usuario_id)
            if(item.usuario.usuario_id === orden.usuario_id){
              item.cantidad = parseFloat(item.cantidad)
              item.cantidad += parseFloat(orden.coste_total)
              esta = true
            }
            return item;
          });
          if (esta === false){
            console.log("entro")
            let nuevo = {
              usuario : { 
                usuario_id : orden.usuario_id,
                 nombre_usuario : orden.Usuario.nombre_usuario,
                 apellido_usuario : orden.Usuario.apellido_usuario
              },
              cantidad : parseFloat(orden.coste_total)
            }
            array.push(nuevo)
          }
        }
        console.log(cont)
      array.sort((a, b) => b.cantidad - a.cantidad);
      if (array.length < top){
        return array
      }else{
      return array.slice(0,top)
      }
  } catch (error) {
    console.error("Error al obtener los productos más vendidos:", error);
    throw error;
  }

}

const traerUsuario = async (email_usuario) => {
  const response = await Usuarios.findOne({
    where: { email_usuario: email_usuario },
  });
  if (response === null) {
    return "El usuario no existe";
  } else {
    return response;
  }
};

const crearUsuario = async (
  nombre_usuario,
  apellido_usuario,
  email_usuario,
  roles
) => {
  const response = await Usuarios.create({
    nombre_usuario,
    apellido_usuario,
    email_usuario,
    roles,
  });
  let nuevoCarrito = await Carritos.create({
    usuario_id: response.usuario_id,
    productos_compra: [],
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
  console.log(user);
  await Usuarios.update(
    { inactivo: !user.inactivo },
    {
      where: { usuario_id: usuario_id },
    }
  );
  return user;
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
  // todosLosUsuarios,
  traerUsuario,
  // traerUsuarioNombre,
  borrarUsuario,
  modificarUsuario,
  crearUsuario,
  modificarRol,
  topUsuarios
};
