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
    <div className="flex flex-wrap gap-[.7rem] justify-between after:flex-auto">
      {data.map((val, idx) => (
        <div className={`${styles.cardWrapper} shadow-CardShadow gap-3`} key={idx}>
          <div className={`${styles.ImageCard} relative`}>
            <img
              src={JordanBlue}
              className="absolute z-99 inset-0 m-auto -rotate-[20deg]"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-0 justify-between">
            <div className="flex flex-col md:gap-1">
              <span className="text-xs md:text-base font-bold">Nike Air Max 97</span>
              <span className="text-[0.625rem] md:text-xs font-lighter text-dark-gray-3">Men's Shoes</span>
            </div>
            <span className="text-sm md:text-xl text-primary-color font-bold">$153</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CardShoes;
