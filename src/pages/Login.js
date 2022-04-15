import React, { useState } from "react";

//component
import FormField from "../components/custom/FormField";

function Login() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const onChangeForm = () => {

  }

  return (
    <div className="flex flex-col m-auto p-10 shadow-2xl">
      <h1>Login Page</h1>

      <FormField 
        label={"Username"}
        value={userName}
        vertical={true}
      />

      <FormField 
        label={"Password"}
        value={userName}
        vertical={true}
      />
     
    </div>
  );
}

export default Login;
