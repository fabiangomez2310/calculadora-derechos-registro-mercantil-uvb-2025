import {
    calcularRegistroYRenovacionDeLaMatriculaMercantil,
    calcularRenovacionEstablecimientoMismaJurisdiccion,
    calcularRenovacionEstablecimientoDiferenteJurisdiccion,
    calcularValorFormularioRues,
    calcularValorCertificado
} from "./calculosUVB.js";

import { formatoMonedaColombia } from "./utilidades.js";

// Variables globales para los resultados
let tarifaRenovacionPropietario,
  tarifaRenovacionEstablecimientosMisma,
  tarifaRenovacionEstablecimientosDiferente;

let valorFormularioRues, valorCertificado, totalRenovacion, totalPagar;

let activos, establecimientosMisma, establecimientosDiferente;

let inscritaCucuta, tipoPersona;

// Evento para calcular renovación
const btnRenovacion = document.getElementById("calcular-renovacion");
btnRenovacion.addEventListener("click", () => {

  activos = document.getElementById("activos-input").value;
  establecimientosMisma = document.getElementById("establecimientos-dentro").value;
  establecimientosDiferente = document.getElementById("establecimientos-fuera").value;
  tipoPersona = document.getElementById("tipoPersona").value;
  inscritaCucuta = document.getElementById("inscritaCucuta").value;

  const resultado = document.getElementById("renovacion-resultado");


  // Validar que todos los campos estén llenos y sean números válidos
  if (
    !activos ||
    !establecimientosMisma ||
    !establecimientosDiferente ||
    isNaN(activos) ||
    isNaN(establecimientosMisma) ||
    isNaN(establecimientosDiferente)
  ) {
    resultado.textContent =
      "Por favor, complete todos los campos con valores válidos.";
    return;
  }

  // Convertir valores a números
  const valorActivos = Number(activos);
  const cantidadMisma = Number(establecimientosMisma);
  const cantidadDiferente = Number(establecimientosDiferente);

  tarifaRenovacionPropietario = calcularRegistroYRenovacionDeLaMatriculaMercantil(valorActivos);
  tarifaRenovacionEstablecimientosMisma = calcularRenovacionEstablecimientoMismaJurisdiccion(valorActivos) * cantidadMisma;
  tarifaRenovacionEstablecimientosDiferente = calcularRenovacionEstablecimientoDiferenteJurisdiccion(valorActivos) * cantidadDiferente;
  valorFormularioRues = calcularValorFormularioRues();
  valorCertificado = calcularValorCertificado(tipoPersona);



totalRenovacion =
    tarifaRenovacionPropietario +
    tarifaRenovacionEstablecimientosMisma +
    tarifaRenovacionEstablecimientosDiferente;

totalPagar = 
    totalRenovacion + 
    valorFormularioRues +
    valorCertificado;

  mostrarResultadoModal();

});

// Función para mostrar los resultados en el modal
function mostrarResultadoModal() {

  const resultado = document.getElementById("resultado");

  // temporal

  let porcentajePagado = totalRenovacion*100/activos;

  // Aquí insertamos el contenido dinámico en el modal
  resultado.innerHTML = `
          <div class="text-center">

              <!-- Total Renovación -->
              <div class="mt-4">
                  <strong class="display-5 text-primary">Total a pagar Renovación 2025:</strong><br>
                  <span class="display-4 text-success font-weight-bold">
                      ${formatoMonedaColombia(totalPagar)}
                  </span>
              </div>

              <!-- Activos Declarados -->
              <div class="mt-4">
                  <strong class="h5 text-primary">Activos Declarados:</strong>
                  <span class="h5 text-dark">${formatoMonedaColombia(activos)}</span>
              </div>

              <!-- Porcentaje Pagado -->
              <div class="mt-4">
                  <strong class="h5 text-primary">% Pagado:</strong>
                  <span class="h5 text-success">${porcentajePagado.toFixed(2)}%</span>
                  <small class="text-muted">(en relación con los activos)</small>
              </div>

              <!-- Renovación Propietario -->
              <div class="mt-4">
                  <strong class="h5 text-muted">Renovación Propietario:</strong>
                  <span class="h5 text-success">${formatoMonedaColombia(tarifaRenovacionPropietario)}</span>
              </div>

              <!-- Renovación Establecimientos -->
              <div class="mt-4 text-left">
                  <strong class="h5 text-muted">Renovación Establecimientos:</strong>
                  <div class="ml-4 mt-2">
                      <p class="h6 mb-2">
                          <i class="fas fa-store text-primary"></i>
                          ${establecimientosMisma} en misma jurisdicción: 
                          <span class="text-success">${formatoMonedaColombia(tarifaRenovacionEstablecimientosMisma)}</span>
                      </p>
                      <p class="h6">
                          <i class="fas fa-map-marker-alt text-primary"></i>
                          ${establecimientosDiferente} en otra jurisdicción: 
                          <span class="text-success">${formatoMonedaColombia(tarifaRenovacionEstablecimientosDiferente)}</span>
                      </p>
                  </div>
              </div>

              <!-- Formulario RUES -->
              <div class="mt-4">
                  <strong class="h5 text-muted">Formulario RUES:</strong>
                  <span class="h5 text-success">${formatoMonedaColombia(valorFormularioRues)}</span>
              </div>

              <!-- Certificado -->
              <div class="mt-4">
                  <strong class="h5 text-muted">Certificado:</strong>
                  <span class="h5 text-success">${formatoMonedaColombia(valorCertificado)}</span>
              </div>

          </div>
        `;

      // Mostrar el modal
      var myModal = new bootstrap.Modal(document.getElementById("resultadoModal"));
      myModal.show();
}












