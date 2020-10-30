import User from "models/User";

import { all, call, put, takeEvery } from "redux-saga/effects";

import { container } from "tsyringe";

import { SESSION_SERVICE_KEY } from "services/SessionService";

import {
  errorSessionAction,
  fetchLoggedUserAction,
  fetchUserSuccessAction,
  UpdateToken,
  SessionActionType,
  updateTokenSuccessAction,
} from "./actions";
import OAuth2Response from "dtos/OAuth2Response";

function* fetchUserSaga() {
  console.log("@session -> FETCH_USER");

  const sessionService = container.resolve(SESSION_SERVICE_KEY);

  try {
    const user: User = yield call(() => sessionService.findLoggedUser());

    console.log("@session -> FOUND_USER", user);

    yield put(fetchUserSuccessAction(user));
  } catch (error) {
    console.log("@session -> FETCH_USER_ERROR", error);

    yield put(errorSessionAction(error));
  }
}

function* updateTokenSaga({ payload: code }: UpdateToken) {
  console.log("@session -> UPDATE_TOKEN");

  const sessionService = container.resolve(SESSION_SERVICE_KEY);

  try {
    const response: OAuth2Response = yield call(() =>
      sessionService.findAccessToken(code)
    );

    console.log("@session -> OAUTH2_RESPONSE", {
      ...response,
      accessToken: "NONE",
    }); // remove access token from console

    yield put(updateTokenSuccessAction(response.accessToken));
  } catch (error) {
    console.log("@session -> UPDATE_TOKEN_ERROR", error);

    yield put(errorSessionAction(error));

    return;
  }

  console.log("@session -> NEXT: FETCH_USER");
  yield put(fetchLoggedUserAction());
}

export default all([
  takeEvery(SessionActionType.FETCH_USER, fetchUserSaga),
  takeEvery(SessionActionType.UPDATE_TOKEN, updateTokenSaga),
]);
