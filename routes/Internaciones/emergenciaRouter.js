const express = require("express");
const router = express.Router();
const registrarEmergencia = require("../../controller/Admisiones/emergenciaController");

router.post("/", registrarEmergencia.registrarEmergencia);

module.exports = router;
