import React, { useState } from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../utils/config";

//component
import FormField from "../components/custom/FormField";

function Login() {
  let navigate = useNavigate();

  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onChangeForm = () => {};

  const onNavigate = (val, data) => {
    navigate(val);
  };

  return (
    <div className="flex flex-col m-auto w-3/12 shadow-2xl">
      <h1 className="text-center text-2xl font-bold bg-primary-color text-white p-3">
        Login Page
      </h1>
      <div className="flex flex-col px-10 py-6 gap-5">
        <FormField label={"Username"} value={userName} vertical={true} />

        <FormField label={"Password"} value={userName} vertical={true} />

        <Button variant="contained">Login</Button>

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
  );
}

export default Login;
