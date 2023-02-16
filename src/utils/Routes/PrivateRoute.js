import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../config";
import TokenService from "../../utils/Token/tokenService";
import jwt_decode from "jwt-decode";

// Redux Action
import { resetUI } from "../../service/redux/slice/ui";
import { resetCart } from "../../service/redux/slice/cart";
import { resetUser } from "../../service/redux/slice/user";


const PrivateRoute = ({children}) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.userInfo.loginData);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(false)
    const accessToken = TokenService.getService().getAccessToken();

    // Note : 
    // To Recall Why you add 60000 (1 Minutes) milisecond additional to your validation below, the purpose is to
    // give a chance for refresh token to be hitted if your're still in the application but your access
    // token is expired coincidentally.

    if (!accessToken || loginData === null || new Date((jwt_decode(TokenService.getService().getAccessToken()).exp * 1000) + 60000) < new Date()) {
      dispatch(resetUI())
      dispatch(resetCart())
      dispatch(resetUser())
      navigate(PageRoutePath.LOGIN);
    } else {
      setAllowed(true)
    }

    const Interval = setInterval(() => {
      if (!accessToken || loginData === null || new Date((jwt_decode(TokenService.getService().getAccessToken()).exp * 1000) + 60000) < new Date()) {
        navigate(PageRoutePath.LOGIN);
      } 
    }, 3000);

    return () => {
      clearInterval(Interval);
    };
  }, [loginData]);

  return allowed && children;
};

export default PrivateRoute;
