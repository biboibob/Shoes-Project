import React from "react";
import { useSelector } from "react-redux";

/* Skeleton Library */
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

function ShoesSize({
  size,
  onChange,
  selected,
  name = "size",
  className,
  gridClassName,
}) {
  /* Redux */
  const uiSelector = useSelector((state) => state.userInterface);

  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  const onHandleClick = (name, val) => {
    if (name === "size_detail_shoe") {
      if (val.stock_number > 0) {
        onChange(name, val.size);
      }
    } else {
      onChange(name, val.size);
    }
  };

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
                  val.stock_number === 0 && "opacity-20"
                } ${
                  selected.includes(val.size)
                    ? "bg-red-pallete text-white"
                    : "bg-dark-gray"
                }`}
                style={{ backgroundColor: val.size }}
                key={idx}
                onClick={() => onHandleClick(name, val)}
              >
                {val.size}
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
