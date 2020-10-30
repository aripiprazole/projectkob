import Page from "dtos/Page";
import App from "models/App";
import { all, call, put, takeEvery } from "redux-saga/effects";
import { APP_SERVICE_KEY } from "services/AppService";
import { container } from "tsyringe";
import {
  AppsActionType,
  FetchApps,
  fetchAppsErrorAction,
  fetchAppsSuccessAction,
} from "./actions";

function* fetchAppsSaga({ payload }: FetchApps) {
  console.log("@apps -> FETCH_APPS");

  const { page } = payload;

  const appsService = container.resolve(APP_SERVICE_KEY);

  try {
    const apps: Page<App> = yield call(() => appsService.findPaginated(page));

    console.log("@apps -> FETCH_APPS_SUCCESS", apps);

    yield put(fetchAppsSuccessAction(apps));
  } catch (error) {
    console.log("@apps -> FETCH_APPS_ERROR", error);

    yield put(fetchAppsErrorAction(error));
  }
}

export default all([takeEvery(AppsActionType.FETCH_APPS, fetchAppsSaga)]);
