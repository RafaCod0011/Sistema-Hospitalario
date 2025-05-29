const Persona = require("../../models/sequelize/Personas/personas");
const Admision = require("../../models/sequelize/Admisiones/admisiones");
const IdentidadMedica = require("../../models/sequelize/Personas/identidad_medica");
const Paciente = require("../../models/sequelize/Pacientes/pacientes");
const Recepcionista = require("../../models/sequelize/Personas/recepcionistas");
const Sala = require("../../models/sequelize/Camas/salas");
const Internacion = require("../../models/sequelize/Internacion/internaciones");
const Cama = require("../../models/sequelize/Camas/camas");
const Habitacion = require("../../models/sequelize/Camas/habitaciones");
const AdmisionMotivo = require("../../models/sequelize/Admisiones/admisiones_motivo");
const ObraSocial = require("../../models/sequelize/Pacientes/obra_social");
const sequelize = require("../../config/db");

function generarCodigoTemporal() {
  return "TEMP-" + Math.random().toString(36).substr(2, 9).toUpperCase();
}

function validarPersona(persona) {
  const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    dni: /^\d{7,8}$/,
    telefono:
      /^(?=(?:.*\d){10,})\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
  };
  const camposRequeridos = [
    "nombre",
    "dni",
    "fecha_nacimiento",
    "genero",
    "telefono",
    "direccion",
    "email",
    "confirm_email",
  ];
  for (const campo of camposRequeridos) {
    if (!persona[campo]) {
      return `El campo "${campo}" es obligatorio.`;
    }
  }

  if (!regex.email.test(persona.email)) {
    return "Formato de email inválido.";
  }

  if (persona.email !== persona.confirm_email) {
    return "Los emails no coinciden.";
  }

  if (!regex.dni.test(persona.dni)) {
    return "DNI debe contener solo números (7 u 8 dígitos).";
  }

  if (!regex.telefono.test(persona.telefono)) {
    return "Formato de teléfono inválido.";
  }

  const añoMinimo = 1900;
  const fechaNacimiento = new Date(persona.fecha_nacimiento);
  if (isNaN(fechaNacimiento.getTime())) {
    return "Fecha de nacimiento inválida.";
  }
  if (fechaNacimiento.getFullYear() < añoMinimo) {
    return `La fecha de nacimiento no puede ser anterior a ${añoMinimo}.`;
  }
  const hoy = new Date();
  if (fechaNacimiento > hoy) {
    return "La fecha de nacimiento no puede ser futura.";
  }

  return null;
}
async function registrarEmergencia(req, res) {
  try {
    const { internacion } = await sequelize.transaction(async (t) => {
      // 1. Crear identidad médica temporal
      const codigo = await generarCodigoTemporal();
      const identidad = await IdentidadMedica.create(
        { codigo_temp: codigo, fecha_creacion: new Date() },
        { transaction: t }
      );

      // 2. Crear persona temporal
      const persona = await Persona.create(
        { es_temporal: true, observaciones: "Ingreso emergencia sin datos" },
        { transaction: t }
      );
      identidad.persona_id = persona.id;
      await identidad.save({ transaction: t });

      // 3. Registrar o asegurar paciente
      const paciente = await Paciente.create({}, { transaction: t });
      identidad.paciente_id = paciente.id;
      await identidad.save({ transaction: t });

      // 4. Elegir un recepcionista cualquiera
      const recepcionista = await Recepcionista.findOne({ transaction: t });
      if (!recepcionista) throw new Error("No hay recepcionistas cargados");

      // 5. Obtener el motivo “Ingreso por emergencia critica”
      const MOTIVO_EMERGENCIA_ID = 23;

      // 6. Crear la admisión
      const admision = await Admision.create(
        {
          identidad_medica_id: identidad.id,
          recepcionista_id: recepcionista.id,
          motivo_id: MOTIVO_EMERGENCIA_ID,
          fecha_admision: new Date(),
        },
        { transaction: t }
      );

      // 7. Buscar sala “Emergencias” y una cama disponible
      const salaEmergencias = await Sala.findOne({
        where: { nombre: "Emergencias" },
        transaction: t,
      });
      if (!salaEmergencias) throw new Error("Sala 'Emergencias' no existe");

      // 8. Buscar cualquier cama libre en cualquier habitación de esa sala
      const cama = await Cama.findOne({
        include: [
          {
            model: Habitacion,
            where: { sala_id: salaEmergencias.id },
          },
        ],
        where: { estado: "libre" },
        transaction: t,
      });
      if (!cama) throw new Error("No hay camas libres en Emergencias");

      // 9. Crear la internación y marcar la cama como ocupada
      const nuevaInternacion = await Internacion.create(
        {
          admision_id: admision.id,
          cama_id: cama.id,
          fecha_ingreso: new Date(),
          estado: "En curso",
        },
        { transaction: t }
      );
      cama.estado = "ocupado";
      await cama.save({ transaction: t });

      return { internacion: nuevaInternacion };
    });
    return res.json({ internacion: { id: internacion.id } });
  } catch (err) {
    console.error("Error al registrar emergencia:", err);
    return res.status(500).json({ error: err.message });
  }
}

async function mostrarActualizarDatos(req, res) {
  const { internacionId } = req.params;
  try {
    const internacion = await Internacion.findByPk(internacionId, {
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
                  model: Persona,
                  as: "persona",
                  attributes: [
                    "id",
                    "dni",
                    "nombre",
                    "fecha_nacimiento",
                    "genero",
                    "es_temporal",
                    "telefono",
                    "direccion",
                    "email",
                  ],
                },
                {
                  model: Paciente,
                  as: "paciente",
                  attributes: ["id", "contacto_emergencia", "obra_social_id"],
                  include: [
                    {
                      model: ObraSocial,
                      as: "obra_social",
                      attributes: ["id", "nombre"],
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    });

    if (!internacion) {
      return res
        .status(404)
        .render("error", { error: "Internación no encontrada" });
    }

    const persona = internacion.admision.identidad_medica.persona;
    const paciente = internacion.admision.identidad_medica.paciente;

    // Obtener la lista de recepcionistas
    const recepcionistas = await Recepcionista.findAll({
      include: [
        { model: Persona, as: "persona", attributes: ["id", "nombre"] },
      ],
    });

    // Obtener la lista de motivos de admisión
    const motivos = await AdmisionMotivo.findAll({
      attributes: ["motivo_id", "descripcion"],
    });

    // Obtener la lista de obras sociales

    const obrasSociales = await ObraSocial.findAll({
      attributes: ["id", "nombre"],
    });

    res.render("Internaciones/actualizar-datos", {
      internacionId,
      persona,
      paciente,
      recepcionistas,
      motivos,
      obrasSociales,
      internacion,
    });
  } catch (error) {
    console.error("Error al cargar datos para actualización:", error);
    res
      .status(500)
      .render("error", { error: "Error al cargar datos para actualizar" });
  }
}

async function actualizarDatosEmergencia(req, res) {
  const { internacionId } = req.params;
  const {
    dni,
    nombre,
    fecha_nacimiento,
    genero,
    telefono,
    direccion,
    email,
    recepcionista_id,
    motivo_id,
    contacto_emergencia,
    obra_social_id,
  } = req.body;

  const errorValidacion = validarPersona(req.body);
  if (errorValidacion) {
    console.log("Error de validación:", errorValidacion);
    const obrasSociales = await ObraSocial.findAll();
    const motivos = await AdmisionMotivo.findAll();
    const recepcionistas = await Recepcionista.findAll({
      include: [{ model: Persona, as: "persona" }],
    });
    const internacion = await Internacion.findByPk(internacionId, {
      include: [
        {
          model: Admision,
          as: "admision",
          include: [
            {
              model: IdentidadMedica,
              as: "identidad_medica",
              include: [
                { model: Persona, as: "persona" },
                { model: Paciente, as: "paciente" },
              ],
            },
            {
              model: AdmisionMotivo,
              as: "motivo",
              attributes: ["descripcion"],
            },
          ],
        },
      ],
    });

    return res.status(400).render("Internaciones/actualizar-datos", {
      error: errorValidacion,
      persona: req.body,
      internacionId,
      internacion,
      obrasSociales,
      recepcionistas,
      motivos,
    });
  }
  console.log("Validación completada correctamente.");
  const t = await sequelize.transaction();
  try {
    console.log("Buscando internación:", internacionId);
    const internacion = await Internacion.findByPk(internacionId, {
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
                  model: Persona,
                  as: "persona",
                  attributes: [
                    "id",
                    "dni",
                    "nombre",
                    "fecha_nacimiento",
                    "genero",
                    "es_temporal",
                    "telefono",
                    "direccion",
                    "email",
                  ],
                },
                {
                  model: Paciente,
                  as: "paciente",
                  attributes: ["id", "contacto_emergencia", "obra_social_id"],
                },
              ],
            },
          ],
        },
      ],
      transaction: t,
    });

    if (!internacion) throw new Error("Internación no encontrada");

    const identidad = internacion.admision.identidad_medica;
    if (!identidad) throw new Error("Identidad médica no encontrada");

    const personaActual = identidad.persona;
    if (!personaActual) throw new Error("No se encontró la persona asociada");

    // Buscar si existe ya una persona definitiva con ese DNI
    const personaExistente = await Persona.findOne({
      where: { dni, es_temporal: false },
      transaction: t,
    });

    if (personaExistente) {
      // Vincular la identidad a la persona definitiva
      identidad.persona_id = personaExistente.id;
      await identidad.save({ transaction: t });

      // Si la persona asociada era la temporal, eliminarla
      if (personaActual.id !== personaExistente.id) {
        await Persona.destroy({
          where: { id: personaActual.id },
          transaction: t,
          force: true,
        });
      }
    } else {
      // Actualiza la persona temporal con los nuevos datos y marca definitiva
      personaActual.dni = dni;
      personaActual.nombre = nombre;
      personaActual.fecha_nacimiento = fecha_nacimiento;
      personaActual.genero = genero;
      personaActual.telefono = telefono;
      personaActual.direccion = direccion;
      personaActual.email = email;
      personaActual.es_temporal = false;
      personaActual.observaciones = "Datos actualizados en la emergencia";
      await personaActual.save({ transaction: t });
    }

    // Actualizar datos del paciente: contacto y obra social
    const paciente = identidad.paciente;
    if (paciente) {
      paciente.contacto_emergencia = contacto_emergencia;
      paciente.obra_social_id = obra_social_id;
      await paciente.save({ transaction: t });
    } else {
      throw new Error("Paciente no encontrado asociado a la identidad médica");
    }

    // Actualizar la admisión con recepcionista y motivo
    const admision = internacion.admision;
    if (!admision) throw new Error("Admisión no encontrada");
    admision.recepcionista_id = recepcionista_id;
    admision.motivo_id = motivo_id;
    await admision.save({ transaction: t });

    // ¡Importante! Actualizar la identidad médica para marcarla como definitiva
    identidad.es_temporal = false;
    await identidad.save({ transaction: t });

    await t.commit();
    res.redirect(
      `/internaciones/${internacionId}?msg=Datos actualizados correctamente`
    );
  } catch (err) {
    await t.rollback();
    console.error("Error al actualizar datos de emergencia:", err);
    res.redirect(
      `/internaciones/${internacionId}?err=${encodeURIComponent(err.message)}`
    );
  }
}

module.exports = {
  generarCodigoTemporal,
  registrarEmergencia,
  mostrarActualizarDatos,
  actualizarDatosEmergencia,
};
