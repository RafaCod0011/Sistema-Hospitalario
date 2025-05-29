/* eslint-env browser */
/* global document, window, Swal */

function initRegistroEmergencia() {
  document.querySelectorAll(".emergencia-link").forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();

      const { value: confirm } = await Swal.fire({
        title: "¿Estás seguro?",
        text: "Estás a punto de registrar un ingreso por emergencia.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, registrar",
        cancelButtonText: "Cancelar",
      });

      if (!confirm) {
        return;
      }

      try {
        const tokenMeta = document.querySelector('meta[name="csrf-token"]');
        const csrfToken = tokenMeta ? tokenMeta.getAttribute("content") : "";

        const response = await fetch("/emergencias", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-CSRF-Token": csrfToken,
          },
          body: JSON.stringify({}),
        });

        if (!response.ok) {
          const err = await response.json();
          throw new Error(err.error || "Error al registrar emergencia");
        }

        const data = await response.json();

        await Swal.fire({
          title: "¡Hecho!",
          text: "La emergencia se registró correctamente.",
          icon: "success",
          confirmButtonText: "Continuar",
        });

        window.location.href = `/internaciones/${data.internacion.id}`;
      } catch (err) {
        Swal.fire({
          title: "Error",
          text: err.message,
          icon: "error",
        });
      }
    });
  });
}

globalThis.initRegistroEmergencia = initRegistroEmergencia;
