type Estado = "q0" | "q1" | "q2" | "q3";
type Simbolo = "0" | "1";
const transitions = {
  q0: { 0: "q2", 1: "q1" }, // pares ceros, pares unos
  q1: { 0: "q3", 1: "q0" }, // pares ceros, impares unos
  q2: { 0: "q0", 1: "q3" }, // impares ceros, pares unos
  q3: { 0: "q1", 1: "q2" }, // impares ceros, impares unos
};

const estadoInicial: Estado = "q0";
const estadosFinales = ["q0"];

function transicionExtendida(estado: Estado, input: string): Estado {
  console.log(`\nδ*(${estado}, "${input}")`);
  console.log("─".repeat(35));

  let estadoActual = estado;
  for (const simbolo of input) {
    if (simbolo !== "0" && simbolo !== "1") {
      throw new Error(
        `Símbolo inválido: "${simbolo}". Solo se permiten "0" y "1".`,
      );
    }
    const elSimbolo = simbolo as Simbolo;
    const estadoSiguiente: Estado = transitions[estadoActual][
      elSimbolo
    ] as Estado;
    console.log(`δ(${estadoActual}, "${elSimbolo}") = ${estadoSiguiente}`);
    estadoActual = estadoSiguiente;
  }
  return estadoActual;
}

function esCadenaAceptada(cadena: string): boolean {
  const estadoFinal = transicionExtendida(estadoInicial, cadena);
  const aceptada = estadosFinales.includes(estadoFinal);
  console.log(
    `\nCadena "${cadena}" ${
      aceptada ? "aceptada" : "rechazada"
    } (estado final: ${estadoFinal})`,
  );
  return aceptada;
}
