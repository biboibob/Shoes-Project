import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../config";

const PrivateRoute = ({children}) => {
  const navigate = useNavigate();
  const loginData = useSelector((state) => state.userInfoStore);
  useEffect(() => {
    if (loginData.username.length === 0) {
      navigate(PageRoutePath.LOGIN);
    }
  }, [loginData]);

  return children;
};

export default PrivateRoute;
