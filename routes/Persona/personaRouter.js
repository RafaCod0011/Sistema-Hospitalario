const express = require("express");
const router = express.Router();
const personaController = require("../../controller/Persona/personaController");

// Ruta Listado
router.get("/nuevo", personaController.formulario);
router.post("/nuevo", personaController.crear);

router.get("/listar", personaController.listar);

module.exports = router;
