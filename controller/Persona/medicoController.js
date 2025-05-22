const Profesional = require("../../models/sequelize/Personas/profesionales");
const Especialidad = require("../../models/sequelize/Personas/especialidad");
const Persona = require("../../models/sequelize/Personas/personas");

async function listar(req, res) {
  try {
    const medicos = await Profesional.findAll({
      where: {
        profesional_salud: "Medico",
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
    res.render("Profesional/medico", { medicos });
  } catch (error) {
    console.error("Error al listar los medicos:", error);
    res.status(500).render("Profesional/medico", {
      error: "Error al listar los medicos",
    });
  }
}

module.exports = {
  listar,
};
