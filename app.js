const express = require("express");
const PORT = 3000;
const app = express();
const path = require("path");

//Conexion a la base de datos

const { sequelize } = require("./models/sequelize/index");

sequelize
  .sync({ force: false })
  .then(() => {
    console.log("Conectado a la base de datos");
  })
  .catch((error) => {
    console.log("Error al conectar a la base de datos", error);
  });

const userRouter = require("./routes/userRouter");

app.use(express.static(path.join(__dirname, "public")));

app.set("view engine", "pug");
// app.set("views", "./views");
app.set("views", path.join(__dirname, "views"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/login", (req, res) => {
  res.render("login/login");
});

// ******* Rutas ********
// Ruta Registro
app.use("/", userRouter);

//Ruta Pacientes
app.get("/pacientes", (req, res) => {
  res.render("Paciente/crear");
});

// Inicio del servidor

app.listen(PORT, () => {
  console.log("Servidor iniciado en el puerto http://localhost:${PORT}");
});
