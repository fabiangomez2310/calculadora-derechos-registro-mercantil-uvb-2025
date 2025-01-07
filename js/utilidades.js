// --- UTILIDADES

// Función para formatear los valores en moneda colombiana
export function formatoMonedaColombia(valor) {
    return new Intl.NumberFormat("es-CO", {
      style: "currency",
      currency: "COP",
      minimumFractionDigits: 0, // Puedes ajustar el número de decimales si lo prefieres
      maximumFractionDigits: 0,
    }).format(valor);
  }