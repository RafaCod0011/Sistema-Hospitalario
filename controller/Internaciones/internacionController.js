const Persona = require("../../models/sequelize/Personas/personas");
const Admision = require("../../models/sequelize/Admisiones/admisiones");
const AdmisionMotivo = require("../../models/sequelize/Admisiones/admisiones_motivo");
const IdentidadMedica = require("../../models/sequelize/Personas/identidad_medica");
const Paciente = require("../../models/sequelize/Pacientes/pacientes");
const Recepcionista = require("../../models/sequelize/Personas/recepcionistas");
const ObraSocial = require("../../models/sequelize/Pacientes/obra_social");
const Sala = require("../../models/sequelize/Camas/salas");
const Internacion = require("../../models/sequelize/Internacion/internaciones");
const Cama = require("../../models/sequelize/Camas/camas");
const Habitacion = require("../../models/sequelize/Camas/habitaciones");

async function mostrarInternacion(req, res) {
  const { id } = req.params;

  try {
    const internacion = await Internacion.findByPk(id, {
      include: [
        {
          model: Admision,
          as: "admision",
          include: [
            {
              model: IdentidadMedica,
              as: "identidad_medica",
              include: [
                {
                  model: Paciente,
                  as: "paciente",
                  include: [
                    {
                      model: ObraSocial,
                      as: "obra_social",
                      attributes: ["nombre"],
                    },
                  ],
                },
                {
                  model: Persona,
                  as: "persona",
                  attributes: ["nombre", "dni", "fecha_nacimiento", "genero"],
                },
              ],
            },
            {
              model: AdmisionMotivo,
              as: "motivo",
              attributes: ["descripcion"],
            },
            {
              model: Recepcionista,
              as: "recepcionista",
              include: [
                {
                  model: Persona,
                  as: "persona",
                  attributes: ["nombre"],
                },
              ],
            },
          ],
        },
        {
          model: Cama,
          include: [
            {
              model: Habitacion,
              include: [
                {
                  model: Sala,
                },
              ],
            },
          ],
        },
      ],
    });

    if (!internacion) {
      return res.status(404).render("error", {
        error: "Internación no encontrada",
      });
    }
    const internacionId = internacion.id;
    const cama = internacion.Cama || null;
    const habitacion = cama?.Habitacion || null;
    const sala = habitacion?.Sala || null;

    const obra_social =
      internacion.admision.identidad_medica.paciente.obra_social || null;

    const persona = internacion.admision.identidad_medica.persona;
    const recepcionista =
      internacion.admision.recepcionista?.persona?.nombre || "No identificado";
    const contactoEmergencia =
      internacion.admision.identidad_medica.paciente.contacto_emergencia ||
      "Sin contacto";
    const motivoDescripcion =
      internacion.admision.motivo?.descripcion || "No especificado";
    const estado = internacion.estado || "En curso";

    const fechaIngresoFormateada = new Date(
      internacion.fecha_ingreso
    ).toLocaleDateString("es-AR");
    const fechaAdmisionFormateada = internacion.admision.fecha_admision
      ? new Date(internacion.admision.fecha_admision).toLocaleDateString(
          "es-AR"
        )
      : null;
    const personaFechaNacimientoFormateada = persona.fecha_nacimiento
      ? new Date(persona.fecha_nacimiento).toLocaleDateString("es-AR")
      : null;

    res.render("Internaciones/detalle", {
      persona,
      obra_social,
      recepcionista,
      fechaIngresoFormateada,
      fechaAdmisionFormateada,
      personaFechaNacimientoFormateada,
      cama,
      habitacion,
      sala,
      contactoEmergencia,
      motivoDescripcion,
      estado,
      internacionId,
    });
  } catch (error) {
    console.error("Error al cargar internación:", error);
    res.status(500).render("error", {
      error: "Error al cargar los detalles de la internación",
    });
  }
}

module.exports = {
  mostrarInternacion,
};
