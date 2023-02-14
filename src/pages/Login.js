import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../utils/config";
import API from "../helper/api";
import TokenService from "../utils/Token/tokenService";
import { useDispatch } from "react-redux";

//redux Action
import { addUser } from "../service/redux/slice/user";

//component
import { Input, Button } from "../components/custom";

//asset
import Nike from "../assets/PNG/LogoBlack.png";
import LoadingSpin  from "../assets/SVG/LoadingSpin.svg";

//scss
import LoginStyle from "../styles/Login.module.scss";

// tokenService
const tokenService = TokenService.getService();

function Login() {
  const api = new API();
  let navigate = useNavigate();

  //redux
  const dispatch = useDispatch();

  const [boolLogin, setBoolLogin] = useState(false);

  const [form, setForm] = useState({
    Username: "",
    Password: "",
  });

  const onChangeForm = (event) => {
    const { name, value } = event.target;

    const updatedForm = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);
  };

  const onHandleLogin = (e) => {
    e.preventDefault();
    const validateEmptyArray = Object.values(form).includes("");

    if (validateEmptyArray) {
      toast.info("There's Still Empty Field!");
    } else {
      onLogin();
    }
  };

  const onLogin = () => {
    setBoolLogin(true);
    const params = {
      username: form.Username,
      password: form.Password,
    };

    api
      .checkLoginUser(params)
      .then((res) => {
        if (res.data.status === 200) {
          dispatch(addUser(res.data.data.userInfo));
          navigate(PageRoutePath.HOME);
          tokenService.setToken({
            accessToken: res.data.data.accessToken,
            refreshToken: res.data.data.refreshToken,
          });
        } else {
          toast.info(res.data.message);
        }
      })
      .catch((err) => console.log(err))
      .finally(() => {
        setBoolLogin(false);
      });
  };

  const onNavigate = (val, data) => {
    navigate(val);
  };

  return (
    <div className="flex justify-center h-100 items-center grow bg-white">
      <ToastContainer />
      
      <div className="flex min-h-screen grow shadow-2xl">
        <div className="flex flex-col bg-white w-full gap-4 p-4 md:!p-10 md:basis-2/5">
          <div className="flex relative">
            <img
              src={Nike}
              className="h-5 md:h-10 w-auto absolute"
              alt="logo"
            />
          </div>
          <form
            onSubmit={onHandleLogin}
            className="flex flex-col gap-2 my-auto"
          >
            <div className="flex flex-col gap-1">
              <span className="font-black text-soft-black-color text-2xl md:text-3xl">
                Welcome Back!
              </span>
              <span className="text-dark-gray-4 text-sm md:text-base">
                Let's Find Your Dream Shoes
              </span>
            </div>
            <div className="flex flex-col gap-1">
              <Input
                label={"Username"}
                name={"Username"}
                value={form.UserName}
                onChange={onChangeForm}
                className="my-2"
              />
              <Input
                type="password"
                label={"Password"}
                name={"Password"}
                value={form.Password}
                onChange={onChangeForm}
                className="my-2"
              />
              <span className="flex text-sm md:text-base mt-1">
                Forgot Password ?
              </span>
            </div>

            <Button
              disabled={boolLogin}
              value={
                <span className="relative flex items-center">
                  <img src={LoadingSpin} className={`h-auto w-7 ${!boolLogin && "hidden"}`} alt="loading" />
                  Login
                </span>
              }
              type={"submit"}
              className="p-2 md:p-3 mt-3 !bg-soft-black-color justify-center flex"
            />
          </form>

          <div className="flex flex-col items-center text-sm md:text-base">
            <hr className="mb-3 w-full"></hr>
            <span className="flex mx-auto gap-2">
              Not A Member?
              <span
                className="font-bold cursor-pointer"
                onClick={() => onNavigate(PageRoutePath.REGISTER)}
              >
                Sign Up
              </span>
            </span>
          </div>
        </div>

        <div
          className={`${LoginStyle.HomePhoto} hidden md:flex md:basis-3/5 relative rounded-l-[5rem]`}
        ></div>
      </div>
    </div>
  );
}

export default Login;
