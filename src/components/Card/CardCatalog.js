import React from "react";
import { useSelector } from "react-redux";

/* Skeleton Library */
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

//style
import styles from "../../styles/components/CardCatalog.module.scss";

//asset
import JordanBlue from "../../assets/PNG/Shoes/Categories/Jordan/Jordan-Blue.png";

function CardShoes({ data }) {
  /* Redux */
  const uiSelector = useSelector((state) => state.userInterface);
  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];

  return (
    /* Layout Card */

    // flex-basis: calc(calc(100% / 4) - 5rem);

    !uiSelector.specificSkeleton.shoesListCategory ? (
      /* Adding Flex auto in after will make it behave as grid */
      <div className="flex flex-wrap gap-[.7rem] justify-between after:flex-auto">
        {data.map((val, idx) => (
          <div
            className={`${styles.cardWrapper} shadow-CardShadow gap-3`}
            key={idx}
          >
            <div className={`${styles.ImageCard} relative`}>
              <img
                src={JordanBlue}
                className="absolute z-99 inset-0 m-auto -rotate-[20deg]"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between">
              <div className="flex flex-col md:gap-1">
                <span className="text-xs md:text-base font-bold">
                  {val.shoes?.name}
                </span>
                <span className="text-[0.625rem] md:text-xs font-lighter text-dark-gray-3">
                  {`${val.category?.category_name}'s  Shoes`}
                </span>
              </div>
              <span className="text-sm md:text-xl text-primary-color font-bold">
                {`$${val.shoes?.price}`}
              </span>
            </div>
          </div>
        ))}
      </div>
    ) : (
      <div className="flex flex-wrap gap-[.7rem] justify-between after:flex-auto">
        {dummy.map((val, idx) => (
          <Skeleton
            key={idx}
            wrapper={() => (
              <>
                <div className="rounded-lg animate-pulse bg-dark-gray h-52 w-full"></div>
                <div className="flex animate-pulse w-full gap-2 ">
                  <div className="flex flex-col basis-3/4 gap-2">
                    <div className="rounded-lg bg-dark-gray h-3" />
                    <div className="rounded-lg bg-dark-gray h-3 w-1/2" />
                  </div>
                  <div className="rounded-lg bg-dark-gray h-3 basis-1/4" />
                </div>
              </>
            )}
            containerClassName={`${styles.cardWrapper} gap-3`}
          />
        ))}
      </div>
    )
  );
}

export default CardShoes;
