import { createMuiTheme, Theme as MuiTheme } from "@material-ui/core";

type AppTheme = MuiTheme & {};

export const LightTheme: AppTheme = createMuiTheme();

declare module "styled-components" {
  interface DefaultTheme extends AppTheme {}
}

export default AppTheme;
