import React from "react";

function TotalItems({ onChange, value, name, className, size = "medium", idx = 0 }) {
  return (
    <div className={`${className} flex ${size === "medium" ?  "p-2" : size === "small" ? "p-1" : "p-3"} border-2 border-dark-gray items-center gap-3 rounded-md`}>
      <i className={`${size === "medium" ?  "text-base" : size === "small" ? "text-sm" : "text-lg"} fa-solid fa-minus text-dark-gray cursor-pointer ${value === 1 && "opacity-50"}`} onClick={() => value !== 1 && onChange(name, value - 1, idx)}></i>
      <span className={`${size === "medium" ?  "text-base" : size === "small" ? "text-sm" : "text-lg"} text-soft-green font-bold`}>{value}</span>
      <i className={`${size === "medium" ?  "text-base" : size === "small" ? "text-sm" : "text-lg"} fa-solid fa-plus text-dark-gray cursor-pointer`} onClick={() => onChange(name, value + 1, idx)}></i>
    </div>
  );
}

export default TotalItems;
