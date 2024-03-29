import { atom, atomFamily, selector, selectorFamily } from "recoil";

import AppStatus, {
  Deployed,
  None,
  Started,
  Stopped,
} from "~/entities/app-status";

import { appsServiceState } from "~/services";

export const appListLastPageState = atom({
  key: "appListLastPageState",
  default: selector({
    key: "appListLastPageState/default",
    get: async ({ get }) => {
      const page = await get(appsServiceState).findPaginatedApps(1);

      return page.totalPages;
    },
  }),
});

export const appListState = atomFamily({
  key: "appListState",
  default: selectorFamily({
    key: "appListState/default",
    get: (id) => ({ get }) => get(appsServiceState).findPaginatedApps(id),
  }),
});

export const appState = selectorFamily({
  key: "appState",
  get: (id: string) => ({ get }) => get(appsServiceState).findAppById(id),
});

const _appStatusState = atom({
  key: "_appStatusState",
  default: None,
});

export const appStatusState = selector<AppStatus>({
  key: "appStatusState",
  get: async ({ get }) => get(_appStatusState),
  set: async ({ set }, status) => {
    if ("__tag" in status) return;

    switch (status.type) {
      case "deploy":
        return set(_appStatusState, Deployed);
      case "start":
        return set(_appStatusState, Started);
      case "stop":
        return set(_appStatusState, Stopped(9));
      case "kill":
        return set(_appStatusState, Stopped(0));
    }
  },
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
