import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";

/* Skeleton Library */
import Skeleton from "react-loading-skeleton";

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

//Service
import { PageRoutePath } from "../../utils/config";

//asset
import JordanBlue from "../../assets/PNG/Shoes/Categories/Jordan/Jordan-Blue.png";

function CardShoes({ data, limit = 5 }) {
  const navigate = useNavigate();
  const windowSize = useWindowSize();
  const uiSelector = useSelector((state) => state.userInterface);

  /* Use To Handle Skeleton */
  const dummy = [1, 2, 3, 4];


  const navigateTo = (Route, id) => {
    navigate(`${Route}/${id}`);
  };

  return (
    /* Layout Card */

    !uiSelector.skeleton ? (
      <Swiper
        slidesPerView={windowSize[0] <= 768 ? 2 : 4}
        slidesPerGroup={windowSize[0] <= 768 ? 2 : 4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className={styles.SwiperClass}
      >
        {data.map((val, idx) => (
          <SwiperSlide
            className={`${styles.cardWrapper} shadow-CardShadow`}
            key={idx}
            onClick={() => navigateTo(PageRoutePath.PRODUCTS, val.id_shoes)}
          >
      
            <div className={`${styles.ImageCard} relative`}>
              <img
                src={JordanBlue}
                className="absolute z-99 inset-0 m-auto -rotate-[20deg]"
              />
            </div>
            <div className="flex flex-col md:flex-row gap-1 md:gap-0 justify-between">
              <div className="flex flex-col overflow-hidden md:gap-1">
                <span className="text-xs md:text-base font-bold truncate">
                  {val.shoes.name}
                </span>
                <span className="text-[0.625rem] md:text-xs font-lighter text-dark-gray-3">
                  {val.category.category_name}
                </span>
              </div>
              <span className="text-sm md:text-xl text-primary-color font-bold">
                ${val.shoes.price}
              </span>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    ) : (
      <Swiper
        slidesPerView={windowSize[0] <= 768 ? 2 : 4}
        slidesPerGroup={windowSize[0] <= 768 ? 2 : 4}
        spaceBetween={10}
        navigation={true}
        modules={[Navigation]}
        className={`${styles.SwiperClass} flex`}
      >
        {dummy.map((val, idx) => (
          <SwiperSlide
            key={idx}
            className={`${styles.cardWrapperSkeleton} flex flex-col items-center grow animate-pulse shadow-CardShadow`}
          >
            <Skeleton
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
              containerClassName={`flex flex-col w-full gap-2`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    )
  );
}

export default CardShoes;
