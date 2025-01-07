import { 
    calcularValorInscripcionDocumento, // para constitucion, situacion control, aporte establecimiento
   
    calcularRegistroYRenovacionDeLaMatriculaMercantil, 
    calcularRenovacionEstablecimientoMismaJurisdiccion, 

    calcularValorFormularioRues, 

    calcularValorImpuestoRegistroCuantia,
    calcularValorImpuestoRegistroSinCuantia
} from "./calculosUVB.js";

import { formatoMonedaColombia } from "./utilidades.js";

// Definición de las variables
let capitalSuscrito, capitalPagado, numeroAccionistas;
let aporteEstablecimiento, matriculaEstablecimiento;
let tarifaMatriculaPJ, tarifaMatriculaEstablecimiento = 0, tarifaConstitucion, tarifaUnicoAccionista = 0, tarifaFormularioRues, tarifaAporteEstablecimiento = 0; 
let tarifaImpuestoDeRegistroCuantia, tarifaImpuestoRegistroSinCuantia = 0;

// Evento para calcular la constitución
const btnConstitucion = document.getElementById("calcular-constitucion");
const resultado = document.getElementById("constitucion-resultado"); // Elemento para mostrar los resultados

btnConstitucion.addEventListener("click", () => {



    capitalSuscrito = document.getElementById("capital-suscrito").value;
    capitalPagado = document.getElementById("capital-pagado").value;
    numeroAccionistas = document.getElementById("numero-accionistas").value;
    aporteEstablecimiento = document.getElementById("aporte-establecimiento").value;
    matriculaEstablecimiento = document.getElementById("matricula-establecimiento").value;


    console.log("Capturado: "+numeroAccionistas)

    if (
        !capitalSuscrito ||
        !capitalPagado ||
        !numeroAccionistas ||
        !aporteEstablecimiento ||
        !matriculaEstablecimiento
    ) {
        resultado.textContent = "Por favor, complete los campos con valores válidos.";
        return;
    }

    // Convertir valores a números
    const valorCapSuscrito = Number(capitalSuscrito);
    const valorCapPagado = Number(capitalPagado);
    const valorNumAccionistas = Number(numeroAccionistas);

    // Validar si los valores son numéricos
    if (isNaN(valorCapSuscrito) || isNaN(valorCapPagado) || isNaN(valorNumAccionistas)) {
        resultado.textContent = "Por favor, ingrese valores numéricos válidos.";
        return;
    }

    tarifaConstitucion = calcularValorInscripcionDocumento();

    tarifaMatriculaPJ = calcularRegistroYRenovacionDeLaMatriculaMercantil(valorCapPagado);
    
    tarifaFormularioRues = calcularValorFormularioRues();
    tarifaImpuestoDeRegistroCuantia = calcularValorImpuestoRegistroCuantia(valorCapSuscrito);


    if (valorNumAccionistas == 1) {
        tarifaUnicoAccionista = calcularValorInscripcionDocumento();
        tarifaImpuestoRegistroSinCuantia = calcularValorImpuestoRegistroSinCuantia();
    }else{
        tarifaUnicoAccionista = 0;
        tarifaImpuestoRegistroSinCuantia = 0;
    }

    if(matriculaEstablecimiento == "SI"){
        tarifaMatriculaEstablecimiento = calcularRenovacionEstablecimientoMismaJurisdiccion(valorCapPagado);
    }else if (matriculaEstablecimiento == "NO"){
        tarifaMatriculaEstablecimiento = 0;
    }

    if(aporteEstablecimiento == "SI"){
        tarifaAporteEstablecimiento = calcularValorInscripcionDocumento();
    }else{
        tarifaAporteEstablecimiento = 0;
    }

    mostrarResultadoModal();
});


// Función para mostrar los resultados de la constitución en el modal
function mostrarResultadoModal() {

    const resultado = document.getElementById("resultado");

    const totalCamara = 
        tarifaConstitucion + 
        tarifaMatriculaPJ +
        tarifaMatriculaEstablecimiento +
        tarifaFormularioRues +
        tarifaAporteEstablecimiento +
        tarifaUnicoAccionista;

    const totalGobernacion = 
        tarifaImpuestoDeRegistroCuantia +
        tarifaImpuestoRegistroSinCuantia;

    const totalConstitucion = totalCamara + totalGobernacion;

    // Aquí insertamos el contenido dinámico en el modal
    resultado.innerHTML = `
        <div class="text-center">
            <!-- Total a Pagar en Cámara de Comercio -->
            <div class="mt-4">
                <strong class="display-5 text-primary">Total a Pagar en Cámara de Comercio:</strong><br>
                <span class="display-4 text-success font-weight-bold">
                    ${formatoMonedaColombia(totalCamara)}
                </span>
                <br><small class="text-muted">Que corresponde a:</small>
                <ul class="list-unstyled">
                    <li><strong>Constitución PJ</strong>: ${formatoMonedaColombia(tarifaConstitucion)}</li>
                    <li><strong>Matrícula PJ</strong>: ${formatoMonedaColombia(tarifaMatriculaPJ)}</li>
                    <li><strong>Formulario RUES</strong>: ${formatoMonedaColombia(tarifaFormularioRues)}</li>

                    ${matriculaEstablecimiento == "SI" ? `<li><strong>Matrícula Establecimiento</strong>: ${formatoMonedaColombia(tarifaMatriculaEstablecimiento)}</li> ` : ""}
                    ${aporteEstablecimiento == "SI" ? `<li><strong>Aporte Establecimiento</strong>: ${formatoMonedaColombia(tarifaAporteEstablecimiento)}</li> ` : ""}
                    ${numeroAccionistas == 1 ? `<li><strong>Situacion Control</strong>: ${formatoMonedaColombia(tarifaUnicoAccionista)}</li> ` : ""  }
                </ul>
            </div>

        

            <!-- Total a Pagar en Gobernación NDS -->
            <div class="mt-4">
                <strong class="display-5 text-primary">Total a Pagar en Gobernación NDS:</strong><br>
                <span class="display-4 text-success font-weight-bold">
                    ${formatoMonedaColombia(totalGobernacion)}
                </span>
                <br><small class="text-muted">Que corresponde a:</small>
                <ul class="list-unstyled">
                    <li><strong>Impuesto de Registro (Cuantía)</strong>: ${formatoMonedaColombia(tarifaImpuestoDeRegistroCuantia)}</li>
                    ${numeroAccionistas == 1 ? `<li><strong>Impuesto Registro Sin Cuantía</strong>: ${formatoMonedaColombia(tarifaImpuestoRegistroSinCuantia)}</li>` : ""}
                </ul>
            </div>

            <!-- Total Constitución (Gran Total) -->
            <div class="mt-4">
                <strong class="display-5 text-primary">Total Constitución:</strong><br>
                <span class="display-4 text-success font-weight-bold">
                    ${formatoMonedaColombia(totalConstitucion)}
                </span>
            </div>

            <!-- Capital Suscrito -->
            <div class="mt-4">
                <strong class="h5 text-primary">Capital Suscrito:</strong>
                <span class="h5 text-dark">${formatoMonedaColombia(capitalSuscrito)}</span>
            </div>

            <!-- Capital Pagado -->
            <div class="mt-4">
                <strong class="h5 text-primary">Capital Pagado:</strong>
                <span class="h5 text-dark">${formatoMonedaColombia(capitalPagado)}</span>
            </div>
            
        </div>
    `;

    // Mostrar el modal
    var myModal = new bootstrap.Modal(document.getElementById("resultadoModal"));
    myModal.show();
}



