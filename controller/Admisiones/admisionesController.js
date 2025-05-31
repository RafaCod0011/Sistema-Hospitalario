const Persona = require("../../models/sequelize/Personas/personas");
const AdmisionesMotivo = require("../../models/sequelize/Admisiones/admisiones_motivo");
const Admision = require("../../models/sequelize/Admisiones/admisiones");
const IdentidadMedica = require("../../models/sequelize/Personas/identidad_medica");
const Paciente = require("../../models/sequelize/Pacientes/pacientes");
const Recepcionista = require("../../models/sequelize/Personas/recepcionistas");
const ObraSocial = require("../../models/sequelize/Pacientes/obra_social");
const Sala = require("../../models/sequelize/Camas/salas");
const Cama = require("../../models/sequelize/Camas/camas");
const Habitacion = require("../../models/sequelize/Camas/habitaciones");
const Internacion = require("../../models/sequelize/Internacion/internaciones");
const sequelize = require("../../config/db");

async function buscar(req, res) {
  res.render("Admisiones/buscar");
}
function generarCodigoTemporal() {
  return "TEMP-" + Math.random().toString(36).substr(2, 9).toUpperCase();
}
async function buscarPorDNI(req, res) {
  const { dni } = req.body;
  try {
    const persona = await Persona.findOne({ where: { dni } });
    if (!persona) {
      return res.json({ found: false, dni });
    }

    const identidades = await IdentidadMedica.findAll({
      where: { persona_id: persona.id },
      attributes: ["id"],
    });
    const identidadIds = identidades.map((i) => i.id);

    let admisionIds = [];
    if (identidadIds.length) {
      const admisiones = await Admision.findAll({
        where: { identidad_medica_id: identidadIds },
        attributes: ["id"],
      });
      admisionIds = admisiones.map((a) => a.id);
    }

    let internado = null;
    if (admisionIds.length) {
      internado = await Internacion.findOne({
        where: {
          admision_id: admisionIds,
          estado: "en curso",
        },
      });
    }
    if (internado) {
      return res.json({
        found: true,
        personaId: persona.id,
        interned: true,
        internacionId: internado.id,
      });
    } else {
      return res.json({
        found: true,
        personaId: persona.id,
        interned: false,
      });
    }
  } catch (error) {
    console.error("Error al buscar persona por DNI:", error);
    return res.status(500).json({ error: "Error interno" });
  }
}
function validarAdmision({
  persona_id,
  motivo_id,
  contacto_emergencia,
  recepcionista_id,
  obra_social_id,
}) {
  const regexTelefono =
    /^(?=(?:.*\d){10,})\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/;

  if (
    !persona_id ||
    !motivo_id ||
    !contacto_emergencia ||
    !recepcionista_id ||
    !obra_social_id
  ) {
    return "Todos los campos son obligatorios";
  }

  if (!regexTelefono.test(contacto_emergencia)) {
    return "Formato de teléfono de contacto incorrecto";
  }

  return null;
}

async function nuevaAdmision(req, res) {
  const { persona_id } = req.params;
  const internacionId = req.query.internacion || null;
  try {
    const persona = await Persona.findByPk(persona_id);
    if (!persona) {
      return res.status(404).render("Admisiones/buscar", {
        error: "Persona no encontrada",
        values: {},
      });
    }

    const personaData = persona
      ? {
          id: persona.id,
          nombre: persona.nombre,
          dni: persona.dni,
          fecha_nacimiento: persona.fecha_nacimiento,
          genero: persona.genero,
          telefono: persona.telefono,
          direccion: persona.direccion,
        }
      : null;

    const motivos = await AdmisionesMotivo.findAll();
    const recepcionistas = await Recepcionista.findAll({
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
      ],
    });
    const obrasSociales = await ObraSocial.findAll();

    res.render("Admisiones/registro", {
      error: null,
      persona: personaData,
      motivos,
      recepcionistas,
      obrasSociales,
      values: { persona_id },
      internacionId,
    });
  } catch (err) {
    console.error("Error al mostrar formulario de admisión:", err);
    res.status(500).render("Admisiones/buscar", {
      error: "Error interno al cargar datos",
      values: {},
    });
  }
}

async function crearAdmision(req, res) {
  const {
    persona_id,
    motivo_id,
    contacto_emergencia,
    recepcionista_id,
    obra_social_id,
  } = req.body;

  // 1) Re-cargar datos completos de persona para campos readonly
  const persona = await Persona.findByPk(persona_id);
  const personaData = persona
    ? {
        id: persona.id,
        nombre: persona.nombre,
        dni: persona.dni,
        fecha_nacimiento: persona.fecha_nacimiento,
        genero: persona.genero,
        telefono: persona.telefono,
        direccion: persona.direccion,
      }
    : null;

  // 2) Cargar listas de apoyo siempre
  const motivos = await AdmisionesMotivo.findAll();
  const recepcionistas = await Recepcionista.findAll({
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
    ],
  });
  const obrasSociales = await ObraSocial.findAll();

  // 3) Validación de campos
  const errorValidacion = validarAdmision({
    persona_id,
    motivo_id,
    contacto_emergencia,
    recepcionista_id,
    obra_social_id,
  });
  if (errorValidacion) {
    return res.status(400).render("Admisiones/registro", {
      error: errorValidacion,
      values: {
        persona_id,
        motivo_id,
        contacto_emergencia,
        recepcionista_id,
        obra_social_id,
      },
      motivos,
      recepcionistas,
      obrasSociales,
      persona: personaData,
    });
  }

  const t = await sequelize.transaction();

  try {
    // 4) Buscar o crear identidad médica
    let identidad = persona_id
      ? await IdentidadMedica.findOne({ where: { persona_id }, transaction: t })
      : null;
    if (!identidad) {
      identidad = await IdentidadMedica.create(
        {
          es_temporal: true,
          codigo_temp: generarCodigoTemporal(),
          fecha_creacion: new Date(),
          persona_id: persona_id || null,
        },
        { transaction: t }
      );
    }

    // 5) Crear o actualizar paciente utilizando la asociación
    let paciente = await identidad.getPaciente({ transaction: t });
    if (!paciente) {
      // No existe un paciente asociado, así que se crea uno
      paciente = await Paciente.create(
        {
          obra_social_id,
          contacto_emergencia,
        },
        { transaction: t }
      );
      // Asigna la relación: actualiza la identidad médica para vincularla al paciente creado
      identidad.paciente_id = paciente.id;
      await identidad.save({ transaction: t });
    } else {
      // Si ya existe, actualiza sus campos
      paciente.obra_social_id = obra_social_id;
      paciente.contacto_emergencia = contacto_emergencia;
      await paciente.save({ transaction: t });
    }

    // 6) Crear admisión
    const nuevaAdmision = await Admision.create(
      {
        identidad_medica_id: identidad.id,
        recepcionista_id,
        motivo_id,
      },
      { transaction: t }
    );

    // 7) Actualizar identidad temporal si aplica
    if (persona_id && identidad.es_temporal) {
      identidad.es_temporal = false;
      await identidad.save({ transaction: t });
    }

    await t.commit();
    return res.redirect(`/Admisiones/asignar/${nuevaAdmision.id}`);
  } catch (error) {
    await t.rollback();
    console.error("Error en crearAdmision:", error);
    return res.status(500).render("Admisiones/registro", {
      error: "Error al procesar la admisión",
      values: {
        persona_id,
        motivo_id,
        contacto_emergencia,
        recepcionista_id,
        obra_social_id,
      },
      motivos,
      recepcionistas,
      obrasSociales,
      persona: personaData,
    });
  }
}
async function mostrarAsignacionCama(req, res) {
  const { admisionId } = req.params;
  try {
    const admision = await Admision.findByPk(admisionId, {
      include: {
        model: IdentidadMedica,
        as: "identidad_medica",
        include: {
          model: Persona,
          as: "persona",
          attributes: ["genero"],
        },
      },
    });
    const salas = await Sala.findAll();

    const personaGenero = admision.identidad_medica.persona.genero;

    res.render("Admisiones/asignar", {
      admision,
      salas,
      personaGenero,
      error: null,
    });
  } catch (error) {
    console.error("Error al buscar salas:", error);
    res.status(500).render("asignar-cama", {
      error: "Error interno al cargar datos",
      salas: [],
    });
  }
}

async function asignarCama(req, res) {
  const { admisionId } = req.params;
  const { camaId } = req.body;

  const transaction = await sequelize.transaction();

  try {
    const cama = await Cama.findByPk(camaId, { transaction });

    if (!cama || cama.estado !== "libre") {
      await transaction.rollback();
      const salas = await Sala.findAll();
      return res.status(400).render("Admisiones/asignar", {
        error: "Cama no disponible",
        admision: { id: admisionId },
        salas: salas,
        camas: await Cama.findAll({ where: { estado: "libre" } }),
      });
    }

    await cama.update({ estado: "ocupado" }, { transaction });

    const internacion = await Internacion.create(
      {
        admision_id: admisionId,
        cama_id: camaId,
        fecha_ingreso: new Date(),
      },
      { transaction }
    );

    await transaction.commit();

    res.redirect(`/internaciones/${internacion.id}`);
  } catch (error) {
    await transaction.rollback();
    console.error("Error en asignación de cama:", error);
    const salas = await Sala.findAll();
    res.status(500).render("Admisiones/asignar", {
      error: "Error al asignar cama",
      salas: salas,
      admision: { id: admisionId },
      camas: await Cama.findAll({ where: { estado: "libre" } }),
    });
  }
}
async function listarAdmisiones(req, res) {
  try {
    const admisiones = await Admision.findAll({
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
        {
          model: AdmisionesMotivo,
          as: "motivo",
          attributes: ["descripcion"],
        },
      ],
    });

    const formattedAdmisiones = admisiones.map((admision) => {
      const fechaAdmision = admision.fecha_admision
        ? new Date(admision.fecha_admision).toLocaleDateString("es-AR")
        : "N/A";

      return {
        id: admision.id,
        fecha: fechaAdmision,
        paciente:
          admision.identidad_medica?.persona?.nombre || "No identificado",
        dni: admision.identidad_medica?.persona?.dni || "N/A",
        recepcionista: admision.recepcionista?.persona?.nombre || "No asignado",
        motivo: admision.motivo?.descripcion || "No especificado",
        estado: admision.estado || "Activa",
      };
    });

    res.render("Admisiones/listado", { admisiones: formattedAdmisiones });
  } catch (error) {
    console.error("Error al listar admisiones:", error);
    res.status(500).render("error", {
      error: "Error al cargar el listado de admisiones",
    });
  }
}
async function eliminarAdmision(req, res) {
  const { id } = req.params;
  try {
    const admision = await Admision.findByPk(id);
    if (!admision) {
      return res.status(404).json({
        success: false,
        error: "Admisión no encontrada",
      });
    }

    await admision.destroy();
    return res.json({
      success: true,
      message: "Admisión eliminada correctamente",
    });
  } catch (error) {
    console.error("Error al eliminar admisión:", error);

    // Detectamos el error de FK
    const fkError =
      error.name === "SequelizeForeignKeyConstraintError" ||
      (error.parent && error.parent.errno === 1451);

    if (fkError) {
      return res.status(400).json({
        success: false,
        error: "No se puede eliminar una admisión con una internación activa.",
      });
    }

    return res.status(500).json({
      success: false,
      error: "Error interno al eliminar la admisión",
    });
  }
}
async function obtenerCamasDisponibles(req, res) {
  try {
    const { habitacionId, personaGenero } = req.query;
    if (!habitacionId || !personaGenero) {
      return res.status(400).json({ error: "Faltan parámetros" });
    }

    // Buscamos si hay internación cuya cama pertenece a la habitación
    const internado = await Internacion.findOne({
      include: [
        {
          model: Cama,
          where: { habitacion_id: habitacionId },
        },
        {
          model: Admision,
          as: "admision",
          include: [
            {
              model: IdentidadMedica,
              as: "identidad_medica",
              include: [
                { model: Persona, as: "persona", attributes: ["genero"] },
              ],
            },
          ],
        },
      ],
    });

    const generoExistente = internado
      ? internado.admision.identidad_medica.persona.genero
      : null;

    // Listamos camas libres e higienizadas en la habitación
    let camas = await Cama.findAll({
      where: {
        habitacion_id: habitacionId,
        estado: "libre",
        higienizada: true,
      },
      order: [["numero_en_habitacion", "ASC"]],
    });

    // Filtrado por sexo si ya hay un internado
    if (generoExistente && personaGenero !== generoExistente) {
      camas = [];
    }

    return res.json(camas);
  } catch (error) {
    console.error("Error al obtener camas:", error);
    return res.status(500).json({ error: "Error interno al cargar camas" });
  }
}

async function obtenerHabitacionesPorSala(req, res) {
  try {
    const { salaId } = req.query;
    if (!salaId) {
      return res.status(400).json({ error: "Falta salaId" });
    }
    const habitaciones = await Habitacion.findAll({
      where: { sala_id: salaId },
      order: [["numero", "ASC"]],
    });
    return res.json(habitaciones);
  } catch (error) {
    console.error("Error al obtener habitaciones:", error);
    return res
      .status(500)
      .json({ error: "Error interno al cargar habitaciones" });
  }
}
module.exports = {
  buscarPorDNI,
  nuevaAdmision,
  crearAdmision,
  buscar,
  mostrarAsignacionCama,
  asignarCama,
  listarAdmisiones,
  eliminarAdmision,
  obtenerCamasDisponibles,
  obtenerHabitacionesPorSala,
};
