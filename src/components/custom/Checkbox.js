import React from "react";
import Form from "react-bootstrap/Form";

function Checkbox({ onChange, label, name, noLabel }) {
 
  return (
    <Form.Check
      type={"checkbox"}
      id={`${name}`}
      label={`${noLabel ? "" : label}`}
      onChange={(e) => onChange(name, e.target.checked)}
    />
  );
}

export default Checkbox;
