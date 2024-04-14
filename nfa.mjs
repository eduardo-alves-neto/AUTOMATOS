import { createInterface } from "readline";
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

//Q={q0, q1, q2}
//Alfabeto = {0,1}
//aceita 101 e rejeita 100
const transicao = [
  [[0, 1], [0]],
  [[null], [2]],
  [[null], [null]],
];
const estadoInicial = 0;
const aceitacao = [2];

rl.question("insira uma cadeia: ", (cadeia) => {
  let posicao = 0;
  let estados = [estadoInicial];

  while (posicao < cadeia?.length) {
    print(cadeia, estados, posicao);
    let novosEstados = [];
    let elemento = parseInt(cadeia?.substring(posicao, posicao + 1));
    for (let i of estados) {
      let destinoTransicao = transicao[i][elemento];
      novosEstados = uniao(novosEstados, destinoTransicao);
    }
    estados = novosEstados;
    if (estados.length === 0) {
      break;
    }
    posicao++;
  }

  print(cadeia, estados, posicao);
  if (aceita(estados)) {
    console.log("Aceita");
  } else {
    console.log("Rejeita");
  }

  rl.close();
});

function print(cadeia, estado, posicao) {
  let estadoStr = estado
    .map((e) => (e !== null ? "q" + e : "qnull"))
    .join(", ");
  console.log(
    `${cadeia.substring(0, posicao)}{${estadoStr}}${cadeia.substring(posicao)}`
  );
}

function uniao(estados, novosEstados) {
  let uniao = new Set([...estados, ...novosEstados]);
  return Array.from(uniao);
}

function aceita(estados) {
  if (estados == null) return false;
  for (let i of estados) {
    for (let j of aceitacao) {
      if (i === j) {
        return true;
      }
    }
  }
  return false;
}
