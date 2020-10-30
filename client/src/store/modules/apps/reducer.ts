import Page from "dtos/Page";
import produce from "immer";
import App from "models/App";
import { AppsAction, AppsActionType } from "./actions";

export type AppsState = {
  apps?: Page<App>;
  loading: boolean;
  error?: Error;
};

const DEFAULT_STATE: AppsState = {
  loading: true,
};

const appsReducer = (state = DEFAULT_STATE, action: AppsAction) =>
  produce(state, (state) => {
    switch (action.type) {
      case AppsActionType.FETCH_APPS:
        state.loading = true;
        break;

      case AppsActionType.FETCH_APPS_ERROR:
        state.apps = undefined;
        state.loading = false;
        state.error = action.payload;
        break;

      case AppsActionType.FETCH_APPS_SUCCESS:
        state.apps = action.payload;
        state.loading = false;
        state.error = undefined;
        break;
    }
  });

export default appsReducer;
