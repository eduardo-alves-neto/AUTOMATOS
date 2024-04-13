import React, { useState, ChangeEvent } from "react";
import { TextField, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

interface Position {
  estado: number;
  simbolo: string;
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    margin: theme.spacing(2),
  },
  textField: {
    margin: theme.spacing(2),
  },
}));

const AFD: React.FC = () => {
  const classes = useStyles();
  const estadoInicial = 0;
  const [estado, setEstado] = useState<number>(estadoInicial);

  const transicao: number[][] = [
    [0, 1],
    [1, 0],
  ];

  const estadosFinais: number[] = [1];

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    const entrada = event.target.value.trim();
    let newState = estadoInicial;

    const positions: Position[] = [];
    for (let posicao = 0; posicao < entrada.length; posicao++) {
      const simbolo = entrada.charAt(posicao);
      positions.push({ estado: newState, simbolo });
      newState = transicao[newState][parseInt(simbolo)];
    }

    setEstado(newState);
  };

  return (
    <div className={classes.root}>
      <TextField
        className={classes.textField}
        label="Input"
        variant="outlined"
        onChange={handleInputChange}
      />
      <Typography variant="h6">Estado atual: q{estado}</Typography>
      {estadosFinais.includes(estado) ? (
        <Typography variant="h6">Aceita</Typography>
      ) : (
        <Typography variant="h6">Rejeita</Typography>
      )}
    </div>
  );
};

export default AFD;
