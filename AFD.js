const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout,
});

let transicao = [
  [0, 1],
  [1, 0],
];
let estadoInicial = 0;
let estadosFinais = [1];

readline.question("Digite uma cadeia:\n", (entrada) => {
  let estado = estadoInicial;

  console.log("Cadeia:");
  for (let posicao = 0; posicao < entrada.length; posicao++) {
    let simbolo = entrada.charAt(posicao);
    imprimirTransicao(simbolo, estado);
    estado = transicao[estado][parseInt(simbolo)];
  }
  imprimirEstadoAtual(estado);

  let aceita = estadosFinais.includes(estado);
  if (aceita) {
    console.log("Aceita");
  } else {
    console.log("Rejeita");
  }

  readline.close();
});

function imprimirTransicao(simbolo, estado) {
  console.log(`Transição: q${estado} -> ${simbolo}`);
}

function imprimirEstadoAtual(estado) {
  console.log(`Estado atual: q${estado}`);
}
