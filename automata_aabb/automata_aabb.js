const transitions = {
  q0: { a: "q0", b: "q1" },
  q1: { a: "q1", b: "q0" },
};

const estadoInicial = "q0";
const estadosFinales = ["q0"]; //el estado de aceptacion

function transicionExtendida(estado, input) {
  console.log(`\nδ*(${estado}, "${input}")`);
  console.log("─".repeat(35));

  let estadoActual = estado;
  for (let i = 0; i < input.length; i++) {
    const simbolo = input[i];
    if (simbolo !== "a" && simbolo !== "b") {
      throw new Error(
        `Símbolo inválido: "${simbolo}". Solo se permiten "a" y "b".`,
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

esCadenaAceptada("aabba");
esCadenaAceptada("baba");
esCadenaAceptada("aaabbb");
esCadenaAceptada("aabaab");
