import { AxiosInstance } from "axios";

import { selector } from "recoil";

import { apiServiceState } from "./api";

import { Repo, User } from "~/entities";

type OAuth2Response = {
  accessToken: string;
};

class AuthService {
  public constructor(private readonly http: AxiosInstance) {}

  public async findLoggedUser(): Promise<User> {
    const response = await this.http.get("/user");

    return User.of(response.data);
  }

  public async findLoggedUserRepos(): Promise<Repo[]> {
    const response = await this.http.get("/user/repos");

    return response.data.map(Repo.of);
  }

  public async findTokenByCode(code: string): Promise<string> {
    const response = await this.http.get<OAuth2Response>(
      `/login?code=${code}&state=none`
    );

    return response.data.accessToken;
  }
}

export const authServiceState = selector({
  key: "authServiceState",
  get: ({ get }) => new AuthService(get(apiServiceState)),
});
