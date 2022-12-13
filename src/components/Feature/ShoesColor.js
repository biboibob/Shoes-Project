import React from "react";

function ShoesColor({ colors, onChange, selected, name = "color" }) {
  return (
    <div className="flex gap-2">
      {colors.map((val, idx) => {
        return (
          <div
            className={`w-[1.8rem] h-[1.8rem] md:w-[2rem] md:h-[2rem] rounded-full border-3 cursor-pointer ${
              val === selected ? "border-stone-400" : "border-white"
            }`}
            style={{ backgroundColor: val }}
            key={idx}
            onClick={() => onChange(name, val)}
          />
        );
      })}
    </div>
  );
}

export default ShoesColor;
