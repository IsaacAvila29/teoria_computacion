// Definición del autómata
//Isaac Avila Saenz (238925)

/**
 * q0: estado inicial, acepta cadenas con número par de 1's y 0's
 * q1: estado que representa un número impar de 1's y par de 0's
 * q2: estado que representa un número par de 1's y impar de 0's
 * q3: estado que representa un número impar de 1's y 0's
 */

//Tabla de transiciones basadas en el input y del estado actual
const transitions = {
  q0: { 0: "q2", 1: "q1" },
  q1: { 0: "q3", 1: "q0" },
  q2: { 0: "q0", 1: "q3" },
  q3: { 0: "q1", 1: "q2" },
};

const estadoInicial = "q0";
const estadosFinales = ["q0"]; //el estado de aceptacion

function transicionExtendida(estado, input) {
  console.log(`\nδ*(${estado}, "${input}")`);
  console.log("─".repeat(35));

  let estadoActual = estado;
  for (let i = 0; i < input.length; i++) {
    const simbolo = input[i];
    if (simbolo !== "0" && simbolo !== "1") {
      throw new Error(
        `Símbolo inválido: "${simbolo}". Solo se permiten "0" y "1".`,
      );
    }
    const estadoSiguiente = transitions[estadoActual][simbolo];
    console.log(`δ(${estadoActual}, "${simbolo}") = ${estadoSiguiente}`);
    estadoActual = estadoSiguiente;
  }
  return estadoActual;
}

function esCadenaAceptada(cadena) {
  const estadoFinal = transicionExtendida(estadoInicial, cadena);
  const aceptada = estadosFinales.includes(estadoFinal);
  console.log(
    `\nCadena "${cadena}" ${
      aceptada ? "aceptada" : "rechazada"
    } (estado final: ${estadoFinal})`,
  );
  return aceptada;
}

// --- Pruebas ---
esCadenaAceptada("110101");
esCadenaAceptada("01");
esCadenaAceptada("1100");
esCadenaAceptada("111");
