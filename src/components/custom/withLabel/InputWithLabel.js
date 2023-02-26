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
    mandatory,
    error,
    message,
    disabled,
  } = props;

  return (
    <>
      <div className="flex flex-col gap-1">
        <label className="text-sm md:text-base font-bold">
          {label} {mandatory ? "*" : ""}
        </label>
        <input
          type={type}
          name={name}
          disabled={disabled}
          className={`${className} !text-${size} md:text-base p-2.5 md:p-3 rounded-md ${
            disabled ? "!bg-dark-gray-3" : "bg-transparent"
          } text-soft-black placeholder-soft-black border-2 border-soft-black outline-0 w-full`}
          value={value}
          data-mandatory={mandatory || false}
          onChange={onChange}
        />
      </div>
      <span className={`${error ? "block" : "hidden"} text-red-pallete`}>
        {message}
      </span>
    </>
  );
}

export default textField;
