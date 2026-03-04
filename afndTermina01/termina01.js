// AFND que reconoce cadenas que terminan en 01
// Estados: q0 (inicial), q1 (vio 0), q2 (aceptación - vio 01)

const afnd = {
  estados: ["q0", "q1", "q2"],
  alfabeto: ["0", "1"],
  estadoInicial: "q0",
  estadosAceptacion: ["q2"],

  // Transiciones: δ(estado, símbolo) = [estados resultantes]
  transiciones: {
    q0: {
      0: ["q0", "q1"], // Se queda en q0 o avanza a q1
      1: ["q0"], // Se queda en q0
    },
    q1: {
      0: ["q0", "q1"], // Vuelve a empezar el patrón
      1: ["q0", "q2"], // Reconoce 01, llega a q2
    },
    q2: {
      0: [], // No hay transiciones desde aceptación
      1: [],
    },
  },
};

// Función para simular el AFND
function simularAFND(cadena) {
  let estadosActuales = [afnd.estadoInicial];

  for (let simbolo of cadena) {
    let nuevosCEstados = new Set();

    for (let estado of estadosActuales) {
      let proximos = afnd.transiciones[estado][simbolo] || [];
      proximos.forEach((e) => nuevosCEstados.add(e));
    }

    estadosActuales = Array.from(nuevosCEstados);
  }

  // Verifica si algún estado actual es de aceptación
  return estadosActuales.some((e) => afnd.estadosAceptacion.includes(e));
}

// Pruebas
console.log(simularAFND("00101")); // true
console.log(simularAFND("101")); // true
console.log(simularAFND("0101")); // true
console.log(simularAFND("10")); // false
console.log(simularAFND("001")); // false
console.log(simularAFND("")); // false
