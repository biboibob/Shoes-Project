import Cookies from "js-cookie";

const tokenService = (function () {
  var _service;
  function _getService() {
    if (!_service) {
      _service = this;
      return _service;
    }
    return _service;
  }
  function _setToken(tokenObj) {
    Cookies.set("accessToken", tokenObj.accessToken);
    Cookies.set("refreshToken", tokenObj.refreshToken);
  }
  function _setNewToken(tokenObj) {
    Cookies.set("accessToken", tokenObj.accessToken);
  }
  function _getAccessToken() {
    return Cookies.get("accessToken");
  }
  function _getRefreshToken() {
    return Cookies.get("refreshToken");
  }
  function _clearToken() {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
  }
  return {
    getService: _getService,
    setToken: _setToken,
    setNewToken: _setNewToken,
    getAccessToken: _getAccessToken,
    getRefreshToken: _getRefreshToken,
    clearToken: _clearToken,
  };
})();
export default tokenService;
