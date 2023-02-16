import React from "react";
import { useSelector } from "react-redux";

/* Skeleton Library */
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ShoesSize({
  size,
  onChange,
  selected,
  name = "size",
  className,
  gridClassName
}) {
  /* Redux */
  const uiSelector = useSelector((state) => state.userInterface);

  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  // const gridCols = (val) => {
  //   switch (val) {
  //     case "1":
  //       return "grid-cols-1";
  //     case "2":
  //       return "grid-cols-2";
  //     case "3":
  //       return "grid-cols-3";
  //     case "4":
  //       return "grid-cols-4";
  //     case "5":
  //       return "grid-cols-5";
  //   }
  // };

  return (
    <div
      className={`grid ${gridClassName} grid-cols-2 lg:grid-cols-4 gap-2 p-1`}
    >
      {!uiSelector.skeleton
        ? size.map((val, idx) => {
            return (
              <div
                className={`${className}
                text-sm md:text-base py-1 px-2 text-center rounded-md cursor-pointer ${
                  selected.includes(val)
                    ? "bg-red-pallete text-white"
                    : "bg-dark-gray"
                }`}
                style={{ backgroundColor: val }}
                key={idx}
                onClick={() => onChange(name, val)}
              >
                {val}
              </div>
            );
          })
        : dummy.map((val, idx) => (
            <Skeleton
              key={idx}
              wrapper={() => (
                <div className="animate-pulse h-10 w-auto bg-dark-gray" />
              )}
            />
          ))}
    </div>
  );
}

export default ShoesSize;
