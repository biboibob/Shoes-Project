/* Component */
import Swal from "sweetalert2";
import { Checkbox } from "../components/custom/index";
import ColorClassifier from "color-classifier"
import * as Constants from "./Constant";
import moment from "moment";

export const valueProcessing = (value, state) => {
  if (Array.isArray(state)) {
    const tmpStateArr = state;
    if(Array.isArray(value)) {
      value.map((result) => {
        if (!tmpStateArr.includes(result)) {
          tmpStateArr.push(result);
        } else {
          const indexOf = tmpStateArr.indexOf(result);
          tmpStateArr.splice(indexOf, 1);
        }
      })
    } else {
      if (!tmpStateArr.includes(value)) {
        tmpStateArr.push(value);
      } else {
        const indexOf = tmpStateArr.indexOf(value);
        tmpStateArr.splice(indexOf, 1);
      }
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
    zIndex: 9999999,
  },
  showClass: {
    zIndex: 9999999,
  },
  timerProgressBar: true,
  didOpen: (toast) => {
    toast.addEventListener("mouseenter", Swal.stopTimer);
    toast.addEventListener("mouseleave", Swal.resumeTimer);
  },
});

export const MandatoryCheck = (e, state) => {
  let flagStatus = {
    flagOfMandatory: false,
    flagOfEmail: false,
  };
  let formDataMandatory = [];

  for (var i = 0; i < e.target.elements.length; i++) {
    if (
      e.target.elements[i].tagName.toLowerCase() === "input" ||
      e.target.elements[i].tagName.toLowerCase() === "textarea" ||
      e.target.elements[i].tagName.toLowerCase() === "select"
    ) {
      if (e.target.elements[i].dataset.mandatory === "true") {
        formDataMandatory.push({
          name: e.target.elements[i].name,
          value: e.target.elements[i].value,
        });
      }
    }
  }

  for (const key in state) {
    const matched = formDataMandatory.find((val) => val.name === key);

    if (matched) {
      if (matched.value.length > 0) {
        state = {
          ...state,
          [key]: {
            ...state[key],
            statusErr: false,
            message: Constants.MESSAGE.REQUIRED,
          },
        };
      } else {
        //if input mandatory and input is email
        flagStatus.flagOfMandatory = true;
        state = {
          ...state,
          [key]: {
            ...state[key],
            statusErr: true,
            message: Constants.MESSAGE.REQUIRED,
          },
        };
      }
    }
  }

  return {
    message: flagStatus.flagOfMandatory && Constants.MESSAGE.ALL_REQUIRED,
    flag: Object.values(flagStatus).some((val) => val === true),
    state,
  };
};

export const Capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const IDRToUSD = (number) => {
  return parseFloat((number / 16000).toFixed(1));
};

export const colorClassification = (val) => {
  const colorClassifier = new ColorClassifier();
  const results = colorClassifier.classifyFromArray(val, "hex");
  return results
};

export const formatDate = (val) => {
  const formatedData = moment(val).format(`DD MMM, HH:mm`)
  return formatedData
}

