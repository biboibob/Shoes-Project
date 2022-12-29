import React from "react";
import { useSelector } from "react-redux";

/* Skeleton Library */
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ShoesColor({ colors, onChange, selected, name = "color" }) {
  /* Redux */
  const uiSelector = useSelector((state) => state.userInterface);

  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex flex-wrap gap-2">
      {!uiSelector.skeleton
        ? colors.map((val, idx) => {
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
          })
        : dummy.map((val, idx) => (
            <Skeleton
              key={idx}
              wrapper={() => (
                <div className="animate-pulse bg-dark-gray w-[1.8rem] h-[1.8rem] md:w-[2rem] md:h-[2rem] rounded-full" />
              )}
            />
          ))}
    </div>
  );
}

export default ShoesColor;
