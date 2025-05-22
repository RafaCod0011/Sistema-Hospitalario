const Persona = require("../../models/sequelize/Personas/personas");

function validarPersona(persona, res) {
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
  ];

  if (camposRequeridos.some((campo) => !persona[campo])) {
    return res.status(400).render("Registro/registro", {
      error: "Todos los campos son obligatorios",
      values: persona,
    });
  }

  if (!regex.email.test(persona.email)) {
    return { error: "Formato de email inválido" };
  }

  if (persona.email !== persona.confirmarEmail) {
    return { error: "Los emails no coinciden" };
  }

  if (!regex.dni.test(persona.dni)) {
    return { error: "DNI debe contener solo números (7 u 8 dígitos)" };
  }

  if (!regex.telefono.test(persona.telefono)) {
    return { error: "Formato de teléfono inválido" };
  }

  const añoMinimo = 1900;
  const fechaNacimiento = new Date(persona.fecha_nacimiento);

  if (isNaN(fechaNacimiento.getTime())) {
    return { error: "Fecha de nacimiento inválida" };
  }

  if (fechaNacimiento.getFullYear() < añoMinimo) {
    return {
      error: `La fecha de nacimiento no puede ser anterior a ${añoMinimo}`,
    };
  }

  const hoy = new Date();
  if (fechaNacimiento > hoy) {
    return { error: "La fecha de nacimiento no puede ser futura" };
  }

  return null;
}

async function crear(req, res) {
  const persona = req.body;

  const errorValidacion = validarPersona(persona, true);
  if (errorValidacion) {
    return res.status(400).render("Registro/registro", {
      error: errorValidacion.error,
      values: persona,
    });
  }

  try {
    const personaExistente = await Persona.findOne({
      where: { dni: persona.dni },
    });
    if (personaExistente) {
      return res.status(400).render("Registro/registro", {
        error: "La persona ya existe en el sistema",
        values: persona,
      });
    }

    // Crear la persona
    await Persona.create({
      ...persona,
      fecha_nacimiento: new Date(persona.fecha_nacimiento)
        .toISOString()
        .split("T")[0],
    });

    res.redirect("/persona/listar");
  } catch (error) {
    console.error("Error al crear persona:", error);
    res.status(500).render("Registro/registro", {
      error: "Error interno al crear la persona",
      values: persona,
    });
  }
}

async function actualizar(req, res) {
  const { id } = req.params;
  const persona = req.body;

  const errorValidacion = validarPersona(persona, res);
  if (errorValidacion) {
    return res.status(400).render("Registro/registro", {
      error: errorValidacion.error,
      values: persona,
    });
  }

  try {
    const personaExistente = await Persona.findOne({
      where: { dni: persona.dni },
    });
    if (personaExistente && personaExistente.id !== parseInt(id)) {
      return res.status(400).render("Registro/registro", {
        error: "El DNI ya está registrado en otra persona",
        values: persona,
      });
    }

    // Actualizar la persona
    await Persona.update(
      {
        ...persona,
        fecha_nacimiento: new Date(persona.fecha_nacimiento)
          .toISOString()
          .split("T")[0],
      },
      { where: { id } }
    );

    res.redirect("/persona/listar");
  } catch (error) {
    console.error("Error al actualizar persona:", error);
    res.status(500).render("Registro/registro", {
      error: "Error interno al actualizar la persona",
      values: persona,
    });
  }
}

async function listar(req, res) {
  try {
    const personas = await Persona.findAll({});
    res.render("Registro/listado", { personas });
  } catch (error) {
    console.log(error);
    res.status(500).render("Registro/listado", {
      error: "Error al listar las personas",
    });
  }
}

async function formulario(req, res) {
  res.render("Registro/registro");
}

async function formularioEditar(req, res) {
  try {
    const { id } = req.params;
    const persona = await Persona.findByPk(id);

    if (!persona) {
      return res.redirect("/persona/listar");
    }

    res.render("Registro/registro", {
      values: persona,
      editar: true, // Indica que está en modo edición
    });
  } catch (error) {
    console.error("Error al cargar edición:", error);
    res.redirect("/persona/listar");
  }
}
module.exports = {
  crear,
  listar,
  formulario,
  actualizar,
  formularioEditar,
};
