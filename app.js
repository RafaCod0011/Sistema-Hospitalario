const express = require("express");
const app = express();
const path = require("path");
const sequelize = require("./config/db");

// Importar rutas

const personaRouter = require("./routes/Persona/personaRouter");

// const usuarioRouter = require("./routes/Usuario/usuarioRouter");

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Milddware obtener datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas

app.use("/persona", personaRouter);

//PAUSADO PARA LUEGO DESALLORAR CON AUTENTICACION

// app.use("/usuario", usuarioRouter);

// Inicio del servidor
const PORT = process.env.PORT || 3000;
sequelize
  .sync({ alter: true })
  .then(() => {
    console.log("Modelos sincronizados");
    app.listen(PORT, () => {
      console.log(`Servidor iniciado en http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error al sincronizar modelos:", err);
  });
