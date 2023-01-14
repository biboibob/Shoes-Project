import React from "react";

import { useSelector } from "react-redux";

/* Skeleton Library */
import Skeleton from "react-loading-skeleton";

function Button({ className, value, onClick }) {
  const uiSelector = useSelector((state) => state.userInterface);

  return !uiSelector.skeleton ? (
    <button
      className={`${className} bg-primary-color rounded-md text-white font-bold text-lg w-full`}
      onClick={() => onClick()}
    >
      {value}
    </button>
  ) : (
    <div className={`rounded-lg !bg-dark-gray animate-pulse h-10 w-32`}></div>
  );
}

export default Button;