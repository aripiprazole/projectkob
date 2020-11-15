import { selector } from "recoil";

import { AxiosInstance } from "axios";

import { apiServiceState } from "./api";

import { App } from "~/entities";

type CreateNewAppDto = {
  name: string;
  repo: string;
};

class AppsService {
  public constructor(private readonly http: AxiosInstance) {}

  public async findAllApps(): Promise<App[]> {
    return [
      new App(
        "43rnr2",
        "projectkob",
        "https://github.com/LorenzooG/projectkob"
      ),
      new App("rn3r9q", "happy", "https://github.com/LorenzooG/happy-nlw"),
      new App("m1r1aa", "gitkib", "https://github.com/LorenzooG/gitkib"),
      new App("fn3729", "zipzopp", "https://github.com/LorenzooG/zipzop"),
    ];
  }

  public async findAppById(_appId: string): Promise<App> {
    const apps = await this.findAllApps();

    return apps[0]!!;
  }

  public async createNewApp(data: CreateNewAppDto): Promise<App> {
    const response = await this.http.post("/apps");

    return App.of(response.data);
  }
}

export const appsServiceState = selector({
  key: "appsServiceState",
  get: ({ get }) => new AppsService(get(apiServiceState)),
});
