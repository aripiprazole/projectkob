import { selector } from "recoil";

import { AxiosInstance } from "axios";

import { apiServiceState } from "./api";

import { App, Page } from "~/entities";

const TOTAL_PAGES_HEADER = "x-total-pages";

type CreateNewAppDto = {
  name: string;
  repository: string;
};

class AppsService {
  public constructor(private readonly http: AxiosInstance) {}

  public async findPaginatedApps(page: unknown): Promise<Page<App>> {
    const response = await this.http.get("/apps", {
      params: { page },
    });

    return new Page(
      response.data.map(App.of),
      parseInt(response.headers[TOTAL_PAGES_HEADER])
    );
  }

  public async findAppById(appId: string): Promise<App> {
    const response = await this.http.get(`/apps/${appId}`);

    return App.of(response.data);
  }

  public async deleteAppById(appId: string): Promise<void> {
    await this.http.delete(`/apps/${appId}`);
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
