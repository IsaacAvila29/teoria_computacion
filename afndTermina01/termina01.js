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

// Función para mostrar paso a paso la ejecución
function simularAFNDDetallado(cadena) {
  console.log(`\nProcesando cadena: "${cadena}"`);
  console.log("═".repeat(50));

  let estadosActuales = [afnd.estadoInicial];
  console.log(`Paso 0 - Estado inicial: [${estadosActuales}]\n`);

  for (let i = 0; i < cadena.length; i++) {
    const simbolo = cadena[i];
    let nuevosCEstados = new Set();

    console.log(`Paso ${i + 1} - Leyendo símbolo: '${simbolo}'`);
    console.log(`Estados actuales: [${estadosActuales}]`);

    for (let estado of estadosActuales) {
      let proximos = afnd.transiciones[estado][simbolo] || [];
      console.log(`  δ(${estado}, '${simbolo}') = [${proximos}]`);
      proximos.forEach((e) => nuevosCEstados.add(e));
    }

    estadosActuales = Array.from(nuevosCEstados);
    console.log(`Estados después de '${simbolo}': [${estadosActuales}]\n`);
  }

  const estaEnAceptacion = estadosActuales.some((e) =>
    afnd.estadosAceptacion.includes(e),
  );

  console.log("═".repeat(50));
  console.log(`Estados finales: [${estadosActuales}]`);
  console.log(
    `¿Está en estado de aceptación? ${estaEnAceptacion ? "SI" : "NO"}`,
  );
  console.log(
    `Resultado: ${estaEnAceptacion} (La cadena ${estaEnAceptacion ? "SI" : "NO"} termina en "01")`,
  );

  return estaEnAceptacion;
}

// Pruebas detalladas
console.log("SIMULACIONES DETALLADAS DEL AFND\n");

simularAFNDDetallado("01"); // true - caso simple
simularAFNDDetallado("001"); // false - termina en 1, no en 01
simularAFNDDetallado("0101"); // true - termina en 01
simularAFNDDetallado("10"); // false - "10" no es suficiente

console.log("\n" + "═".repeat(50));
console.log("PRUEBAS RAPIDAS");
console.log("═".repeat(50));
console.log("simularAFND('00101'):", simularAFND("00101")); // true
console.log("simularAFND('0010'):", simularAFND("0010")); // false
console.log("simularAFND('0101'):", simularAFND("0101")); // true
console.log("simularAFND('10'):", simularAFND("10")); // false
console.log("simularAFND('001'):", simularAFND("001")); // false
console.log("simularAFND(''):", simularAFND("")); // false
