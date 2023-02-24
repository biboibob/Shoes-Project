import React from "react";
import { useSelector } from "react-redux";

/* Skeleton Library */
import Skeleton from "react-loading-skeleton";

function TotalItems({ onChange, value, name, className, size = "medium", idx = 0, max = 999 }) {
  const uiSelector = useSelector((state) => state.userInterface);


  return ( 
    
    !uiSelector.skeleton ?
      (
        <div className={`${className} flex ${size === "medium" ?  "p-2" : size === "small" ? "p-1" : "p-3"} border md:!border-2 border-dark-gray items-center gap-3 rounded-md`}>
          <i className={`${size === "medium" ?  "text-base" : size === "small" ? "text-sm" : "text-lg"} fa-solid fa-minus text-dark-gray cursor-pointer ${value === 1 && "opacity-50"}`} onClick={() => value !== 1 && onChange(name, value - 1, idx)}></i>
          <span className={`${size === "medium" ?  "text-base" : size === "small" ? "text-sm" : "text-lg"} text-soft-green font-bold`}>{value}</span>
          <i className={`${size === "medium" ?  "text-base" : size === "small" ? "text-sm" : "text-lg"} fa-solid fa-plus text-dark-gray cursor-pointer ${value === max && "opacity-50"}`} onClick={() => value !== max && onChange(name, value + 1, idx)}></i>
        </div> 
      )
    :
      (
        <Skeleton wrapper={() => (
          <div className="border-2 w-full border-dark-gray p-3 animate-pulse rounded-lg flex flex-col items-center justify-center">
            <div className="border-t-2 h-2 w-3 border-dark-gray bg-dark-gray rounded-lg"/>
          </div>
        )}/>
      )
  );
}

export default TotalItems;
