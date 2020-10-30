import { AppResponseDto } from "dtos/App";
import { BehaviorSubject } from "rxjs";

export enum AppState {
  STOPPED = "stopped",
  STOPPING = "stopping",
  STARTING = "starting",
  STARTED = "started",
}

export function getAppStateFromString(raw: string): AppState {
  return raw as AppState;
}

class App {
  public constructor(
    public id: string,
    public name: string,
    public image: string
  ) {}

  public readonly state$: BehaviorSubject<AppState> = new BehaviorSubject<
    AppState
  >(AppState.STOPPED);

  public static ofResponse(data: AppResponseDto) {
    return new App(data.id, data.name, data.image);
  }
}

export default App;
