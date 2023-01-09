import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../config";

const PrivateRoute = ({children}) => {
  const navigate = useNavigate();
  const loginData = useSelector((state) => state.userInfo.loginData);
  useEffect(() => {
    if (loginData === null) {
      navigate(PageRoutePath.LOGIN);
    }
  }, [loginData]);

  return children;
};

export default PrivateRoute;
