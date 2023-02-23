import React from "react";
import ReactSlider from "react-slider";

import "../../styles/components/shoeRange.scss";

function ShoesRange({
  name = "shoesRange",
  onChange,
  className = "",
  distance = 5,
  defaultValue = [19, 50],
  min = 19,
  max = 50,
}) {
  const onChangeValue = (state) => {
    onChange(name, state);
  };

  return (
    <ReactSlider
      min={min}
      max={max}
      className={`horizontal-slider ${className}`}
      thumbClassName="thumb"
      trackClassName="track"
      defaultValue={defaultValue}
      ariaLabel={["Lower thumb", "Upper thumb"]}
      ariaValuetext={(state) => `Thumb value ${state.valueNow}`}
      renderThumb={(props, state) => <div {...props}>{}</div>}
      pearling
      minDistance={distance}
      onChange={onChangeValue}
    />
  );
}

export default ShoesRange;
