/* eslint-env browser */
/* global document, window */

document.addEventListener("DOMContentLoaded", function () {
  console.log("Script de búsqueda DNI ejecutado.");

  // Función para bloquear (lock) los campos de Datos de Persona:
  function lockPersonaFields() {
    document.getElementById("nombre").setAttribute("readonly", true);
    document.getElementById("fecha_nacimiento").setAttribute("readonly", true);
    document.getElementById("genero").setAttribute("disabled", true);
    document.getElementById("telefono").setAttribute("readonly", true);
    document.getElementById("direccion").setAttribute("readonly", true);
    document.getElementById("email").setAttribute("readonly", true);
    document.getElementById("confirm_email").setAttribute("readonly", true);
    // Mostrar el botón de editar para que el usuario pueda desbloquear los campos
    document.getElementById("editarPersona").style.display = "block";
  }
  // Función para desbloquear los campos de Datos de Persona:
  function unlockPersonaFields() {
    document.getElementById("nombre").removeAttribute("readonly");
    document.getElementById("fecha_nacimiento").removeAttribute("readonly");
    document.getElementById("genero").removeAttribute("disabled");
    document.getElementById("telefono").removeAttribute("readonly");
    document.getElementById("direccion").removeAttribute("readonly");
    document.getElementById("email").removeAttribute("readonly");
    document.getElementById("confirm_email").removeAttribute("readonly");
    // Ocultar el botón de editar
    document.getElementById("editarPersona").style.display = "none";
  }

  // Verifica que los elementos existan antes de agregar event listeners
  const btnEditar = document.getElementById("editarPersona");
  const btnBuscar = document.getElementById("buscarDNI");

  if (btnEditar) {
    btnEditar.addEventListener("click", function () {
      unlockPersonaFields();
    });
  } else {
    console.warn("No se encontró el botón 'editarPersona'");
  }

  if (btnBuscar) {
    btnBuscar.addEventListener("click", function () {
      const dniValue = document.getElementById("dni").value.trim();
      if (!dniValue) {
        window.alert("Por favor ingresa un DNI.");
        return;
      }
      fetch(`/persona/buscar?dni=${dniValue}`)
        .then((response) => response.json())
        .then((data) => {
          if (data.found) {
            const fetchedPersona = data.persona;
            // Rellenar la sección de "Datos de Persona"
            document.getElementById("nombre").value = fetchedPersona.nombre;
            document.getElementById("fecha_nacimiento").value =
              fetchedPersona.fecha_nacimiento
                ? new Date(fetchedPersona.fecha_nacimiento)
                    .toISOString()
                    .substring(0, 10)
                : "";
            document.getElementById("genero").value = fetchedPersona.genero;
            document.getElementById("telefono").value =
              fetchedPersona.telefono || "";
            document.getElementById("direccion").value =
              fetchedPersona.direccion || "";
            document.getElementById("email").value = fetchedPersona.email || "";
            document.getElementById("confirm_email").value =
              fetchedPersona.email || "";
            // Bloquear los campos de Datos de Persona si se encontró la persona
            lockPersonaFields();
          } else {
            window.alert(
              "No existe una persona definitiva con ese DNI. Completa el resto de los datos."
            );
            // Desbloquear los campos para permitir la llenada manual
            unlockPersonaFields();
            document.getElementById("nombre").value = "";
            document.getElementById("fecha_nacimiento").value = "";
            document.getElementById("genero").value = "";
            document.getElementById("telefono").value = "";
            document.getElementById("direccion").value = "";
            document.getElementById("email").value = "";
            document.getElementById("confirm_email").value = "";
          }
        })
        .catch((err) => {
          console.error("Error en la búsqueda por DNI:", err);
          window.alert("Error al buscar la persona. Intenta de nuevo.");
        });
    });
  } else {
    console.warn("No se encontró el botón 'buscarDNI'");
  }
});
