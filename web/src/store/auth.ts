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
    return api
      .get("/user", {
        headers: authorizationHeader(get),
      })
      .then((response) => User.of(response.data));
  },
});

export const authenticationTokenState = selector({
  key: "authenticationTokenState",

  get: () => {
    return localStorage.getItem("authorizationToken");
  },

  set: async ({}, temporaryCode) => {
    const authenticationToken = await api
      .post<OAuth2Response>(`/login?code=${temporaryCode}&state=none`)
      .then((response) => response.data.accessToken);

    return localStorage.setItem("authorizationToken", authenticationToken);
  },
});
