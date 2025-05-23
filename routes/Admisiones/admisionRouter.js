const express = require("express");
const router = express.Router();

const admisionController = require("../../controller/Admisiones/admisionesController");

router.get("/", admisionController.buscar);

module.exports = router;
