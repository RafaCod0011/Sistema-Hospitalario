const express = require("express");
const router = express.Router();
const internacionController = require("../../controller/Internaciones/internacionController");

router.get("/internaciones/:id", internacionController.mostrarInternacion);

module.exports = router;
