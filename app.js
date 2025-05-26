const express = require("express");
const app = express();
const path = require("path");
const sequelize = require("./config/db");

const models = require("./models/sequelize/index");
console.log("Modelos y asociaciones cargados:", Object.keys(models));

// Importar rutas
const indexRouter = require("./routes/index");
const personaRouter = require("./routes/Persona/personaRouter");
const profesionalRouter = require("./routes/Persona/profesionalRouter");
const medicoRouter = require("./routes/Persona/medicoRouter");
const enfermeroRouter = require("./routes/Persona/enfermeroRouter");
const admisionRouter = require("./routes/Admisiones/admisionRouter");
const apiRouter = require("./routes/api");
const internacionRouter = require("./routes/Internaciones/internacionRouter");

// const usuarioRouter = require("./routes/Usuario/usuarioRouter");

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));

// Milddware obtener datos del formulario
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Rutas
app.use("/", indexRouter);
app.use("/persona", personaRouter);
app.use("/profesional", profesionalRouter);
app.use("/medico", medicoRouter);
app.use("/enfermero", enfermeroRouter);
app.use("/admisiones", admisionRouter);
app.use("/api", apiRouter);
app.use("/internaciones", internacionRouter);

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
