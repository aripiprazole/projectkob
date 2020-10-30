import produce from "immer";

import User from "models/User";
import { SessionAction, SessionActionType } from "./actions";

export type SessionState = {
  user?: User;
  loading: boolean;
  token?: string;

  error?: Error;
};

const DEFAULT_STATE: SessionState = {
  loading: false,
};

const sessionReducer = (state = DEFAULT_STATE, action: SessionAction) =>
  produce(state, (state) => {
    switch (action.type) {
      case SessionActionType.UPDATE_TOKEN:
        state.loading = true;
        break;

      case SessionActionType.UPDATE_TOKEN_SUCCESS:
        state.token = action.payload;
        break;

      case SessionActionType.FETCH_USER_SUCCESS:
        state.loading = false;
        state.user = action.payload;
        break;

      case SessionActionType.ERROR:
        state.token = undefined;
        state.user = undefined;
        state.loading = false;
        state.error = action.payload;
        break;

      case SessionActionType.LOGOUT:
        state.token = undefined;
        state.user = undefined;
        state.loading = false;
        break;
    }
  });

export default sessionReducer;
