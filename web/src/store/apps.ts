import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { App } from "~/entities";

import { None } from "~/entities/app-status";

export const appListState = selector({
  key: "appsListState",
  get: async () => [
    new App("43rnr2", "projectkob", "https://github.com/LorenzooG/projectkob"),
    new App("rn3r9q", "happy", "https://github.com/LorenzooG/happy-nlw"),
    new App("m1r1aa", "gitkib", "https://github.com/LorenzooG/gitkib"),
    new App("fn3729", "zipzopp", "https://github.com/LorenzooG/zipzop"),
  ],
});

export const appState = selectorFamily({
  key: "appState",
  get: () => async ({ get }) => get(appListState)[0]!!,
});

export const appStatusState = atom({
  key: "appStatusState",
  default: None,
});

export const appLogsState = atomFamily({
  key: "appLogsState",
  default: [
    "\u001b[31m[INFO] Starting...",
    "[INFO] Starting service -> X...",
    "[INFO] Starting service -> Y...",
    "[INFO] Starting service -> Z...",
    "[INFO] Started...",
    "[INFO] Receiving request in /",
    "[ERROR] Error",
  ],
});
