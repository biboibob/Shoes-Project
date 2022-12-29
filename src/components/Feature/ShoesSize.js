import React from "react";
import { useSelector } from "react-redux";

/* Skeleton Library */
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

// Style
import style from "../../styles/components/ShoesSize.module.scss";

function ShoesSize({
  size,
  onChange,
  selected,
  name = "size",
  className,
  withBasis,
}) {
  /* Redux */
  const uiSelector = useSelector((state) => state.userInterface);

  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  return (
    <div className="flex flex-wrap gap-1">
      {!uiSelector.skeleton
        ? size.map((val, idx) => {
            return (
              <div
                className={`${className} ${
                  withBasis && style.SizingWidth
                } text-sm md:text-base py-1 px-2 rounded-md cursor-pointer ${
                  val === selected
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
                <div className="animate-pulse h-10 w-10 bg-dark-gray" />
              )}
            />
          ))}
    </div>
  );
}

export default ShoesSize;
