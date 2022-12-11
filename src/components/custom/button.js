import React from "react";

function Button({ className, value, onClick }) {
  return <button className={`${className} bg-primary-color rounded-md text-white font-bold text-lg w-full`} onClick={() => onClick()}>{value}</button>;
}

export default Button;
