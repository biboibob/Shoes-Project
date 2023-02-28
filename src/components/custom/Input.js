import React, { useState } from "react";

function Input(props) {
  const {
    label,
    value,
    className,
    onChange,
    name,
    type = "text",
    size = "md",
    mandatory,
    error,
    message,
    disabled,
    noLabel,
  } = props;

  const [visiblePass, setVisiblePass] = useState(false);

  return (
    <div className="flex flex-col relative">
      <div className="flex items-center w-full">
        <input
          type={type ? (!visiblePass ? type : "text") : "text"}
          label={noLabel ? "" : label}
          name={name}
          disabled={disabled}
          placeholder={`${label} ${mandatory ? "*" : ""}`}
          className={`${className} ${type === "password" && "!pr-12"} !text-${size} md:text-base p-2.5 md:p-3 rounded-md ${
            disabled ? "!bg-dark-gray-3" : "bg-transparent"
          } text-soft-black placeholder-soft-black border-2 border-soft-black outline-0 w-full`}
          value={value}
          data-mandatory={mandatory || false}
          onChange={onChange}
        />

        {/* Handle Type Password  */}
        {type === "password" && (
          <i
            className={`fas ${
              !visiblePass ? "fa-eye-slash" : "fa-eye"
            } absolute top-6.5 right-4 cursor-pointer`}
            onClick={() => setVisiblePass(visiblePass ? false : true)}
          ></i>
        )}
      </div>

      <span className={`${error ? "block" : "hidden"} text-red-pallete`}>
        {message}
      </span>
    </div>
  );
}

export default Input;
