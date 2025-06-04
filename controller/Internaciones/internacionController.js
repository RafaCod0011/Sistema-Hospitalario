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

    const esTemporal = internacion.admision.identidad_medica.es_temporal;

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
      esTemporal,
      successMsg: req.query.msg,
      errorMsg: req.query.err,
    });
  } catch (error) {
    console.error("Error al cargar internación:", error);
    res.status(500).render("error", {
      error: "Error al cargar los detalles de la internación",
    });
  }
}
async function listarInternaciones(req, res) {
  try {
    const registros = await Internacion.findAll({
      include: [
        {
          model: Admision,
          as: "admision",
          include: [
            {
              model: AdmisionMotivo,
              as: "motivo",
              attributes: ["descripcion"],
            },
          ],
          attributes: ["fecha_admision"],
        },
        {
          model: Cama,
          as: "Cama",
          include: [
            {
              model: Habitacion,
              as: "Habitacion",
              include: [
                {
                  model: Sala,
                  as: "Sala",
                  attributes: ["nombre"],
                },
              ],
              attributes: ["numero"],
            },
          ],
          attributes: ["numero_en_habitacion"],
        },
      ],
      order: [["fecha_ingreso", "DESC"]],
    });
    const internaciones = registros.map((i) => {
      const fechaIngreso = i.fecha_ingreso
        ? new Date(i.fecha_ingreso).toLocaleDateString("es-AR")
        : "N/A";
      const fechaAdmision = i.admision.fecha_admision
        ? new Date(i.admision.fecha_admision).toLocaleDateString("es-AR")
        : "N/A";
      const camaNum = i.Cama?.numero_en_habitacion ?? "N/A";
      const habitacionNombre = i.Cama?.Habitacion?.numero ?? "N/A";
      const salaNombre = i.Cama?.Habitacion?.Sala?.nombre ?? "N/A";
      const estado = i.estado ?? "En curso";
      const motivo = i.admision.motivo?.descripcion ?? "No especificado";

      return {
        id: i.id,
        fechaIngreso,
        numeroCama: camaNum,
        habitacionNombre,
        salaNombre,
        estado,
        fechaAdmision,
        motivo,
      };
    });
    res.render("Internaciones/listado", { internaciones });
  } catch (err) {
    console.error("Error al listar internaciones:", err);
    res
      .status(500)
      .render("error", { error: "No se pudo listar internaciones" });
  }
}
async function listarInternados(req, res) {
  try {
    const internaciones = await Internacion.findAll({
      where: {
        estado: "en curso",
      },
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
                  attributes: ["contacto_emergencia"],
                },
                {
                  model: Persona,
                  as: "persona",
                  attributes: ["nombre", "dni", "telefono"],
                },
              ],
            },
          ],
        },
        {
          model: Cama,
          attributes: ["numero_en_habitacion"],
          include: [
            {
              model: Habitacion,
              attributes: ["numero"],
              include: [
                {
                  model: Sala,
                  attributes: ["nombre"],
                },
              ],
            },
          ],
        },
      ],
      order: [["fecha_ingreso", "DESC"]],
    });

    // Procesar resultados
    const pacientes = internaciones.map((internacion) => {
      const identidad = internacion.admision?.identidad_medica;

      return {
        nombre: identidad?.persona?.nombre || "N/A",
        dni: identidad?.persona?.dni || "N/A",
        telefono: identidad?.persona?.telefono || "N/A",
        contacto_emergencia: identidad?.paciente?.contacto_emergencia || "N/A",
        obra_social:
          identidad?.paciente?.obra_social?.nombre || "Sin obra social",
        sala: internacion.Cama?.Habitacion?.Sala?.nombre || "N/A",
        habitacion: internacion.Cama?.Habitacion?.numero || "N/A",
        cama: internacion.Cama?.numero_en_habitacion || "N/A",
      };
    });

    res.render("Paciente/listar", { pacientes });
  } catch (error) {
    console.error("Error al listar pacientes internados:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
}
module.exports = {
  mostrarInternacion,
  listarInternaciones,
  listarInternados,
};
