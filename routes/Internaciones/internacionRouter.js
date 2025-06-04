const express = require("express");
const router = express.Router();
const internacionController = require("../../controller/Internaciones/internacionController");

router.get("/internados", internacionController.listarInternados);
router.get("/", internacionController.listarInternaciones);
router.get("/:id", internacionController.mostrarInternacion);

module.exports = router;
