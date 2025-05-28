const express = require("express");
const router = express.Router();
const personaController = require("../../controller/Persona/personaController");

router.get("/nuevo", personaController.formulario);
router.post("/nuevo", personaController.crear);

router.get("/editar/:id", personaController.formularioEditar);
router.post("/editar/:id", personaController.actualizar);
router.get("/buscar", personaController.buscarPorDNI);
router.get("/listar", personaController.listar);
module.exports = router;
