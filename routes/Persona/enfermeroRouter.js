const express = require("express");
const router = express.Router();

const enfermeroController = require("../../controller/Persona/enfermeroController");

router.get("/listar", enfermeroController.listar);

module.exports = router;
