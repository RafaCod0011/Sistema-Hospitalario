const Profesional = require("../../models/sequelize/Personas/profesionales");
const Especialidad = require("../../models/sequelize/Personas/especialidad");
const Persona = require("../../models/sequelize/Personas/personas");

async function listar(req, res) {
  try {
    const enfermeros = await Profesional.findAll({
      where: {
        profesional_salud: "Enfermero",
      },
      include: [
        {
          model: Persona,
          as: "persona",
          attributes: [
            "nombre",
            "dni",
            "fecha_nacimiento",
            "genero",
            "telefono",
            "direccion",
          ],
        },
        {
          model: Especialidad,
          attributes: ["descripcion"],
        },
      ],
    });
    res.render("Profesional/enfermero", { enfermeros });
  } catch (error) {
    console.error("Error al listar los enfermeros:", error);
    res.status(500).render("Profesional/enfermero", {
      error: "Error al listar los enfermeros",
    });
  }
}

module.exports = {
  listar,
};
