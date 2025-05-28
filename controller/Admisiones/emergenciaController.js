const Persona = require("../../models/sequelize/Personas/personas");
const Admision = require("../../models/sequelize/Admisiones/admisiones");
const IdentidadMedica = require("../../models/sequelize/Personas/identidad_medica");
const Paciente = require("../../models/sequelize/Pacientes/pacientes");
const Recepcionista = require("../../models/sequelize/Personas/recepcionistas");
const Sala = require("../../models/sequelize/Camas/salas");
const Internacion = require("../../models/sequelize/Internacion/internaciones");
const Cama = require("../../models/sequelize/Camas/camas");
const Habitacion = require("../../models/sequelize/Camas/habitaciones");
const sequelize = require("../../config/db");

function generarCodigoTemporal() {
  return "TEMP-" + Math.random().toString(36).substr(2, 9).toUpperCase();
}
async function registrarEmergencia(req, res) {
  try {
    const { internacion } = await sequelize.transaction(async (t) => {
      // 1.Crear identidad médica temporal
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
      await Paciente.findOrCreate({
        where: { identidad_medica_id: identidad.id },
        defaults: { identidad_medica_id: identidad.id },
        transaction: t,
      });

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

      // 2) Busca cualquier cama libre en cualquier habitación de esa sala
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

      // 8. Crear la internación y marcar cama ocupada
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
module.exports = {
  generarCodigoTemporal,
  registrarEmergencia,
};
