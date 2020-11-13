type AppStatusType = {
  type:
    | "none"
    | "stopped"
    | "stopping"
    | "killing"
    | "started"
    | "starting"
    | "deployed";
};

type StoppedType = AppStatusType & {
  type: "stopped";
  code: number;
};

type AppStatus = StoppedType | AppStatusType;

export const Starting: AppStatus = {
  type: "starting",
};

export const None: AppStatus = {
  type: "none",
};

export const Stopping: AppStatus = {
  type: "stopping",
};

export const Killing: AppStatus = {
  type: "killing",
};

export const Started: AppStatus = {
  type: "starting",
};

export const Stopped = (code: number): StoppedType => ({
  type: "stopped",
  code,
});

export default AppStatus;
