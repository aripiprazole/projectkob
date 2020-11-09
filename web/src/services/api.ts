import axios from "axios";

function createAxiosApi() {
  return axios.create();
}

export default createAxiosApi;
