import React from "react";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme/themePrimary";
import AFD from "./automatos/AFD";

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <AFD />
    </ThemeProvider>
  );
};

export default App;
