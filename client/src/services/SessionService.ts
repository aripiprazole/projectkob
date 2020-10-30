import { AxiosInstance } from "axios";
import OAuth2Response from "dtos/OAuth2Response";
import User from "models/User";
import { InjectionToken } from "tsyringe";

// export const TOKEN_KEY = "token";
export const SESSION_SERVICE_KEY: InjectionToken<SessionService> =
  "SessionService";

interface SessionService {
  findLoggedUser(): Promise<User>;
  findAccessToken(code: string): Promise<OAuth2Response>;

  loginUrl: string;
}

export class SessionServiceImpl implements SessionService {
  public constructor(private readonly http: AxiosInstance) {}

  public loginUrl: string = "http://localhost:8080/login";

  public async findLoggedUser(): Promise<User> {
    const { data } = await this.http.get("/user");

    return User.ofResponse(data);
  }

  public async findAccessToken(code: string): Promise<OAuth2Response> {
    const { data } = await this.http.get("/login", {
      params: {
        code,
        state: "none",
      },
    });

    return data;
  }
}

export default SessionService;
