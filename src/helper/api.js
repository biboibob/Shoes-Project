import { APIRoutePath } from "../utils/config";
import * as axios from "axios";

export default class API {
  constructor() {
    this.api_token = null;
    this.client = null;
    this.api_url = process.env.REACT_APP_API_URL;
    //this.api_url = process.env.REACT_APP_API_URL_DEV;
  }

  init = () => {
    let headers = {
      Accept: "application/json",
    };

    this.client = axios.create({
      baseURL: this.api_url,
      timeout: 31000,
      headers: headers,
    });

    return this.client;
  };

  registerUser = (data) => {
    return this.init().post(APIRoutePath.USER, data);
  };

  checkLoginUser = (data) => {
    return this.init().post(APIRoutePath.AUTH_USER, data)
  }
}
