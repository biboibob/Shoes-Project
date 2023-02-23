import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { PageRoutePath } from "../utils/config";
import API from "../helper/api";

//component
import FormField from "../components/custom/Input";

//asset
import Nike from "../assets/PNG/LogoBlack.png";
import LoadingSpin from "../assets/SVG/LoadingSpin.svg";

//component
import { Input, Button } from "../components/custom";

//scss
import LoginStyle from "../styles/Login.module.scss";

function Register() {
  //config
  const api = new API();

  let navigate = useNavigate();

  const [boolRegister, setBoolRegister] = useState(false);

  const [form, setForm] = useState({
    Username: "",
    Password: "",
    ConfirmPassword: "",
    Email: "",
  });

  const onChangeForm = (event) => {
    const { name, value } = event.target;

    const updatedForm = {
      ...form,
      [name]: value,
    };

    setForm(updatedForm);
  };

  const onHandleRegister = (e) => {
    e.preventDefault()
    const validateEmptyArray = Object.values(form).includes("");

    if (validateEmptyArray) {
      toast.info("There's Still Empty Field!");
    } else if (form.Password !== form.ConfirmPassword) {
      toast.info("Your Password doesn't match");
    } else {
      onRegister();
    }
  };

  const onRegister = () => {
    setBoolRegister(true)
    const params = {
      username: form.Username,
      password: form.Password,
      email: form.Email,
      role: "user",
    };

    api
      .registerUser(params)
      .then((res) => {
        toast.success("Register Successfull");
      })
      .catch((err) => {
        console.log(err);
      })
      .finally((res) => {
        setBoolRegister(false)
        setForm({
          Username: "",
          Password: "",
          ConfirmPassword: "",
          Email: "",
        });
        onNavigate(PageRoutePath.LOGIN)
      });
  };

  const onNavigate = (val, data) => {
    navigate(val);
  };

  return (
    <>
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
          <form  onSubmit={onHandleRegister} className="flex flex-col gap-2 my-auto">
            <div className="flex flex-col gap-1">
              <span className="font-black text-soft-black-color text-2xl md:text-3xl">
                Sign Up
              </span>
              <span className="text-dark-gray-4 text-sm md:text-base">
                Please Fill Your Personal Information
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
                label={"Confirm Password"}
                name={"ConfirmPassword"}
                value={form.ConfirmPassword}
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
              <Input
                label={"Email"}
                name={"Email"}
                value={form.Email}
                onChange={onChangeForm}
                className="my-2"
              />
            </div>

            <Button
              disabled={boolRegister}
               value={
                <span className="relative flex justify-center items-center">
                  <img
                    src={LoadingSpin}
                    className={`h-auto w-7 ${!boolRegister && "hidden"}`}
                    alt="loading"
                  />
                  Sign Up
                </span>
              }
              type={"submit"}
              className="p-2 md:p-3 mt-3 !bg-soft-black-color"
            />
          </form>

          <div className="flex flex-col items-center text-sm md:text-base">
            <hr className="mb-3 w-full"></hr>
            <span className="flex mx-auto gap-2">
              Already Have an Account?
              <span
                className="font-bold cursor-pointer"
                onClick={() => onNavigate(PageRoutePath.LOGIN)}
              >
                Sign In
              </span>
            </span>
          </div>
        </div>

        <div
          className={`${LoginStyle.HomePhoto} hidden md:flex md:basis-3/5 relative rounded-l-[5rem]`}
        ></div>
      </div>
    </>
  );
}

export default Register;
