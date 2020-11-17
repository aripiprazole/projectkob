import { selector } from "recoil";

import { authServiceState } from "~/services";

export const loggedUserState = selector({
  key: "loggedUserState",
  get: async ({ get }) => {
    return await get(authServiceState).findLoggedUser();
  },
});

export const loggedUserReposState = selector({
  key: "loggedUserReposState",
  get: async ({ get }) => {
    return await get(authServiceState).findLoggedUserRepositories();
  },
});

export const authenticationTokenState = selector({
  key: "authenticationTokenState",

  get: () => {
    return localStorage.getItem("authorizationToken");
  },

  set: async ({ get }, temporaryCode) => {
    if (!temporaryCode) return;

    try {
      const authenticationToken = await get(authServiceState).findTokenByCode(
        temporaryCode.toString()
      );

      return localStorage.setItem("authorizationToken", authenticationToken);
    } catch (error) {
      console.error("An unexpected error ocurred fetching accessToken:", error);
    }
  },
});
