import User from "models/User";

export enum SessionActionType {
  UPDATE_TOKEN = "@session/update-token",
  UPDATE_TOKEN_SUCCESS = "@session/update-token-success",

  FETCH_USER_SUCCESS = "@session/fetch-user-success",
  FETCH_USER = "@session/fetch-user",

  ERROR = "@session/error",
  LOGOUT = "@session/logout",
}

export const updateTokenAction = (code: string) => ({
  type: SessionActionType.UPDATE_TOKEN,
  payload: code,
});

export const updateTokenSuccessAction = (token: string) => ({
  type: SessionActionType.UPDATE_TOKEN_SUCCESS,
  payload: token,
});

export const fetchUserSuccessAction = (user: User) => ({
  type: SessionActionType.FETCH_USER_SUCCESS,
  payload: user,
});

export const fetchLoggedUserAction = () => ({
  type: SessionActionType.FETCH_USER,
});

export const errorSessionAction = (error: Error) => ({
  type: SessionActionType.ERROR,
  payload: error,
});

export const logoutSessionAction = () => ({
  type: SessionActionType.LOGOUT,
});

// typings

export type SessionAction =
  | UpdateTokenSuccess
  | UpdateToken
  | FetchUserSuccess
  | FetchUser
  | SessionError
  | SessionLogout;

export type SessionError = {
  type: SessionActionType.ERROR;
  payload: Error;
};

export type UpdateToken = {
  type: SessionActionType.UPDATE_TOKEN;
  payload: string; // token from url
};

export type UpdateTokenSuccess = {
  type: SessionActionType.UPDATE_TOKEN_SUCCESS;
  payload: string;
};

export type FetchUserSuccess = {
  type: SessionActionType.FETCH_USER_SUCCESS;
  payload: User;
};

export type SessionLogout = {
  type: SessionActionType.LOGOUT;
};

export type FetchUser = {
  type: SessionActionType.FETCH_USER;
};
