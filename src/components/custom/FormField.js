import React from "react";

function textField(props) {
  const {
    vertical,
    label,
    value,
    className,
    onChange,
    name,
    type = "text",
  } = props;

  return (
    <div
      className={`flex gap-2 ${
        !vertical ? "flex-row" : "flex-col"
      } ${className}`}
    >
      <div className={`${!vertical ? "w-25" : "w-full"}`}>
        <span>{label} :</span>
      </div>
      <div className={`${!vertical ? "w-75" : "w-full"}`}>
        <input
          type={type}
          label={label}
          name={name}
          className="border-solid border-2 border-black w-full"
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
}

export default textField;
