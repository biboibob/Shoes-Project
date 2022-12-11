import React from "react";

function PriceRange({ label, onChange, name }) {
  const RegexValue = (val) => {
    const value = val.replace(/\D/g, "");
    return value;
  };

  return (
    <div className="flex gap-2 justify-between">
      <input
        value={label}
        className="bg-dark-gray-2 text-dark-gray-3 font-bold text-center w-[5rem] py-2 px-3 rounded-lg xl:w-full"
        disabled
      />
      <input
        type={"number"}
        onChange={(e) => onChange(name, RegexValue(e.target.value))}
        className="border-3 border-dark-gray-2 bg-inherit font-bold text-center w-[5rem] p-2 rounded-lg xl:w-full"
      />
    </div>
  );
}

export default PriceRange;
