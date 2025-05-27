const Persona = require("../../models/sequelize/Personas/personas");
const AdmisionesMotivo = require("../../models/sequelize/Admisiones/admisiones_motivo");
const Admision = require("../../models/sequelize/Admisiones/admisiones");
const IdentidadMedica = require("../../models/sequelize/Personas/identidad_medica");
const Paciente = require("../../models/sequelize/Pacientes/pacientes");
const Recepcionista = require("../../models/sequelize/Personas/recepcionistas");
const ObraSocial = require("../../models/sequelize/Pacientes/obra_social");
const Sala = require("../../models/sequelize/Camas/salas");
const Cama = require("../../models/sequelize/Camas/camas");
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
      return res.redirect(`/persona/nuevo?dni=${dni}`);
    }
    // Si la persona existe, redirige al formulario de admisión para completar la admisión
    res.redirect(`/admisiones/nueva/${persona.id}`);
  } catch (error) {
    console.error("Error al buscar persona por DNI:", error);
    res.status(500).send("Error interno");
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

  try {
    // 4) Buscar o crear identidad médica
    let identidad = persona_id
      ? await IdentidadMedica.findOne({ where: { persona_id } })
      : null;
    if (!identidad) {
      identidad = await IdentidadMedica.create({
        es_temporal: true,
        codigo_temp: generarCodigoTemporal(),
        fecha_creacion: new Date(),
        persona_id: persona_id || null,
      });
    }

    // 5) Crear o actualizar paciente
    let paciente = await Paciente.findOne({
      where: { identidad_medica_id: identidad.id },
    });
    if (!paciente) {
      paciente = await Paciente.create({
        identidad_medica_id: identidad.id,
        obra_social_id,
        contacto_emergencia,
      });
    } else {
      paciente.obra_social_id = obra_social_id;
      paciente.contacto_emergencia = contacto_emergencia;
      await paciente.save();
    }

    // 6) Crear admisión
    const nuevaAdmision = await Admision.create({
      identidad_medica_id: identidad.id,
      recepcionista_id,
      motivo_id,
    });

    // 7) Actualizar identidad temporal si aplica
    if (persona_id && identidad.es_temporal) {
      identidad.es_temporal = false;
      await identidad.save();
    }

    // Éxito: redirigir
    return res.redirect(`/Admisiones/asignar/${nuevaAdmision.id}`);
  } catch (error) {
    console.error("Error en crearAdmision:", error);
    // Renderizar de nuevo con datos completos y mensaje de error
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
    const admision = await Admision.findByPk(admisionId);
    const salas = await Sala.findAll();

    res.render("Admisiones/asignar", {
      admision,
      salas,
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

module.exports = {
  buscarPorDNI,
  nuevaAdmision,
  crearAdmision,
  buscar,
  mostrarAsignacionCama,
  asignarCama,
};
