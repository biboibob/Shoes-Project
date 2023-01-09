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
import Nike from "../assets/PNG/Logo.png";

//scss
import LoginStyle from "../styles/Login.module.scss";

// tokenService
const tokenService = TokenService.getService();

function Login() {
  const api = new API();
  let navigate = useNavigate();

  //redux
  const dispatch = useDispatch();

  const [boolRegister, setBoolboolRegister] = useState(false);

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

    //console.log("Form Change", updatedForm);

    setForm(updatedForm);
  };

  const onHandleLogin = () => {
    const validateEmptyArray = Object.values(form).includes("");

    if (validateEmptyArray) {
      toast.info("There's Still Empty Field!");
    } else {
      onLogin();
    }
  };

  const onLogin = () => {
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
      .catch((err) => console.log(err));
  };

  const onNavigate = (val, data) => {
    navigate(val);
  };

  return (
    <div className="flex flex-col h-100 bg-gray-50">
      <ToastContainer />
      <div className="flex my-auto container px-0 shadow-2xl">
        <div
          className={`${LoginStyle.HomePhoto} hidden md:flex md:w-3/5 relative`}
        >
          <img
            src={Nike}
            width={70}
            className="absolute top-5 left-5"
            alt="logo"
          />
        </div>

        <div className="flex flex-col bg-white w-full p-5 md:w-2/5">
          <img src={Nike} width={100} className="flex mx-auto" alt="logo" />
          <span className="text-center font-black my-3 text-2xl">
            Your Sport Companion.
          </span>
          <div className="flex flex-col gap-1 my-5">
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
            <span className="flex text-base mt-1">Forgot Password ?</span>
          </div>

          <Button
            value={"Login"}
            onClick={() => onHandleLogin()}
            className="p-3"
          />

          <hr className="mt-28 mb-3"></hr>

          <span className="mx-auto">
            Not A Member?{" "}
            <span
              className="font-bold"
              onClick={() => onNavigate(PageRoutePath.REGISTER)}
            >
              Join Now!
            </span>
          </span>
        </div>

        
      </div>
    </div>
  );
}

{
  /* <Input
label={"Username"}
name={"Username"}
value={form.UserName}
onChange={onChangeForm}

/>

<Input
label={"Password"}
name={"Password"}
value={form.Password}
onChange={onChangeForm}
/>

<Button variant="contained" >
Login
</Button> */
}

// onClick={() => onNavigate(PageRoutePath.REGISTER)}

export default Login;
