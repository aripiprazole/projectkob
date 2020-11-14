import { selector } from "recoil";

import { authorizationHeader } from "~/utils";

import { User } from "~/entities";

import { api } from "~/services";

type OAuth2Response = {
  accessToken: string;
};

export const loggedUserState = selector({
  key: "loggedUserState",
  get: async ({ get }) => {
    try {
      const response = await api.get("/user", {
        headers: authorizationHeader(get),
      });

      return User.of(response.data);
    } catch (error) {
      return null;
    }
  },
});

export const authenticationTokenState = selector({
  key: "authenticationTokenState",

  get: () => {
    return localStorage.getItem("authorizationToken");
  },

  set: async ({}, temporaryCode) => {
    try {
      const response = await api.get<OAuth2Response>(
        `/login?code=${temporaryCode}&state=none`
      );
      const authenticationToken = response.data.accessToken;

      if (!authenticationToken) return;

      return localStorage.setItem("authorizationToken", authenticationToken);
    } catch (error) {
      console.error("An unexpected error ocurred fetching accessToken", error);

      return;
    }
  },
});
