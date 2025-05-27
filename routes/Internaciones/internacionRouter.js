const express = require("express");
const router = express.Router();
const internacionController = require("../../controller/Internaciones/internacionController");

router.get("/:id", internacionController.mostrarInternacion);

module.exports = router;
