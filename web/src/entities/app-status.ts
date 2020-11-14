type AppStatusType = {
  type:
    | "start"
    | "stop"
    | "deploy"
    | "kill"
    | "none"
    | "stopped"
    | "started"
    | "deployed";
};

type StoppedType = AppStatusType & {
  type: "stopped";
  code: number;
};

type AppStatus = StoppedType | AppStatusType;

// actions

export const Start: AppStatus = {
  type: "start",
};

export const Stop: AppStatus = {
  type: "stop",
};

export const Kill: AppStatus = {
  type: "kill",
};

export const Deploy = (): AppStatus => ({
  type: "deploy",
});

// states

export const None: AppStatus = {
  type: "none",
};

export const Started: AppStatus = {
  type: "started",
};

export const Deployed: AppStatus = {
  type: "deployed",
};

export const Stopped = (code: number): AppStatus => ({
  type: "stopped",
  code,
});

export default AppStatus;
