import React, { useState } from "react";
import Button from "@mui/material/Button";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../utils/config";
import API from "../helper/api";

//component
import FormField from "../components/custom/FormField";

function Login() {
  const api = new API();
  let navigate = useNavigate();

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

  const onHandleRegister = () => {
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
          navigate(PageRoutePath.HOME);
        } else {
          toast.info(res.data.content);
        }
      })
      .catch((err) => console.log(err));
  };

  const onNavigate = (val, data) => {
    navigate(val);
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col m-auto w-3/12 shadow-2xl">
        <h1 className="text-center text-2xl font-bold bg-primary-color text-white p-3">
          Login Page
        </h1>
        <div className="flex flex-col px-10 py-6 gap-5">
          <FormField
            label={"Username"}
            name={"Username"}
            value={form.UserName}
            onChange={onChangeForm}
            vertical={true}
          />

          <FormField
            label={"Password"}
            name={"Password"}
            value={form.Password}
            onChange={onChangeForm}
            vertical={true}
          />

          <Button variant="contained" onClick={() => onHandleRegister()}>
            Login
          </Button>

          <span className="text-sm text-center mt-5">
            Don't have an account yet?{" "}
            <span
              onClick={() => onNavigate(PageRoutePath.REGISTER)}
              className="font-bold cursor-pointer hover:text-primary-color"
            >
              Create Account
            </span>
          </span>
        </div>
      </div>
    </>
  );
}

export default Login;
