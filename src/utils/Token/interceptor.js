import axios from "axios";
import TokenService from "./tokenService";
//import ModalToken from "../../components/template/ModalToken";
// import { useNavigate } from "react-router-dom";

// tokenService
const tokenService = TokenService.getService();

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL_DEV /*Dev Only*/,
  //baseURL: process.env.REACT_APP_API_URL,  /*Production*/
  timeout: 31000,
  headers: {
    Accept: "application/json",
  },
});

// Add a request interceptor
AxiosInstance.interceptors.request.use(
  (config) => {
    const token = tokenService.getAccessToken();
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    //config.headers['Content-Type'] = 'application/json';
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

//Add a response interceptor
AxiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  function (error) {
    const originalRequest = error.config;
    if (
      error.response.status === 403 &&
      originalRequest.url === "/authServer/refreshToken"
    ) {
      console.log("i got hit?");
      //console.log("this token has been change");
      return Promise.reject(error);
    }

    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      const refreshToken = tokenService.getRefreshToken();
      return AxiosInstance.post("/authServer/refreshToken", {
        token: refreshToken,
      }).then((res) => {
        if (res.status === 200) {
          tokenService.setNewToken({
            accessToken: res.data.accessToken,
          });
          AxiosInstance.defaults.headers.common["Authorization"] =
            "Bearer " + tokenService.getAccessToken();

          return AxiosInstance(originalRequest);
        }
      });
    }
    return Promise.reject(error);
  }
);

export default AxiosInstance;
