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
            calcularValorCertificado() ;
    } else {
        valorMatriculaPropietario = 0; // Si no aplica, el valor será 0
    }

    // Mostrar resultados en el modal
    mostrarResultadoModal(valorVentaEstablecimiento);
});

function mostrarResultadoModal(valorVentaEstablecimiento) {
    const resultado = document.getElementById("resultado");

    // Total calculado
    const totalCompraventa =
        valorImpuestoRegistro +
        valorRetencionDIAN +
        valorIngresoDocumento +
        valorMatriculaPropietario;

    // Insertar contenido dinámico
    resultado.innerHTML = `
        <div class="text-center">
            <!-- Encabezado -->
            <div class="mb-4">
                <strong class="fs-4 text-primary">TOTAL A PAGAR</strong><br>
                <span class="fs-2 text-success fw-bold">
                    ${formatoMonedaColombia(totalCompraventa)}
                </span>
            </div>

            <!-- Valor de la Venta -->
            <div class="mb-4">
                <strong class="fs-5 text-secondary">VALOR DE LA VENTA</strong><br>
                <span class="fs-4 fw-bold">
                    ${formatoMonedaColombia(valorVentaEstablecimiento)}
                </span>
            </div>

            <!-- Detalles por Entidad -->
            <div>
                <!-- Gobernación -->
                <div class="mb-3">
                    <strong class="text-primary">Gobernación</strong>
                    <table class="table table-sm table-bordered">
                        <tbody>
                            <tr>
                                <td>Impuesto de Registro</td>
                                <td class="text-end">${formatoMonedaColombia(valorImpuestoRegistro)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- DIAN -->
                <div class="mb-3">
                    <strong class="text-primary">DIAN</strong>
                    <table class="table table-sm table-bordered">
                        <tbody>
                            <tr>
                                <td>Retención 1% del Valor de la Venta</td>
                                <td class="text-end">${formatoMonedaColombia(valorRetencionDIAN)}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <!-- Cámara de Comercio -->
                <div class="mb-3">
                    <strong class="text-primary">Cámara de Comercio</strong>
                    <table class="table table-sm table-bordered">
                        <tbody>
                            <tr>
                                <td>Inscripción del Documento</td>
                                <td class="text-end">${formatoMonedaColombia(valorIngresoDocumento)}</td>
                            </tr>
                            ${
                                matricularPropietario === "SI"
                                    ? `<tr>
                                        <td>Matrícula del Comprador (Incluye Certificado)</td>
                                        <td class="text-end">${formatoMonedaColombia(valorMatriculaPropietario)}</td>
                                    </tr>`
                                    : ""
                            }
                        </tbody>
                    </table>
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
