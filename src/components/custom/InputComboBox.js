import React from "react";
import Form from "react-bootstrap/Form";

function comboBox(props) {
  const {
    label,
    value,
    className,
    onChange,
    name,
    disabled,
    mandatory,
    error,
    message,
    option,
    size = "md",
  } = props;

  return (
    <>
      <Form.Select
        onChange={onChange}
        name={name}
        value={value}
        disabled={disabled}
        data-mandatory={mandatory || false}
        aria-label="Default select example"
        className={`${className} !text-${size} md:text-base p-2.5 md:p-3 rounded-md ${
          disabled ? "!bg-dark-gray-3" : "bg-white"
        } text-soft-black placeholder-soft-black border-2 border-soft-black outline-0 w-full`}
      >
        <option
          hidden
          className="!text-soft-black"
          label={`${label}
          ${mandatory && " *"}`}
        />
        {option.map((val, idx) => (
          <option
            className="!text-soft-black"
            value={val.value}
            label={val.label}
            key={idx}
          />
        ))}
      </Form.Select>
      <span className={`${error ? "block" : "hidden"} text-red-pallete`}>
        {message}
      </span>
    </>
  );
}

export default comboBox;
