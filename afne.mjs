import { createInterface } from "readline";
const rl = createInterface({
  input: process.stdin,
  output: process.stdout,
});

//010 aceita
//111 rejeita
const transicao = [
  [[1], [], []],
  [[], [2], [2]],
  [[], [], []],
];
const transicaoVazia = [[], [0], [0]];

const estadoInicial = 0;
const aceitacao = [0];

rl.question("insira uma cadeia: ", (cadeia) => {
  let posicao = 0;
  let estados = eclose([estadoInicial]);
  while (posicao < cadeia?.length) {
    print(cadeia, estados, posicao);
    let novosEstados = [];
    let elemento = parseInt(cadeia?.substring(posicao, posicao + 1));
    for (let i of estados) {
      let destinoTransicao = transicao[i][elemento];
      novosEstados = uniao(novosEstados, destinoTransicao);
      novosEstados = eclose(novosEstados);
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
});

function eclose(estados) {
  let resultado = estados; 
  for (let i of estados) {
    let ecloseAux = transicaoVazia[i];
    let ecloseAux2 = eclose(ecloseAux);
    resultado = uniao(resultado, ecloseAux); 
    resultado = uniao(resultado, ecloseAux2);
  }
  return resultado;
}

function uniao(estados, novosEstados) {
  let uniao = new Set([...estados, ...novosEstados]);
  return Array.from(uniao);
}

function aceita(estados) {
  if (estados === null) {
    return false;
  }
  for (let i of estados) {
    for (let j of aceitacao) {
      if (i === j) {
        return true;
      }
    }
  }
  return false;
}

function print(cadeia, estado, posicao) {
  let estadoStr = estado.map((e) => "q" + e).join(", ");
  console.log(
    `${cadeia.substring(0, posicao)}{${estadoStr}}${cadeia.substring(posicao)}`
  );
}
