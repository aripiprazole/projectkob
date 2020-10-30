import React from "react";

import { container } from "tsyringe";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";

import { Provider } from "react-redux";

import { createAxiosInstance } from "services";

import { DaemonServiceImpl, DAEMON_SERVICE_KEY } from "services/DaemonService";

import { AppServiceImpl, APP_SERVICE_KEY } from "services/AppService";

import {
  SessionServiceImpl,
  SESSION_SERVICE_KEY,
} from "services/SessionService";

import createAppStore, { STORE_KEY } from "store";

const Dependencies: React.FC = ({ children }) => {
  const theme = createMuiTheme({
    palette: {
      primary: {
        main: "#331ee7",
        contrastText: "#f9f9f9",
      },
    },
  });

  const axiosInstance = createAxiosInstance();
  const [store] = createAppStore();

  container.register(DAEMON_SERVICE_KEY, {
    useValue: new DaemonServiceImpl(axiosInstance),
  });

  container.register(APP_SERVICE_KEY, {
    useValue: new AppServiceImpl(axiosInstance),
  });

  container.register(SESSION_SERVICE_KEY, {
    useValue: new SessionServiceImpl(axiosInstance),
  });

  container.register(STORE_KEY, {
    useValue: store,
  });

  return (
    <Provider store={store}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </Provider>
  );
};

export default Dependencies;
