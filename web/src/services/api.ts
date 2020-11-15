import { selector } from "recoil";

import axios from "axios";

import { API_URL } from "~/config";

function createApiService(token: unknown) {
  return axios.create({
    baseURL: API_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

export const apiServiceState = selector({
  key: "apiServiceState",
  get: () => createApiService(localStorage.getItem("authorizationToken")),
});
