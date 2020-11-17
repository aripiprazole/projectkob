import { AxiosInstance } from "axios";

import { selector } from "recoil";

import { apiServiceState } from "./api";

import { Repository, User } from "~/entities";

type OAuth2Response = {
  accessToken: string;
};

class SessionService {
  public constructor(private readonly http: AxiosInstance) {}

  public async findLoggedUser(): Promise<User> {
    const response = await this.http.get("/user");

    return User.of(response.data);
  }

  public async findLoggedUserRepositories(): Promise<Repository[]> {
    const response = await this.http.get("/user/repositories");

    return response.data.map(Repository.of);
  }

  public async findTokenByCode(code: string): Promise<string> {
    const response = await this.http.get<OAuth2Response>("/login", {
      params: { code, state: "none" },
    });

    return response.data.accessToken;
  }
}

export const sessionServiceState = selector({
  key: "authServiceState",
  get: ({ get }) => new SessionService(get(apiServiceState)),
});
