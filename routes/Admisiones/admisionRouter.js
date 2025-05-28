const express = require("express");
const router = express.Router();

const admisionController = require("../../controller/Admisiones/admisionesController");

router.get("/", admisionController.buscar);
router.get("/listar", admisionController.listarAdmisiones);
router.post("/buscar", admisionController.buscarPorDNI);
router.get("/nueva/:persona_id", admisionController.nuevaAdmision);
router.post("/crear", admisionController.crearAdmision);
router.get("/asignar/:admisionId", admisionController.mostrarAsignacionCama);
router.post("/cama/:admisionId", admisionController.asignarCama);
router.delete("/:id", admisionController.eliminarAdmision);

module.exports = router;
