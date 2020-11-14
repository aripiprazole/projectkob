import { atom } from "recoil";

import { LightTheme } from "~/styles/theme";

export const themeState = atom({
  key: "themeState",
  default: LightTheme,
});
