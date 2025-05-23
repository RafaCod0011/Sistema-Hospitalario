const Profesional = require("../../models/sequelize/Personas/profesionales");
const Especialidad = require("../../models/sequelize/Personas/especialidad");
const Recepcionista = require("../../models/sequelize/Personas/recepcionistas");
const Persona = require("../../models/sequelize/Personas/personas");

function validarMedico({ persona_id, matricula, tipo, especialidad }) {
  const regexMatricula = /^[A-Za-z0-9]{5,10}$/;

  if (!persona_id || !matricula || !tipo || !especialidad) {
    return "Todos los campos son obligatorios";
  }

  if (!regexMatricula.test(matricula)) {
    return "La matrícula debe tener entre 5 y 10 caracteres alfanuméricos";
  }

  return null;
}
async function crear(req, res) {
  const { persona_id, matricula, tipo, especialidad } = req.body;
  const errorValidacion = validarMedico({
    persona_id,
    matricula,
    tipo,
    especialidad,
  });
  if (errorValidacion) {
    const especialidades = await Especialidad.findAll();
    const persona = await Persona.findByPk(persona_id);

    return res.status(400).render("Profesional/registro", {
      error: errorValidacion,
      values: {
        persona_id,
        nombre: persona.nombre,
        matricula,
        tipo,
        especialidad,
      },
      persona: { id: persona_id, nombre: persona.nombre },
      especialidades,
    });
  }

  try {
    const recepcionistaExistente = await Recepcionista.findOne({
      where: { persona_id },
    });
    if (recepcionistaExistente) {
      const especialidades = await Especialidad.findAll();
      const persona = await Persona.findByPk(persona_id);
      return res.status(400).render("Profesional/registro", {
        error:
          "Esta persona ya está registrada como recepcionista, por lo que no puede asignarse como profesional.",
        values: {
          persona_id,
          matricula,
          tipo,
          especialidad,
          nombre: persona.nombre,
        },
        persona: { id: persona_id, nombre: persona.nombre },
        especialidades,
      });
    }
    const existe = await Profesional.findOne({ where: { matricula } });
    if (existe) {
      const especialidades = await Especialidad.findAll();
      const persona = await Persona.findByPk(persona_id);
      return res.status(400).render("Profesional/registro", {
        error: "El médico ya existe en el sistema",
        values: {
          persona_id,
          matricula,
          tipo,
          especialidad,
          nombre: persona.nombre,
        },
        persona: { id: persona_id, nombre: persona.nombre },
        especialidades,
      });
    }

    await Profesional.create({
      matricula,
      profesional_salud: tipo,
      persona_id,
      especialidad_id: especialidad,
    });

    return res.redirect("/profesional/listar");
  } catch (err) {
    console.error("Error al crear el médico:", err);
    const especialidades = await Especialidad.findAll();
    return res.status(500).render("Profesional/registro", {
      error: "Error interno al crear el médico",
      values: { matricula, tipo, especialidad, persona_id },
      persona: { id: persona_id, nombre: req.body.persona_nombre },
      especialidades,
    });
  }
}

async function formulario(req, res) {
  const dni = req.body?.dni || req.params?.dni;
  try {
    let persona = null;
    if (dni) {
      persona = await Persona.findOne({ where: { dni } });
    }
    const especialidades = await Especialidad.findAll();
    res.render("Profesional/registro", { persona, especialidades });
  } catch (error) {
    console.error("Error al obtener datos para el formulario", error);
    res.status(500).send("Error al obtener datos para el formulario");
  }
}

async function formularioBusqueda(req, res) {
  res.render("Profesional/buscar");
}

async function listar(req, res) {
  try {
    const profesionales = await Profesional.findAll({
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
    console.log(profesionales);
    res.render("Profesional/listado", { profesionales });
  } catch (error) {
    console.error("Error al listar los medicos:", error);
    res.status(500).render("Profesional/listado", {
      error: "Error al listar los medicos",
    });
  }
}
module.exports = {
  formulario,
  crear,
  formularioBusqueda,
  listar,
};
