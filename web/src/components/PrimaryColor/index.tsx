import React from "react";

import { useRecoilValue } from "recoil";

import { MuiThemeProvider } from "@material-ui/core";

import { themeState } from "~/store/theme";

type Props = {
  primaryColor?: string;
};

const PrimaryColor: React.FC<Props> = ({ primaryColor, children }) => {
  const theme = useRecoilValue(themeState);

  if (!primaryColor) return <>{children}</>;

  return (
    <MuiThemeProvider
      theme={{
        ...theme,
        palette: {
          ...theme.palette,
          primary: {
            main: primaryColor,
          },
        },
      }}
    >
      {children}
    </MuiThemeProvider>
  );
};

export default PrimaryColor;
