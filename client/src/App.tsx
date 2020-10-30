import React from "react";

import { BrowserRouter } from "react-router-dom";

import GlobalStyle from "styles/GlobalStyle";
import ErrorHandler from "components/ErrorHandler";

import Routes from "Routes";
import Dependencies from "Dependencies";

const App: React.VFC = () => {
  return (
    <Dependencies>
      <BrowserRouter>
        <GlobalStyle />

        <ErrorHandler>
          <Routes />
        </ErrorHandler>
      </BrowserRouter>
    </Dependencies>
  );
};

export default App;
