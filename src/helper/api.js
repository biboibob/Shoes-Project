import { APIRoutePath } from "../utils/config";
import Axios from "../utils/Token/interceptor";

export default class API {
  /* Post Section */
  checkLoginUser = (data) => {
    return Axios.post(APIRoutePath.LOGIN, data);
  };

  registerUser = (data) => {
    return Axios.post(APIRoutePath.USER, data);
  };

  getProductList = (data) => {
    return Axios.post(APIRoutePath.PRODUCTS, data);
  };

  getDetailShoes = (data) => {
    return Axios.post(APIRoutePath.DETAIL_SHOES, data);
  };

  getCity = (data) => {
    return Axios.post(APIRoutePath.GET_CITY, data);
  };

  getCourierOption = (data) => {
    return Axios.post(APIRoutePath.GET_COUR_OPTION, data);
  };
  
  /* End Post Section */
  
  /* Get Section */
  getAllUser = () => {
    return Axios.get(APIRoutePath.USER);
  };
  
  homeInitiate = (data) => {
    return Axios.get(APIRoutePath.HOME_INITIATE, data);
  };
  
  getFilterInitiate = (data) => {
    return Axios.get(APIRoutePath.PRODUCTS_FILTER, data);
  };

  getProvince = (data) => {
    return Axios.get(APIRoutePath.GET_PROVINCE);
  };

  getDetailUser = () => {
    return Axios.get(APIRoutePath.DETAIL_USER);
  };


  /* End Get Section */

  /* Patch Section */
  editUser = (data) => {
    return Axios.patch(APIRoutePath.EDIT_USER, data);
  };
  /* End Patch Section */
}
