/* Component */
import Swal from "sweetalert2";
import { Checkbox } from "../components/custom/index";

export const valueProcessing = (value, state) => {
  if (Array.isArray(state)) {
    const tmpStateArr = state;
    if (!tmpStateArr.includes(value)) {
      tmpStateArr.push(value);
    } else {
      const indexOf = tmpStateArr.indexOf(value);
      tmpStateArr.splice(indexOf, 1);
    }
    return tmpStateArr;
  } else {
    return value;
  }
};

export const JSXEventOffer = (name, label, form, onChange) => {
  return (
    <Checkbox
      onChange={onChange}
      name={`${name}`}
      value={form[name]?.value}
      label={label}
    />
  );
};

export const Toast = Swal.mixin({
  toast: true,
  position: "top-end",
  showConfirmButton: false,
  timer: 3000,
  customClass: {
    zIndex: 9999999
  },
  showClass: {
    zIndex: 9999999
  },
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});
