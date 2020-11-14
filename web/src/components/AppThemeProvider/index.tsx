import React from "react";

import { ThemeProvider as MuiThemeProvider } from "@material-ui/core";
import { ThemeProvider as StyledComponentsThemeProvider } from "styled-components";

import { useRecoilValue } from "recoil";

import { themeState } from "~/store/theme";

export const AppThemeProvider: React.FC = ({ children }) => {
  const theme = useRecoilValue(themeState);

  return (
    <StyledComponentsThemeProvider theme={theme}>
      <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
    </StyledComponentsThemeProvider>
  );
};

export default AppThemeProvider;
