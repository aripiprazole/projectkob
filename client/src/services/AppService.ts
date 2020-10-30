import { AxiosInstance } from "axios";

import App from "models/App";

import { AppCreateDto, AppResponseDto } from "dtos/App";
import Page from "dtos/Page";
import { InjectionToken } from "tsyringe";

export const APP_SERVICE_KEY: InjectionToken<AppService> = "AppService";

interface AppService {
  findPaginated(page: number): Promise<Page<App>>;
  findById(id: string): Promise<App>;
  create(data: AppCreateDto): Promise<App>;
}

export class AppServiceImpl implements AppService {
  public constructor(private readonly http: AxiosInstance) {}

  public async findPaginated(page: number): Promise<Page<App>> {
    const { data } = await this.http.get<Page<AppResponseDto>>("/apps", {
      params: {
        page,
      },
    });

    return {
      items: data.items.map(App.ofResponse),
      currentPage: data.currentPage,
      pages: data.pages,
    };
  }

  public async findById(id: string): Promise<App> {
    const response = await this.http.get<AppResponseDto>(`apps/${id}`);

    return App.ofResponse(response.data);
  }

  public async create(data: AppCreateDto): Promise<App> {
    const response = await this.http.post<AppResponseDto>("/apps", data);

    return App.ofResponse(response.data);
  }
}

export default AppService;
