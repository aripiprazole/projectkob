export const API_URL =
  process.env.REACT_APP_API_URL ?? "http://localhost:8080/";

export const AUTHENTICATION_LINK = API_URL.endsWith("/")
  ? API_URL + "login"
  : API_URL + "/login";
