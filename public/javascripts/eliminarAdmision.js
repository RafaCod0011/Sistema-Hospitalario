/* eslint-env browser */
/* global window, Swal */

function confirmarEliminacion(btn, admisionId) {
  Swal.fire({
    title: "¿Eliminar admisión?",
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#d33",
    cancelButtonColor: "#3085d6",
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      fetch(`/admisiones/${admisionId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            const fila = btn.closest("tr");
            if (fila) fila.remove();
            Swal.fire("Eliminado", data.message, "success");
          } else {
            Swal.fire("Error", data.error, "error");
          }
        })
        .catch(() => {
          Swal.fire("Error", "No se pudo eliminar la admisión", "error");
        });
    }
  });
}

window.confirmarEliminacion = confirmarEliminacion;
