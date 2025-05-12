const userModel = require("../../models/Usuarios/userModel");

const addUser = async (req, res) => {
  const user = req.body;

  if (
    user.nombre === "" ||
    user.apellido === "" ||
    user.edad === "" ||
    user.dni === "" ||
    user.fechaNacimiento === "" ||
    user.genero === "" ||
    user.telefono === "" ||
    user.direccion === "" ||
    user.rol === "" ||
    user.email === "" ||
    user.password === ""
  ) {
    return res.render("Registro/registro", {
      error: "Todos los campos son obligatorios",
      values: {
        nombre: user.nombre,
        apellido: user.apellido,
        edad: user.edad,
        dni: user.dni,
        fechaNacimiento: user.fechaNacimiento,
        genero: user.genero,
        telefono: user.telefono,
        direccion: user.direccion,
        rol: user.rol,
        email: user.email,
        password: user.password,
      },
    });
  }
  try {
    await userModel.addUser(user);
    const usuarios = await userModel.getUsers();
    return res.render("registro/listado", { users: usuarios });
  } catch (error) {
    res.render("registro/registro", {
      error: error,
      values: {
        nombre: user.nombre,
        apellido: user.apellido,
        edad: user.edad,
        dni: user.dni,
        fechaNacimiento: user.fechaNacimiento,
        genero: user.genero,
        telefono: user.telefono,
        direccion: user.direccion,
        rol: user.rol,
        email: user.email,
        password: user.password,
      },
    });
  }
};

module.exports = { addUser };
