const express = require("express");
const router = express.Router();
const internacionController = require("../../controller/Internaciones/internacionController");

router.get("/:id", internacionController.mostrarInternacion);
router.get("/", internacionController.listarInternaciones);

module.exports = router;
