const express= require('express');
const PORT=3000;
const app= express();
const pug= require('pug');


app.set("view engine", "pug");
app.set("views", "./views");




app.get("/", (req, res) => {
    res.render("index.pug");
});




// Inicio del servidor

app.listen(PORT, () => {
    console.log("Servidor corriendo en el puerto 3000");
});
