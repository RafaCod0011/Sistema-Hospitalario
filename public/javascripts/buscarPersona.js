/* eslint-env browser */
/* global Swal,window,document */

document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#form-buscar-dni");
  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const dni = form.dni.value.trim();
    if (!dni) {
      return Swal.fire("Error", "Ingrese un DNI válido.", "error");
    }

    try {
      const response = await fetch(form.action, {
        method: form.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ dni }),
      });
      const data = await response.json();

      if (data.found) {
        // Redirige al formulario de nueva admisión
        window.location.href = `/admisiones/nueva/${data.personaId}`;
      } else {
        // No encontró: pregunta registrar o reintentar
        const result = await Swal.fire({
          title: "Persona no encontrada",
          text: `No hay registro con DNI ${dni}. ¿Desea registrarla?`,
          icon: "question",
          showCancelButton: true,
          confirmButtonText: "Sí, registrar",
          cancelButtonText: "Reintentar",
        });

        if (result.isConfirmed) {
          window.location.href = `/persona/nuevo?dni=${dni}`;
        } else {
          form.dni.value = "";
          form.dni.focus();
        }
      }
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Ocurrió un error al buscar la persona.", "error");
    }
  });
});
