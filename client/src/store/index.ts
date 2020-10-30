import { InjectionToken } from "tsyringe";

import { Store, AnyAction, createStore, applyMiddleware } from "redux";

import { DefaultRootState } from "react-redux";

import createSagaMiddleware from "redux-saga";

import { Persistor, persistStore } from "redux-persist";

import { rootReducer, rootSaga } from "./modules";

export const STORE_KEY: InjectionToken<Store<DefaultRootState, AnyAction>> =
  "ReduxStore";

function createAppStore(): [Store<any, AnyAction>, Persistor] {
  const sagaMiddleware = createSagaMiddleware();
  const store = createStore(rootReducer, applyMiddleware(sagaMiddleware));

  sagaMiddleware.run(rootSaga);

  return [store, persistStore(store)];
}

export default createAppStore;
