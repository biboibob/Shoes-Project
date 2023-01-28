import axios from "axios";
import TokenService from "./tokenService";
//import ModalToken from "../../components/template/ModalToken";
// import { useNavigate } from "react-router-dom";

import { store } from "../../service/redux/store";
import { removeUser } from "../../service/redux/slice/user";


const { dispatch } = store;

// tokenService
const tokenService = TokenService.getService();
let refreshTokenPromise;

const AxiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL_DEV /*Dev Only*/,
  // baseURL: process.env.REACT_APP_API_URL,  /*Production*/
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
      dispatch(removeUser())
      return Promise.reject(error);
    }
    if (error.response.status === 403 && !originalRequest._retry) {
      originalRequest._retry = true;
      if (!refreshTokenPromise) {
        refreshTokenPromise = getRefreshToken().then((token) => {
          refreshTokenPromise = null; // clear state
          return token; // resolve with the new token
        });
      }
      
      return refreshTokenPromise.then(() => {
        AxiosInstance.defaults.headers.common["Authorization"] =
        "Bearer " + tokenService.getAccessToken();
        
        return AxiosInstance.request(originalRequest);
      });

      // ******* Issued Way With Parallel Request ****** //

      //const refreshToken = tokenService.getRefreshToken();
      // return AxiosInstance.post("/authServer/refreshToken", {
      //   token: refreshToken,
      // })
      //   .then((res) => {
      //     if (res.status === 200) {
      //       tokenService.setToken({
      //         accessToken: res.data.accessToken,
      //         refreshToken: res.data.refreshToken,
      //       });
      //       AxiosInstance.defaults.headers.common["Authorization"] =
      //         "Bearer " + tokenService.getAccessToken();

      //       return AxiosInstance.request(originalRequest);
      //     }
      //   })

      // ******* End ****** //
    }
    return Promise.reject(error);
  }
);

const getRefreshToken = () =>
  AxiosInstance.post("/authServer/refreshToken", {
    token: tokenService.getRefreshToken(),
  }).then((res) => {
    tokenService.setToken({
      accessToken: res.data.accessToken,
      refreshToken: res.data.refreshToken,
    });

    return res.data.refreshToken;
  });

export default AxiosInstance;
