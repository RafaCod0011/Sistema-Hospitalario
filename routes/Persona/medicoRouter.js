const express = require("express");
const router = express.Router();

const medicoController = require("../../controller/Persona/medicoController");

router.get("/listar", medicoController.listar);

module.exports = router;
