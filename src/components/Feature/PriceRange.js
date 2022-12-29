import React from "react";
import { useSelector } from "react-redux";

/* Skeleton Library */
import Skeleton from "react-loading-skeleton";

function PriceRange({ label, onChange, name }) {
  const uiSelector = useSelector((state) => state.userInterface);

  const RegexValue = (val) => {
    const value = val.replace(/\D/g, "");
    return value;
  };

  return !uiSelector.skeleton ? (
    <div className="flex gap-2 justify-between">
      <input
        value={label}
        className="bg-dark-gray-2 text-dark-gray-3 font-bold text-center w-full py-2 px-3 rounded-lg"
        disabled
      />
      <input
        type={"number"}
        onChange={(e) => onChange(name, RegexValue(e.target.value))}
        className="border-3 border-dark-gray-2 bg-inherit font-bold text-center w-full p-2 rounded-lg"
      />
    </div>
  ) : (
    <Skeleton
      wrapper={() => (
        <div className="h-5 w-2/3 bg-dark-gray animate-pulse rounded-lg" />
      )}
    />
  );
}

export default PriceRange;
