import { atom, selector, selectorFamily } from "recoil";

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
