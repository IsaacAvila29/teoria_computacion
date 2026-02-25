const transitions = {
  q0: { 0: "q2", 1: "q1" }, // pares ceros, pares unos
  q1: { 0: "q3", 1: "q0" }, // pares ceros, impares unos
  q2: { 0: "q0", 1: "q3" }, // impares ceros, pares unos
  q3: { 0: "q1", 1: "q2" }, // impares ceros, impares unos
};

const estadoInicial = "q0";
const estadosFinales = ["q0"]; //el estado de aceptacion

function transicionExtendida(estado, input) {
  console.log(`\nδ*(${estado}, "${input}")`);
  console.log("─".repeat(35));

  let estadoActual = estado;
  for (const simbolo of input) {
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
