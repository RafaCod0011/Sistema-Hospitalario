const Usuario = require("../../models/sequelize/Usuarios/usuario");
const Rol = require("../../models/sequelize/Usuarios/rol");

function validarUsuario(Usuario) {
  const regex = {
    correo: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    pass: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
  };

  const camposRequeridos = ["user", "correo", "pass", "confirmarCorreo"];

  if (camposRequeridos.some((campo) => !Usuario[campo])) {
    return {
      error: "Todos los campos son obligatorios",
    };
  }

  if (!regex.correo.test(Usuario.correo)) {
    return { error: "Formato de email inválido" };
  }

  if (Usuario.correo !== Usuario.confirmarCorreo) {
    return { error: "Los emails no coinciden" };
  }

  if (!regex.pass.test(Usuario.pass)) {
    return {
      error:
        "La contraseña debe tener al menos 8 caracteres, una letra mayúscula, una letra minúscula y un número",
    };
  }
}

async function crear(req, res) {
  const usuario = req.body;

  const errorValidacion = validarUsuario(usuario, true);

  if (errorValidacion) {
    const roles = await Rol.findAll();
    return res.status(400).render("Usuario/registro", {
      error: errorValidacion.error,
      roles,
      values: usuario,
    });
  }

  try {
    const usuarioExistente = await Usuario.findOne({
      where: { username: usuario.user },
    });

    if (usuarioExistente) {
      const roles = await Rol.findAll();
      return res.status(400).render("Usuario/registro", {
        error: "El nombre de usuario ya está en uso",
        roles,
        values: usuario,
      });
    }

    // Crear usuario (mapea los campos si es necesario)
    await Usuario.create({
      username: usuario.user,
      password: usuario.pass,
      correo: usuario.correo,
    });

    res.redirect("/usuario/listar");
  } catch (error) {
    console.error("Error al crear usuario:", error);
    const roles = await Rol.findAll();
    res.status(500).render("Usuario/registro", {
      error: "Error interno al crear el usuario",
      roles,
      values: usuario,
    });
  }
}

async function listar(req, res) {
  try {
    const usuarios = await Usuario.findAll();
    res.render("Usuario/listado", { usuarios });
  } catch (error) {
    console.error("Error al listar los usuarios:", error);
    res.status(500).render("Usuarios/listado", {
      error: "Error al listar los usuarios",
    });
  }
}

async function formulario(req, res) {
  try {
    const roles = await Rol.findAll();
    res.render("Usuario/registro", {
      roles: roles,
      values: null,
      editar: false,
    });
  } catch (error) {
    console.error("Error al obtener los roles:", error);
    res.status(500).render("Usuario/registro", {
      roles: [],
      error: "Error al obtener los roles",
    });
  }
}
module.exports = {
  validarUsuario,
  crear,
  listar,
  formulario,
};
