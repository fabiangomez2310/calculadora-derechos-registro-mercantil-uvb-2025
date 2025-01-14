import {
    calcularValorImpuestoRegistroCuantia,
    calcularRegistroYRenovacionDeLaMatriculaMercantil,
    calcularValorInscripcionDocumento,
    calcularValorFormularioRues,
    calcularValorCertificado
} from "./calculosUVB.js";

import { formatoMonedaColombia } from "./utilidades.js";

let ventaEstablecimiento;
let matricularPropietario;

let valorImpuestoRegistro, valorRetencionDIAN, valorMatriculaPropietario, valorIngresoDocumento;

const btnCompraventa = document.getElementById("calcular-compraventa");

btnCompraventa.addEventListener("click", () => {
    // Obtener los valores de entrada
    ventaEstablecimiento = document.getElementById("valor-venta-establecimiento").value;
    matricularPropietario = document.getElementById("matricular-propietario").value;

    const valorVentaEstablecimiento = Number(ventaEstablecimiento);

    // Calcular valores
    valorImpuestoRegistro = calcularValorImpuestoRegistroCuantia(valorVentaEstablecimiento);
    valorRetencionDIAN = calcularRetencionDIAN(valorVentaEstablecimiento);
    valorIngresoDocumento = calcularValorInscripcionDocumento();

    if (matricularPropietario === "SI") {
        valorMatriculaPropietario = 
            calcularRegistroYRenovacionDeLaMatriculaMercantil(valorVentaEstablecimiento) + 
            calcularValorFormularioRues() +
            calcularValorCertificado("EST") ;
    } else {
        valorMatriculaPropietario = 0; // Si no aplica, el valor será 0
    }

    // Mostrar resultados en el modal
    mostrarResultadoModal(valorVentaEstablecimiento);
});

function mostrarResultadoModal(valorVentaEstablecimiento) {
    const resultado = document.getElementById("resultado");

    // Total por Entidad
    const totalCamaraComercio = valorIngresoDocumento + (matricularPropietario === "SI" ? valorMatriculaPropietario : 0);

    // Total general
    const totalCompraventa =
        valorImpuestoRegistro +
        valorRetencionDIAN +
        totalCamaraComercio;

    // Insertar contenido dinámico
    resultado.innerHTML = `
        <div class="text-center">
            <!-- Total a Pagar -->
            <div class="mt-4">
                <strong class="display-5 text-primary">Total a Pagar:</strong><br>
                <span class="display-4 text-success font-weight-bold">
                    ${formatoMonedaColombia(totalCompraventa)}
                </span>
            </div>

            <!-- Valor de la Venta -->
            <div class="mt-4">
                <strong class="h5 text-primary">Valor de la Venta:</strong>
                <span class="h5 text-dark">
                    ${formatoMonedaColombia(valorVentaEstablecimiento)}
                </span>
            </div>

            <!-- Detalles por Entidad -->
            <div class="mt-4">
                <!-- Gobernación -->
                <div class="mt-3">
                    <strong class="display-6 text-primary">Gobernación:</strong>
                    <ul class="list-unstyled">
                        <li><strong>Impuesto de Registro</strong>: ${formatoMonedaColombia(valorImpuestoRegistro)}</li>
                    </ul>
                </div>

                <!-- DIAN -->
                <div class="mt-3">
                    <strong class="display-6 text-primary">DIAN:</strong>
                    <ul class="list-unstyled">
                        <li><strong>Retención (1% del Valor de la Venta)</strong>: ${formatoMonedaColombia(valorRetencionDIAN)}</li>
                    </ul>
                </div>

                <!-- Cámara de Comercio -->
                <div class="mt-3">
                    <strong class="display-6 text-primary">Cámara de Comercio:</strong>
                    <ul class="list-unstyled">
                        <li><strong>Inscripción del Documento</strong>: ${formatoMonedaColombia(valorIngresoDocumento)}</li>
                        ${
                            matricularPropietario === "SI"
                                ? `<li><strong>Matrícula del Comprador (Incluye Certificado)</strong>: ${formatoMonedaColombia(valorMatriculaPropietario)}</li>`
                                : ""
                        }
                    </ul>
                    <div class="mt-2">
                        <strong>Total Cámara de Comercio:</strong> 
                        <span class="text-success fw-bold">
                            ${formatoMonedaColombia(totalCamaraComercio)}
                        </span>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Mostrar el modal
    const myModal = new bootstrap.Modal(document.getElementById("resultadoModal"));
    myModal.show();
}


// Calcular retención DIAN (1%)
function calcularRetencionDIAN(valorVentaEstablecimiento) {
    return valorVentaEstablecimiento * 0.01; // 1%
}
