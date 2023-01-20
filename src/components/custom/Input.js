import React from "react";

function textField(props) {
  const { label, value, className, onChange, name, type = "text", noLabel } = props;

  return (
    <input
      type={type}
      label={noLabel ? "" : label}
      name={name}
      placeholder={label}
      className={`${className} text-sm md:text-base p-2.5 md:p-3 rounded-md bg-transparent text-soft-black placeholder-soft-black border-2 border-soft-black outline-0 w-full`}
      value={value}
      onChange={onChange}
    />
  );
}

export default textField;
