const fs = require("fs/promises");
const path = require("path");

// Lectura de archivos
const getUsers = async () => {
  try {
    const data = await fs.readFile(
      path.join(__dirname, "../../usuarios.json"),
      "utf-8"
    );
    return JSON.parse(data);
  } catch (error) {
    console.log("Error al leer el archivo", error);
    return null;
  }
};

// Escritura de archivos
const setUsers = async (usuarios) => {
  try {
    await fs.writeFile(
      path.join(__dirname, "../../usuarios.json"),
      JSON.stringify(usuarios, null, 2)
    );
  } catch (error) {
    console.log("Error al leer el archivo", error);
  }
};

// handler and user
const addUser = async (user) => {
  try {
    const usuarios = await getUsers();
    if (usuarios === null)
      throw new Error("Error al leer el archivo de usuarios");
    usuarios.push(user);
    await setUsers(usuarios);
    return "Usuario agregado correctamente";
  } catch (error) {
    return error;
  }
};

module.exports = { addUser, getUsers };
