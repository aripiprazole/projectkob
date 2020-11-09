import { atom, selector, selectorFamily } from "recoil";
import { User } from "~/entities";

import { api } from "~/services";

export const loggedUserState = selector({
  key: "loggedUserState",
  get: async () => {
    return api.get("/user").then((response) => User.of(response.data));
  },
});

export const authenticationTokenState = atom<string | null>({
  key: "authenticationTokenState",
  default: null,
});
