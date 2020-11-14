import axios from "axios";

import { API_URL } from "~/config";

function createAxiosApi() {
  return axios.create({
    baseURL: API_URL,
  });
}

export default createAxiosApi;
