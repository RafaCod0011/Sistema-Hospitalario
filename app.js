const express = require("express");
const PORT = 3000;
const app = express();
const fs = require("fs");

const userRouter = require("./routes/user");

app.use(express.static("public"));

app.set("view engine", "pug");
app.set("views", "./views");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/Persona", (req, res) => {
  res.render("Persona/persona");
});

app.post("/persona/add", (req, res) => {
  console.log(req.body);
  fs.readFile("usuarios.json", (err, data) => {
    if (err) {
      console.log(err);
      return res.status(500).send("Error al leer el archivo");
    }
    const personas = JSON.parse(data);
    personas.push(req.body);

    fs.writeFile("usuarios.json", JSON.stringify(personas, null, 2), (err) => {
      if (err) {
        console.log(err);
        return res.status(500).send("Error al escribir el archivo");
      }
      res.render("Persona/listado", { personas: personas });
    });
  });
});

app.get("/login", (req, res) => {
  res.render("login/login");
});

// Rutas

app.use("/", userRouter);

// Inicio del servidor

app.listen(PORT, () => {
  console.log("Servidor corriendo en el puerto 3000");
});
