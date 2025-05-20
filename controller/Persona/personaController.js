const Persona = require("../../models/sequelize/Personas/personas");

async function crear(req, res) {
  const persona = req.body;

  // Expresiones regulares
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
    return res.status(400).render("Registro/registro", {
      error: "Formato de email inválido",
      values: persona,
    });
  }

  if (persona.email !== persona.confirmarEmail) {
    return res.status(400).render("Registro/registro", {
      error: "Los emails no coinciden",
      values: persona,
    });
  }

  if (!regex.dni.test(persona.dni)) {
    return res.status(400).render("Registro/registro", {
      error: "DNI debe contener solo números (7 u 8 dígitos)",
      values: persona,
    });
  }

  if (!regex.telefono.test(persona.telefono)) {
    return res.status(400).render("Registro/registro", {
      error: "Formato de teléfono inválido",
      values: persona,
    });
  }

  const añoMinimo = 1900;

  const fechaNacimiento = new Date(persona.fecha_nacimiento);
  if (isNaN(fechaNacimiento.getTime())) {
    return res.status(400).render("Registro/registro", {
      error: "Fecha de nacimiento inválida",
      values: persona,
    });
  }

  if (fechaNacimiento.getFullYear() < añoMinimo) {
    return res.status(400).render("Registro/registro", {
      error: `La fecha de nacimiento no puede ser anterior a ${añoMinimo}`,
      values: persona,
    });
  }

  const hoy = new Date();
  if (fechaNacimiento > hoy) {
    return res.status(400).render("Registro/registro", {
      error: "La fecha de nacimiento no puede ser futura",
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

    await Persona.create({
      ...persona,
      fecha_nacimiento: fechaNacimiento.toISOString().split("T")[0], // Formato YYYY-MM-DD
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

async function listar(req, res) {
  try {
    const personas = await Persona.findAll();
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

module.exports = {
  crear,
  listar,
  formulario,
};
