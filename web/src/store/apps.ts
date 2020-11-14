import { atom, atomFamily, selector, selectorFamily } from "recoil";

import { App } from "~/entities";

import AppStatus, {
  Deployed,
  None,
  Started,
  Stopped,
} from "~/entities/app-status";

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

export const currentAppStatusState = atom({
  key: "currentAppStatusState",
  default: None,
});

export const appIsStartedState = selector({
  key: "appStatusIsStartedState",
  get: ({ get }) => {
    const state = get(appStatusState);

    return (
      state.type !== "stopped" &&
      state.type !== "start" &&
      state.type !== "deployed" &&
      state.type !== "none" &&
      state.type !== "deploy"
    );
  },
});

export const appStatusState = selector<AppStatus>({
  key: "appStatusState",
  get: async ({ get }) => get(currentAppStatusState),
  set: async ({ set }, status) => {
    if ("__tag" in status) return;

    switch (status.type) {
      case "deploy":
        return set(currentAppStatusState, Deployed);
      case "start":
        return set(currentAppStatusState, Started);
      case "stop":
        return set(currentAppStatusState, Stopped(9));
      case "kill":
        return set(currentAppStatusState, Stopped(0));
    }
  },
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
