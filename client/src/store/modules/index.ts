import { Reducer } from "react";
import { AnyAction, combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

import { all } from "redux-saga/effects";

import sessionReducer, { SessionState } from "./session/reducer";
import sessionSagas from "./session/sagas";

import appsReducer, { AppsState } from "./apps/reducer";
import appsSagas from "./apps/sagas";

const persistConfig = (key: string) => ({
  key,
  storage,
});

export const rootSaga = function* () {
  return yield all([sessionSagas, appsSagas]);
};

export const rootReducer: Reducer<any, AnyAction> = combineReducers({
  session: persistReducer(persistConfig("session"), sessionReducer),
  apps: appsReducer,
});

declare module "react-redux" {
  export interface DefaultRootState {
    session: SessionState;
    apps: AppsState;
  }
}
