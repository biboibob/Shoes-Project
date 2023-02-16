import { useEffect , useState} from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../config";
import TokenService from "../../utils/Token/tokenService";
import jwt_decode from "jwt-decode";

// Redux Action
import { skeletonToggle } from "../../service/redux/slice/ui";

const PublicRoute = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.userInfo.loginData);
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    setAllowed(false)
    dispatch(skeletonToggle(false))
    const accessToken = TokenService.getService().getAccessToken();
    
    if (
      accessToken && loginData !== null &&
      new Date(
        jwt_decode(TokenService.getService().getAccessToken()).exp * 1000
      ) > new Date()
    ) {
      navigate(PageRoutePath.HOME);
    } else {
      setAllowed(true)
    }

    const Interval = setInterval(() => {
      if (
        accessToken && loginData !== null &&
        new Date(
          jwt_decode(TokenService.getService().getAccessToken()).exp * 1000
        ) > new Date()
      ) {
        navigate(PageRoutePath.HOME);
      }
    }, 3000);

    return () => {
      clearInterval(Interval);
    };
  }, [loginData]);

  return allowed && children;
};

export default PublicRoute;
