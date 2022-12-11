import React from "react";

//style
import styles from "../../styles/components/CardCatalog.module.scss";

//asset
import JordanBlue from "../../assets/PNG/Shoes/Categories/Jordan/Jordan-Blue.png";

function CardShoes({ data }) {
  return (
    /* Layout Card */

    // flex-basis: calc(calc(100% / 4) - 5rem);

    /* Adding Flex auto in after will make it behave as grid */
    <div className="flex flex-wrap gap-[.5rem] justify-between after:flex-auto">
      {data.map((val, idx) => (
        <div className={`${styles.cardWrapper}`} key={idx}>
          <div className={`${styles.ImageCard} relative`}>
            <img
              src={JordanBlue}
              className="absolute z-99 inset-0 m-auto -rotate-[20deg] w-56 h-auto"
            />
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col gap-1">
              <span className="text-base font-bold">Nike Air Max 97</span>
              <span className="text-xs font-lighter">Men's Shoes</span>
            </div>
            <span className="text-primary-color text-2xl font-semibold">
              $153
            </span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardShoes;
