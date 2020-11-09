import { atom, selector, selectorFamily } from "recoil";
import { User } from "~/entities";

import { api } from "~/services";
import { authorizationHeader } from "~/utils";

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
      const authenticationToken = await api
        .post<OAuth2Response>(`/login?code=${temporaryCode}&state=none`)
        .then((response) => response.data.accessToken);

      return localStorage.setItem("authorizationToken", authenticationToken);
    } catch (error) {
      return null;
    }
  },
});
