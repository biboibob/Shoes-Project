import React from "react";
import Form from "react-bootstrap/Form";

import { useSelector } from "react-redux";

/* Skeleton Library */
import Skeleton from "react-loading-skeleton";

function Checkbox({ onChange, label, name, noLabel, value = false, type = "checkbox", swapPlacement }) {
  const uiSelector = useSelector((state) => state.userInterface);

  return !uiSelector.skeleton ? (
    <Form.Check
      reverse={swapPlacement}
      type={type}
      checked={value}
      id={`${name}`}
      label={`${noLabel ? "" : label}`}
      className={"text-sm md:text-base m-0"}
      onChange={(e) => onChange && onChange(name, e.target.checked)}
    />
  ) : (
    <Skeleton
      wrapper={() => (
        <div className="h-5 w-2/3 bg-dark-gray animate-pulse rounded-lg" />
      )}
    />
  );
}

export default Checkbox;
