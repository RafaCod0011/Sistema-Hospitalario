const express = require("express");
const router = express.Router();
const Habitacion = require("../models/sequelize/Camas/habitaciones");
const Cama = require("../models/sequelize/Camas/camas");
const Sala = require("../models/sequelize/Camas/salas");

router.get("/habitaciones", async (req, res) => {
  try {
    const habitaciones = await Habitacion.findAll({
      where: { sala_id: req.query.salaId },
      include: [
        {
          model: Sala,
          attributes: ["id", "nombre"],
        },
      ],
      attributes: ["id", "numero", "capacidad"],
    });

    res.json(habitaciones);
  } catch (error) {
    console.error("Error en GET /api/habitaciones:", error);
    res.status(500).json({
      error: "Error al obtener habitaciones",
      detalles: error.message,
    });
  }
});

router.get("/camas", async (req, res) => {
  try {
    const camas = await Cama.findAll({
      where: {
        habitacion_id: req.query.habitacionId,
        estado: "libre",
        higienizada: true,
      },
      attributes: ["id", "numero_en_habitacion", "estado", "higienizada"],
      order: [["numero_en_habitacion", "ASC"]],
    });

    res.json(camas);
  } catch (error) {
    console.error("Error en GET /api/camas:", error);
    res.status(500).json({
      error: "Error al obtener camas",
      detalles: error.message,
    });
  }
});

module.exports = router;
