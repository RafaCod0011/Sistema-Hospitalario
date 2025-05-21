// Modelos
const Usuario = require("./Usuarios/usuario");
const Rol = require("./Usuarios/rol");
const UsuarioRol = require("./Usuarios/usuario_rol");
const IdentidadMedica = require("./Personas/identidad_medica");
const Paciente = require("./Pacientes/pacientes");
const ObraSocial = require("./Pacientes/obra_social");
const Profesionales = require("./Personas/profesionales");
const Recepcionistas = require("./Personas/recepcionistas");
const Persona = require("./Personas/personas");

// Asociaciones
Usuario.associate({ Rol });
Rol.associate({ Usuario });
UsuarioRol.associate({ Usuario, Rol });
IdentidadMedica.associate({ Paciente });
Paciente.associate({ IdentidadMedica, ObraSocial });
Persona.associate({
  IdentidadMedica,
  Recepcionistas,
  Profesionales,
});

module.exports = {
  Usuario,
  Rol,
  UsuarioRol,
  IdentidadMedica,
  Paciente,
  Persona,
};
