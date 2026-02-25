const expresionE = /^(a(bb)?|b(ba)?)$/;
const casosE = [, "abb", "a", "b", "bba", "ab", "ba", "aa", "bb"];
casosE.forEach((c) =>
  console.log(`${c} => ${expresionE.test(c) ? "aceptada" : "rechazada"}`),
);

console.log("\n================================\n");

const expresionF = /^0*$/;
const casosF = ["", "0", "00", "000", "1", "10", "01"];
casosF.forEach((c) =>
  console.log(
    `${JSON.stringify(c)} => ${expresionF.test(c) ? "aceptada" : "rechazada"}`,
  ),
);

console.log("\n================================\n");

const expresionG = /^1+$/;
const casosG = ["", "1", "11", "111", "1111", "0", "10", "01"];
casosG.forEach((c) =>
  console.log(
    `${JSON.stringify(c)} => ${expresionG.test(c) ? "aceptada" : "rechazada"}`,
  ),
);
