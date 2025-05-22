const express = require("express");
const router = express.Router();

const profesionalController = require("../../controller/Persona/profesionalController");

router.get("/nuevo", profesionalController.formularioBusqueda);
router.post("/resultado", profesionalController.formulario);
router.post("/crear", profesionalController.crear);

/********************************************** */

router.get("/listar", profesionalController.listar);

module.exports = router;
