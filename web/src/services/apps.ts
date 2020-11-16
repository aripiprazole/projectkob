import { selector } from "recoil";

import { AxiosInstance } from "axios";

import { apiServiceState } from "./api";

import { App } from "~/entities";

type CreateNewAppDto = {
  name: string;
  repository: string;
};

class AppsService {
  public constructor(private readonly http: AxiosInstance) {}

  public async findAllApps(): Promise<App[]> {
    const response = await this.http.get("/apps");

    return response.data.map(App.of);
  }

  public async findAppById(_appId: string): Promise<App> {
    const apps = await this.findAllApps();

    return apps[0]!!;
  }

  public async createNewApp(data: CreateNewAppDto): Promise<App> {
    const response = await this.http.post("/apps", data);

    return App.of(response.data);
  }
}

export const appsServiceState = selector({
  key: "appsServiceState",
  get: ({ get }) => new AppsService(get(apiServiceState)),
});
