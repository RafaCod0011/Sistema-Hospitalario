console.log("Iniciando asociaciones en index.js");

// Modelos
const Usuario = require("./Usuarios/usuario");
const Rol = require("./Usuarios/rol");
const UsuarioRol = require("./Usuarios/usuario_rol");
const IdentidadMedica = require("./Personas/identidad_medica");
const Paciente = require("./Pacientes/pacientes");
const ObraSocial = require("./Pacientes/obra_social");
const Profesional = require("./Personas/profesionales");
const Recepcionista = require("./Personas/recepcionistas");
const Persona = require("./Personas/personas");
const Especialidad = require("./Personas/especialidad");
const Admision = require("./Admisiones/admisiones");
const AdmisionesMotivo = require("./Admisiones/admisiones_motivo");
const Internacion = require("./Internacion/internaciones");

// Asociaciones
const models = {
  Persona,
  Profesional,
  Recepcionista,
  IdentidadMedica,
  Especialidad,
  Usuario,
  Rol,
  UsuarioRol,
  Paciente,
  ObraSocial,
  Admision,
  AdmisionesMotivo,
  Internacion,
};

// Ejecutar asociaciones
Object.values(models)
  .filter((model) => typeof model.associate === "function")
  .forEach((model) => model.associate(models));

console.log("Asociaciones en Profesional:", Profesional.associations);
console.log("Asociaciones en Persona:", Persona.associations);

module.exports = { ...models };
