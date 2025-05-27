function initRegistroEmergencia() {
  const { document, window } = globalThis;
  document.querySelectorAll(".emergencia-link").forEach((link) => {
    link.addEventListener("click", async (e) => {
      e.preventDefault();
      if (
        !window.confirm(
          "Está a punto de registrar un ingreso por emergencia, ¿está seguro?"
        )
      ) {
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

        window.alert("¡Emergencia registrada correctamente!");
        const data = await response.json();
        window.location.href = `/internaciones/${data.internacion.id}`;
      } catch (err) {
        window.alert(err.message);
      }
    });
  });
}

globalThis.initRegistroEmergencia = initRegistroEmergencia;
