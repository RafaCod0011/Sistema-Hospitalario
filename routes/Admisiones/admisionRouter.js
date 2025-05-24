const express = require("express");
const router = express.Router();

const admisionController = require("../../controller/Admisiones/admisionesController");

router.get("/", admisionController.buscar);
router.post("/buscar", admisionController.buscarPorDNI);
router.get("/nueva/:persona_id", admisionController.nuevaAdmision);
router.post("/crear", admisionController.crearAdmision);

module.exports = router;
