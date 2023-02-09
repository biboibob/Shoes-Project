import React from "react";

import { useSelector } from "react-redux";

/* Skeleton Library */
import Skeleton from "react-loading-skeleton";

function Button({ className, value, onClick, type, disabled }) {
  const uiSelector = useSelector((state) => state.userInterface);

  return !uiSelector.skeleton ? (
    <button
      disabled={disabled}
      type={type ? type : "button"}
      className={`${className} ${disabled && "opacity-50"} bg-soft-black rounded-md text-white font-bold text-base md:text-lg w-full`}
      onClick={onClick}
    >
      {value}
    </button>
  ) : (
    <div className={`rounded-lg !bg-dark-gray animate-pulse h-10 w-32`}></div>
  );
}

export default Button;
