import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import API from "../helper/api";

//component
import FormField from "../components/custom/FormField";

function Register() {
  //config
  const api = new API();

  let navigate = useNavigate();

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

    //console.log("Form Change", updatedForm);

    setForm(updatedForm);
  };

  const onHandleRegister = () => {
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
    const params = {
      username: form.Username,
      password: form.Password,
      email: form.Email,
      role: "user",
    };

    api
      .registerUser(params)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ToastContainer />
      <div className="flex flex-col m-auto w-3/12 shadow-2xl">
        <h1 className="text-center text-2xl font-bold bg-primary-color text-white p-3">
          Register Page
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
            label={"Email"}
            name={"Email"}
            value={form.Email}
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

          <FormField
            label={"Confirm Password"}
            name={"ConfirmPassword"}
            value={form.ConfirmPassword}
            onChange={onChangeForm}
            vertical={true}
          />

          <Button variant="contained" onClick={() => onHandleRegister()}>
            Register
          </Button>
        </div>
      </div>
    </>
  );
}

export default Register;
