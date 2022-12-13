import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

//Hook
import { useWindowSize } from "../../hook";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

// import required modules
import { Navigation } from "swiper";

//style
import styles from "../../styles/components/CardShoes.module.scss";

//asset
import JordanBlue from "../../assets/PNG/Shoes/Categories/Jordan/Jordan-Blue.png";

function CardShoes({ data, limit = 5 }) {
  const windowSize = useWindowSize();

  return (
    /* Layout Card */

    <Swiper 
      slidesPerView={windowSize[0] <= 768 ? 2 : 4}
      slidesPerGroup={windowSize[0] <= 768 ? 2 : 4}
      spaceBetween={10}
      navigation={true}
      modules={[ Navigation]}
      className={styles.SwiperClass}
    >
      {/* Start of Card  */}
      {data.map((val, idx) => (
        <SwiperSlide className={`${styles.cardWrapper} shadow-CardShadow`} key={idx}>
          <div className={`${styles.ImageCard} relative`}>
            <img
              src={JordanBlue}
              className="absolute z-99 inset-0 m-auto -rotate-[20deg]"
            />
          </div>
          <div className="flex flex-col md:flex-row gap-1 md:gap-0 justify-between">
            <div className="flex flex-col md:gap-1">
              <span className="text-xs md:text-base font-bold">Nike Air Max 97</span>
              <span className="text-[0.625rem] md:text-xs font-lighter text-dark-gray-3">Men's Shoes</span>
            </div>
            <span className="text-sm md:text-xl text-primary-color font-bold">$153</span>
          </div>
        </SwiperSlide>
      ))}
      {/* End of Card  */}
    </Swiper>
  );
}

export default CardShoes;
