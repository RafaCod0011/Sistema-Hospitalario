/* eslint-env browser */
/* global document, window */

document.addEventListener("DOMContentLoaded", () => {
  const salaSelect = document.getElementById("select-sala");
  const habitacionSelect = document.getElementById("select-habitacion");
  const camaSelect = document.getElementById("select-cama");

  salaSelect.addEventListener("change", async () => {
    const salaId = salaSelect.value;
    habitacionSelect.innerHTML =
      '<option value="">-- Primero seleccione Sala --</option>';
    camaSelect.innerHTML =
      '<option value="">-- Primero seleccione Habitación --</option>';
    camaSelect.disabled = true;
    if (!salaId) {
      habitacionSelect.disabled = true;
      return;
    }

    try {
      const res = await fetch(`/admisiones/habitaciones?salaId=${salaId}`);
      const habitaciones = await res.json();
      habitaciones.forEach((h) => {
        const opt = document.createElement("option");
        opt.value = h.id;
        opt.textContent = h.numero;
        habitacionSelect.appendChild(opt);
      });
      habitacionSelect.disabled = false;
    } catch (err) {
      console.error("Error al cargar habitaciones:", err);
    }
  });

  habitacionSelect.addEventListener("change", async () => {
    const habitacionId = habitacionSelect.value;
    camaSelect.innerHTML =
      '<option value="">-- Primero seleccione Habitación --</option>';
    if (!habitacionId) {
      camaSelect.disabled = true;
      return;
    }

    try {
      const res = await fetch(
        `/admisiones/camas?habitacionId=${habitacionId}&personaGenero=${window.PERSONA_GENERO}`
      );
      const camas = await res.json();
      if (!camas.length) {
        camaSelect.disabled = true;
        return;
      }
      camas.forEach((cama) => {
        const opt = document.createElement("option");
        opt.value = cama.id;
        opt.textContent = `Cama ${cama.numero_en_habitacion}`;
        camaSelect.appendChild(opt);
      });
      camaSelect.disabled = false;
    } catch (err) {
      console.error("Error al cargar camas:", err);
    }
  });
});
