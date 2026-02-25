//Primera expresión regular
const regex = /^(abb|a|b|bba)$/;

const casosPrueba = ["abb", "a", "b", "bba", "ab", "ba", "aa", "bb"];

casosPrueba.forEach((caso) => {
  if (regex.test(caso)) {
    console.log(`${caso} es aceptada por la expresión regular.`);
  } else {
    console.log(`${caso} no es aceptada por la expresión regular.`);
  }
});

// Segunda expresión regular
const regex2 = /^0*$/;
const casosPrueba2 = ["", "0", "00", "000", "1", "10", "01"];

casosPrueba2.forEach((caso) => {
  if (regex2.test(caso)) {
    console.log(`${caso} es aceptada por la expresión regular.`);
  } else {
    console.log(`${caso} no es aceptada por la expresión regular.`);
  }
});

//Tercera expresión regular

const regex3 = /^1+$/;
const casosPrueba3 = ["", "1", "11", "111", "1111", "0", "10", "01"];

casosPrueba3.forEach((caso) => {
  if (regex3.test(caso)) {
    console.log(`${caso} es aceptada por la expresión regular.`);
  } else {
    console.log(`${caso} no es aceptada por la expresión regular.`);
  }
});
