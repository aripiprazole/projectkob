import axios from "axios";
import { STORE_KEY } from "store";
import { container } from "tsyringe";

import { SESSION_SERVICE_KEY } from "./SessionService";

export function createAxiosInstance(path: string = "/") {
  const api = axios.create({
    baseURL: httpApiUrl(path),
  });

  api.interceptors.request.use((config) => {
    if (!container.isRegistered(SESSION_SERVICE_KEY)) return config;

    const state = container.resolve(STORE_KEY).getState();

    config.headers.Authorization = `token ${state.session.token}`;

    if (!config.params) {
      config.params = {};
    }

    return config;
  }, Promise.reject);

  return api;
}

export function createWebSocketInstance(path: string = "/") {
  const webSocket = new WebSocket(webSocketApiUrl(path));

  // if (container.isRegistered(SESSION_SERVICE_KEY)) {
  // const sessionService = container.resolve(SESSION_SERVICE_KEY);
  // const sessionToken = sessionService.findSessionToken();

  // if (sessionToken)
  //   webSocket.send(
  //     JSON.stringify({
  //       Authorization: sessionToken,
  //     })
  //   );
  // }

  return webSocket;
}

export function httpApiUrl(path: string) {
  const schema = window.location.hostname.startsWith("https:")
    ? "https"
    : "http";

  return `${schema}://${process.env.REACT_APP_API_HOST}${path}`;
}

export function webSocketApiUrl(path: string) {
  const schema = window.location.hostname.startsWith("https:") ? "wss" : "ws";

  return `${schema}://${process.env.REACT_APP_API_HOST}${path}`;
}
