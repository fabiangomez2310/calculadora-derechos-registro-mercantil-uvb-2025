// Definir UVB
const uvb = 11552; // 2025

const smmlv = 1423500; // 2025

const sistematizacionNorteDeSantander = 47450; // 2024

const impuestoRegistroSinCuantia = 237450; // 2024

// CALCULAR REGISTRO Y RENOVACION DE LA MATRICULA MERCANTIL DE ACUERDO CON EL VALOR UVB DEL AÑO
export function calcularRegistroYRenovacionDeLaMatriculaMercantil(
  valorActivos
) {
  let tarifaAplicada;

  // Primer rango: Hasta 6.500 UVB
  if (valorActivos <= 6500 * uvb) {
    tarifaAplicada = 2 * uvb + 0.7 * uvb * (valorActivos / 1000000);
  }
  // Segundo rango: Más de 6.500 hasta 25.000 UVB
  else if (valorActivos <= 25000 * uvb) {
    tarifaAplicada =
      47.5 * uvb + (0.35 * uvb * (valorActivos - 6500 * uvb)) / 1000000;
  }
  // Tercer rango: Más de 25.000 hasta 65.000 UVB
  else if (valorActivos <= 65000 * uvb) {
    tarifaAplicada =
      112.25 * uvb + (0.1 * uvb * (valorActivos - 25000 * uvb)) / 1000000;
  }
  // Cuarto rango: Más de 65.000 hasta 650.000 UVB
  else if (valorActivos <= 650000 * uvb) {
    tarifaAplicada =
      152.25 * uvb + (0.045 * uvb * (valorActivos - 65000 * uvb)) / 1000000;
  }
  // Quinto rango: Más de 650.000 hasta 2.000.000 UVB
  else if (valorActivos <= 2000000 * uvb) {
    tarifaAplicada =
      415.5 * uvb + (0.025 * uvb * (valorActivos - 650000 * uvb)) / 1000000;
  }
  // Sexto rango: Más de 2.000.000 UVB
  else {
    tarifaAplicada =
      753 * uvb + (0.0125 * uvb * (valorActivos - 2000000 * uvb)) / 1000000;
  }

  return redondeoSegunDecreto1074(tarifaAplicada);
}

// CALCULAR REGISTRO Y RENOVACION DE LOS ESTABLECIMIENTOS, AGENCIAS O SUCURSALES MISMA JURISDICCION
export function calcularRenovacionEstablecimientoMismaJurisdiccion(
  valorActivos
) {
  let tarifaAplicada;

  // Primer rango: Hasta 6.500 UVB
  if (valorActivos <= 6500 * uvb) {
    tarifaAplicada = 4 * uvb;
  }
  // Segundo rango: Más de 6.500 hasta 25.000 UVB
  else if (valorActivos <= 25000 * uvb) {
    tarifaAplicada = 10 * uvb;
  }
  // Tercer rango: Más de 25.000 hasta 65.000 UVB
  else if (valorActivos <= 65000 * uvb) {
    tarifaAplicada = 16 * uvb;
  }
  // Cuarto rango: Más de 65.000 hasta 650.000 UVB
  else if (valorActivos <= 650000 * uvb) {
    tarifaAplicada = 22 * uvb;
  }
  // Quinto rango: Más de 650.000 hasta 2.000.000 UVB
  else if (valorActivos <= 2000000 * uvb) {
    tarifaAplicada = 28 * uvb;
  }
  // Sexto rango: Más de 2.000.000 hasta 10.000.000 UVB
  else if (valorActivos <= 10000000 * uvb) {
    tarifaAplicada = 34 * uvb;
  }
  // Septimo rango: De  10.000.000 UVB en adelante
  else {
    tarifaAplicada = 40 * uvb;
  }

  return redondeoSegunDecreto1074(tarifaAplicada);
}

// CALCULAR REGISTRO Y RENOVACION DE LOS ESTABLECIMIENTOS, AGENCIAS O SUCURSALES DIFERENTE JURISDICCION
export function calcularRenovacionEstablecimientoDiferenteJurisdiccion(
  valorActivos
) {
  let tarifaAplicada;

  // Primer rango: Hasta 6.500 UVB
  if (valorActivos <= 6500 * uvb) {
    tarifaAplicada = 8 * uvb;
  }
  // Segundo rango: Más de 6.500 hasta 25.000 UVB
  else if (valorActivos <= 25000 * uvb) {
    tarifaAplicada = 20 * uvb;
  }
  // Tercer rango: Más de 25.000 hasta 65.000 UVB
  else if (valorActivos <= 65000 * uvb) {
    tarifaAplicada = 32 * uvb;
  }
  // Cuarto rango: Más de 65.000 hasta 650.000 UVB
  else if (valorActivos <= 650000 * uvb) {
    tarifaAplicada = 44 * uvb;
  }
  // Quinto rango: Más de 650.000 hasta 2.000.000 UVB
  else if (valorActivos <= 2000000 * uvb) {
    tarifaAplicada = 56 * uvb;
  }
  // Sexto rango: Más de 2.000.000 hasta 10.000.000 UVB
  else if (valorActivos <= 10000000 * uvb) {
    tarifaAplicada = 68 * uvb;
  }
  // Septimo rango: De  10.000.000 UVB en adelante
  else {
    tarifaAplicada = 80 * uvb;
  }

  return redondeoSegunDecreto1074(tarifaAplicada);
}

// CALCULAR VALOR DEL FORMULARIO RUES DE ACUERDO CON EL VALOR UVB DEL AÑO
export function calcularValorFormularioRues() {
  let tarifaAplicada = uvb * 0.7;
  return redondeoSegunDecreto1074(tarifaAplicada);
}

// CALCULAR VALOR DEL CERTIFICADO SEGUN TIPO PERSONA DE ACUERDO CON EL VALOR UVB DEL AÑO
export function calcularValorCertificado(tipoPersona) {
  let valorCertificado;

  if (tipoPersona == "PN") {
    valorCertificado = 0.5 * uvb;
  } else if (tipoPersona == "PJ") {
    valorCertificado = 1 * uvb;
  } else {
    console.error("Tipo de persona invalido.");
    return 0;
  }
  return redondeoSegunDecreto1074(valorCertificado);
}

// CALCULAR VALOR INSCRIPCION DE DOCUMENTOS

export function calcularValorInscripcionDocumento() {
  let tarifaAplicada = uvb * 6;
  return redondeoSegunDecreto1074(tarifaAplicada);
}

// CALCULAR VALOR IMPUESTO DE REGISTRO GOBERNACION DE NORTE DE SANTANDER
export function calcularValorImpuestoRegistroCuantia(valorCapSuscrito) {
  return (valorCapSuscrito * 0.7) / 100 + sistematizacionNorteDeSantander;
}

export function calcularValorImpuestoRegistroSinCuantia() {
  return impuestoRegistroSinCuantia;
}

// REDONDEO SEGUN DECRETO 1074 DE 2015 ART. 2.2.2.46.1.10

function redondeoSegunDecreto1074(valor) {
  let tope = (smmlv * 3) / 100;

  let tarifaAplicada;

  if (valor <= tope) {
    tarifaAplicada = Math.round(valor / 100) * 100;
  } else {
    tarifaAplicada = Math.round(valor / 1000) * 1000;
  }

  return tarifaAplicada;
}



