const {
  crearUsuario,
  todosLosUsuarios,
  traerUsuario,
  traerUsuarioNombre,
  borrarUsuario,
  modificarUsuario,
  modificarRol,
} = require("../controllers/usuariosControllers");

const getUsuarios = async (req, res) => {
  const { nombre_usuario, apellido_usuario } = req.query;
  try {
    if (nombre_usuario || apellido_usuario) {
      const response = await traerUsuarioNombre(
        nombre_usuario,
        apellido_usuario
      );
      return res.status(200).json(response);
    } else {
      const response = await todosLosUsuarios();
      return res.status(200).json(response);
    }
  } catch (error) {
    return res.status(400).json({ error: error.message });
  }
};

const getUsuario = async (req, res) => {
  const { email_usuario } = req.query;
  try {
    const response = await traerUsuario(email_usuario);
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const postUsuario = async (req, res) => {
  const { nombre_usuario, apellido_usuario, email_usuario, roles } = req.body;
  try {
    const response = await crearUsuario(
      nombre_usuario,
      apellido_usuario,
      email_usuario,
      roles
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putUsuario = async (req, res) => {
  const { nombre_usuario, apellido_usuario, email_usuario, usuario_id } =
    req.body;
  try {
    const response = modificarUsuario(
      nombre_usuario,
      apellido_usuario,
      email_usuario,
      usuario_id
    );
    res.status(200).send(`se modifico el usuario ${usuario_id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const deleteUsuario = async (req, res) => {
  const { usuario_id } = req.body;
  console.log(usuario_id);
  try {
    const response = await borrarUsuario(usuario_id);
    if (response.inactivo === true) {
      return res.status(200).send(`se elimino el usuario ${usuario_id}`);
    } else {
      return res.status(200).send(`se activo el usuario ${usuario_id}`);
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const putUsuarioRol = async (req, res) => {
  const { roles, usuario_id } = req.body;
  try {
    const response = modificarRol(usuario_id, roles);
    res.status(200).send(`se modifico el rol del usuario ${usuario_id}`);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getUsuarios,
  getUsuario,
  postUsuario,
  putUsuario,
  deleteUsuario,
  putUsuarioRol,
};
