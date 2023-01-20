import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../config";
import TokenService from "../../utils/Token/tokenService";
import jwt_decode from "jwt-decode";


const PrivateRoute = ({children}) => {
  const navigate = useNavigate();
  const loginData = useSelector((state) => state.userInfo.loginData);

  useEffect(() => {
    if (loginData === null || new Date(jwt_decode(TokenService.getService().getAccessToken()).exp * 1000) < new Date()) {
      navigate(PageRoutePath.LOGIN);
    }


    const Interval = setInterval(() => {
      if (loginData === null || new Date(jwt_decode(TokenService.getService().getAccessToken()).exp * 1000) < new Date()) {
        navigate(PageRoutePath.LOGIN);
      }
    }, 3000);

    return () => {
      clearInterval(Interval);
    };
  }, [loginData]);

  return children;
};

export default PrivateRoute;
