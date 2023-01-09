/* Component */
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
    )
}
