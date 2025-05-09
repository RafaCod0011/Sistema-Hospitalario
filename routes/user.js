const express = require("express");
const router = express.Router();
const userController = require("../controller/Usuarios/userController");

// Ruta Registro
router.get("/", (req, res) => {
  res.render("login/registro");
});

// Ruta Registro/add

router.post("/registro/add", (req, res) => {
  console.log(req.body);

  userController.addUser(req, res);
});

module.exports = router;
