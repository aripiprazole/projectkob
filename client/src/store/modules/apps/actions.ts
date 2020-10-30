import Page from "dtos/Page";
import App from "models/App";

export enum AppsActionType {
  FETCH_APPS = "@apps/fetch-apps",
  FETCH_APPS_ERROR = "@apps/fetch-apps-error",
  FETCH_APPS_SUCCESS = "@apps/fetch-apps-success",
}

export const fetchAppsAction = (page: number) => ({
  type: AppsActionType.FETCH_APPS,
  payload: {
    page,
  },
});

export const fetchAppsErrorAction = (error: Error) => ({
  type: AppsActionType.FETCH_APPS_ERROR,
  payload: error,
});

export const fetchAppsSuccessAction = (apps: Page<App>) => ({
  type: AppsActionType.FETCH_APPS_SUCCESS,
  payload: apps,
});

// typings
export type AppsAction = FetchApps | FetchAppsError | FetchAppsSuccess;

export type FetchApps = {
  type: AppsActionType.FETCH_APPS;
  payload: {
    page: number;
  };
};

export type FetchAppsError = {
  type: AppsActionType.FETCH_APPS_ERROR;
  payload: Error;
};

export type FetchAppsSuccess = {
  type: AppsActionType.FETCH_APPS_SUCCESS;
  payload: Page<App>;
};
