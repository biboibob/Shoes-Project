import React from "react";
import Form from "react-bootstrap/Form";

import { useSelector } from "react-redux";

/* Skeleton Library */
import Skeleton from "react-loading-skeleton";

function Checkbox({
  onChange,
  label,
  name,
  noLabel,
  value = false,
  type = "checkbox",
  swapPlacement,
  className,
}) {
  const uiSelector = useSelector((state) => state.userInterface);

  return !uiSelector.skeleton ? (
    <Form.Check
      reverse={swapPlacement}
      id={`${name}`}
      className={`${className ? className : ""} text-sm md:text-base m-0`}
    >
      <Form.Check.Label
        checked={value}
        onChange={(e) => onChange && onChange(name, e.target.checked)}
      >
        {noLabel ? "" : label}
      </Form.Check.Label>
      <Form.Check.Input
        checked={value}
        type={type}
        onChange={(e) => onChange && onChange(name, e.target.checked)}
      />
    </Form.Check>
  ) : (
    <Skeleton
      wrapper={() => (
        <div className="h-5 w-2/3 bg-dark-gray animate-pulse rounded-lg" />
      )}
    />
  );
}

export default Checkbox;
