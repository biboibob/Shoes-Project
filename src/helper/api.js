import { APIRoutePath } from "../utils/config";
import Axios from "../utils/Token/interceptor"


export default class API {
  checkLoginUser = (data) => {
    return Axios.post(APIRoutePath.LOGIN, data);
  };

  registerUser = (data) => {
    return Axios.post(APIRoutePath.USER, data);
  };

  getAllUser = () => {
    return Axios.get(APIRoutePath.USER);
  };

  editUser = (data) => {
    return Axios.patch(APIRoutePath.EDIT_USER, data);
  };
  
}

