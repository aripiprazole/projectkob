import { AxiosInstance } from "axios";
import { Observable } from "rxjs";

import App, { AppState, getAppStateFromString } from "models/App";
import { createWebSocketInstance } from "services";
import { InjectionToken } from "tsyringe";

export const DAEMON_SERVICE_KEY: InjectionToken<DaemonService> =
  "DaemonService";

interface DaemonService {
  listenState(app: App): Observable<AppState>;

  deploy(app: App): Promise<void>;
  stop(app: App): Promise<void>;
  start(app: App): Promise<void>;
  kill(app: App): Promise<void>;
}

export class DaemonServiceImpl implements DaemonService {
  public constructor(private readonly http: AxiosInstance) {}

  public listenState(app: App): Observable<AppState> {
    return new Observable((subscriber) => {
      const webSocket = createWebSocketInstance(`/apps/${app.id}/state`);

      webSocket.onmessage = (message) => {
        console.log("Receiving message: ", message);
        console.log("Updating ", app, " state");
        console.log();

        subscriber.next(getAppStateFromString(message.data.toString()));
      };
    });
  }

  public async stop(app: App) {
    await this.http.post(`/apps/${app.id}/stop`);
  }

  public async start(app: App): Promise<void> {
    await this.http.post(`/apps/${app.id}/start`);
  }

  public async kill(app: App): Promise<void> {
    await this.http.post(`/apps/${app.id}/kill`);
  }

  public async deploy(app: App): Promise<void> {
    await this.http.post(`/apps/${app.id}/deploy`);
  }
}

export default DaemonService;
