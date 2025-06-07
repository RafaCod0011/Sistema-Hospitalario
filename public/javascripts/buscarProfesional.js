/* eslint-env browser */
/* global Swal,window,document, */

document.addEventListener("DOMContentLoaded", () => {
  const errorAlert = document.querySelector(".alert-danger");

  if (errorAlert) {
    const dni = document.getElementById("dni").value;

    Swal.fire({
      title: "Persona no encontrada",
      text: `DNI: ${dni}. ${errorAlert.textContent}`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Registrar nueva persona",
      cancelButtonText: "Reintentar",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "/persona/nuevo";
      }
    });
  }
});
