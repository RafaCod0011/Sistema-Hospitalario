const express = require("express");
const router = express.Router();
const usuarioController = require("../../controller/Usuarios/usuarioController");

router.get("/nuevo", usuarioController.formulario);
router.post("/nuevo", usuarioController.crear);
router.get("/listar", usuarioController.listar);

module.exports = router;
