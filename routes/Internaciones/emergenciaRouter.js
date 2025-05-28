const express = require("express");
const router = express.Router();
const registrarEmergencia = require("../../controller/Admisiones/emergenciaController");

router.post("/", registrarEmergencia.registrarEmergencia);

router.get(
  "/:internacionId/actualizar-datos",
  registrarEmergencia.mostrarActualizarDatos
);
router.post(
  "/:internacionId/actualizar-datos",
  registrarEmergencia.actualizarDatosEmergencia
);
module.exports = router;
