import React from "react";

function textField(props) {
  const {
    label,
    value,
    className,
    onChange,
    name,
    type = "text",
    size = "md",
    disabled,
    noLabel,
    mandatory = false,
    error,
    message,
    vertical = false,
  } = props;

  return (
    <>
      <textarea
        type={type}
        label={noLabel ? "" : label}
        name={name}
        disabled={disabled}
        placeholder={`${label} ${mandatory ? "*" : ""}`}
        className={`${className} !text-${size} md:text-base p-2.5 md:p-3 rounded-md ${
          disabled ? "!bg-dark-gray-3" : "bg-transparent"
        } text-soft-black placeholder-soft-black border-2 border-soft-black outline-0 w-full`}
        value={value}
        data-mandatory={mandatory || false}
        onChange={onChange}
      />
      <span className={`${error ? "block" : "hidden"} text-red-pallete`}>
        {message}
      </span>
    </>
  );
}

export default textField;
