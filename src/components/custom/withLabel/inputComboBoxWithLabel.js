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
      <div className="flex flex-col gap-1">
        <label className="text-sm md:text-base font-bold">
          {label} {mandatory ? "*" : ""}
        </label>
        <Form.Select
          onChange={onChange}
          name={name}
          value={value}
          disabled={disabled}
          data-mandatory={mandatory || false}
          aria-label="Default select example"
          className={`${className} !text-${size} md:text-base p-2.5 md:p-3 rounded-md ${
            disabled ? "!bg-dark-gray-3" : "bg-white"
          } !text-black placeholder-soft-black border-2 border-soft-black outline-0 w-full`}
        >
          <option
            hidden
            className="!text-soft-black"
            label={"-- Select Option Below --"}
          >
            -- Select Option Below --
          </option>
          {option.map((val, idx) => (
            <option
              className="!text-soft-black"
              value={val.value}
              label={val.label}
              key={idx}
            >
              {val.value}
            </option>
          ))}
        </Form.Select>
        <span className={`${error ? "block" : "hidden"} text-red-pallete`}>
          {message}
        </span>
      </div>
    </>
  );
}

export default comboBox;
