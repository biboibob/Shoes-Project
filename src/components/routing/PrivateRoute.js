import React from "react";
import { Route } from "react-router-dom";
// import { Navigate, Outlet } from "react-router-dom";
// import interceptor from "../../utils/Token/interceptor";

const PrivateRoute = ({ children, ...rest }) => {

  console.log(children)
  console.log(...rest)
  return (
    <Route
      {...rest}
      render={() => (children)}
    />

    
  );
};

export default PrivateRoute;
