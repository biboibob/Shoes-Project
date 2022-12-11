import React, { useEffect, useState } from "react";

// *** Swiper ***
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Asset
import { First, Second, Third } from "../assets/JPG/Slider";
import Model from "../assets/PNG/Model/index";
import ShoesFeatured from "../assets/PNG/Shoes/Featured/index";

//Component
import {
  CardShoes,
  CardModel,
  ShoesPreview,
  ShoesColor,
  ShoesSize,
} from "../components/index";
import { Button } from "../components/custom/index";

import "../styles/Home.sass";

function Home() {
  const [data, setData] = useState({
    color: ["#414E97", "#555"],
    image: [],
    size: [
      "37",
      "38",
      "39",
      "40",
      "41",
      "42",
      "43",
      "44",
      "45",
      "46",
      "47",
      "48",
    ],
  });

  const [selected, setSelected] = useState({
    color: "",
    size: "",
    type: "",
  });

  const [sample, setSample] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const onHandleChange = (name, value) => {
    setSelected({
      ...selected,
      [name]: value,
    });
  };

  return (
    <div className="flex flex-col container my-3 md:my-5">
      <section className="flex flex-col gap-5 md:gap-0 mt-3 md:my-5 md:flex-row order-[2] md:order-first">
        <div className="flex flex-col relative bg-white rounded-lg md:!bg-inherit w-100 md:w-50 p-4 md:p-0">
          <i className="fa-regular fa-heart absolute top-8 left-5 fa-xl md:hidden"></i>
          <ShoesPreview
            asset={ShoesFeatured}
            responsive={true}
            className={"flex justify-evenly my-3 md:hidden"}
          />

          <span className="text-xs md:text-lg text-purple-pallete font-semibold">
            Featured
          </span>
          <span className="text-lg md:text-5xl font-bold text-soft-gray">
            NIKE Metcon '8 By You
          </span>
          <span className="text-xs md:text-base text-soft-gray my-3 tracking-wider hidden md:block">
            The Nike Metcon 8 NBY will bring your everyday workout routines with
            chrome options and sharp look that define your inner athlete.
          </span>

          <div id="price" className="flex flex-col font-medium mt-1 md:my-3">
            <span className="text-sm md:text-base hidden md:block">
              Price :
            </span>
            <div className="flex gap-2 md:gap-3">
              <span className="text-sm md:text-3xl font-bold">
                <span className="text-xs text-soft-green md:text-base">$</span>
                <span className="line-through">199</span>
              </span>
              <span className="text-sm md:text-3xl font-bold">
                <span className="text-xs text-soft-green md:text-base">$</span>
                160
              </span>
            </div>
          </div>

          <div
            id="colorAndSize"
            className="hidden md:flex flex-row gap-3 md:gap-0 "
          >
            <div className="flex flex-col gap-3 w-50">
              <span className="text-sm md:text-base">Colors :</span>
              <ShoesColor
                colors={data.color}
                onChange={onHandleChange}
                selected={selected.color}
              />
            </div>
            <div className="flex flex-col gap-3 w-50">
              <span className="text-sm md:text-base">Size :</span>
              <ShoesSize
                size={data.size}
                onChange={onHandleChange}
                selected={selected.size}
              />
            </div>
          </div>

          <div className="hidden md:flex items-center gap-3 mt-5">
            <Button
              value={"Add To Chart"}
              className="py-2.5 px-3 md:py-3 md:px-4 !w-fit rounded-2xl md:rounded-md !text-sm md:!text-base"
            />
            <span className="text-sm md:text-lg underline cursor-pointer">
              See Details
            </span>
          </div>
        </div>
        <div className="hidden md:flex flex-col w-100 md:w-50 items-center mx-auto">
          <ShoesPreview asset={ShoesFeatured} />
        </div>
      </section>
      <section className="flex flex-col my-2 md:!my-4 order-first md:order-[2]">
        <Swiper
          autoHeight={true}
          mousewheel={true}
          spaceBetween={20}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          modules={[Pagination, Mousewheel, Autoplay]}
          className="mySwiper rounded-2xl"
        >
          <SwiperSlide>
            <div className="relative">
              <img
                className="w-100 rounded-2xl"
                src={First}
                alt="First Slider"
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <img
              className="w-100 rounded-2xl"
              src={Second}
              alt="Second Slider"
            />
          </SwiperSlide>
          <SwiperSlide>
            <img className="w-100 rounded-2xl" src={Third} alt="Third Slider" />
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="my-4 flex flex-col gap-2 order-[3]">
        <span className="ContentTitle">Hot Deals</span>
        <div className="flex justify-between gap-3">
          <CardShoes data={sample} />
        </div>
      </section>

      <section className="my-4 flex flex-col gap-2 order-[4]">
        <span className="ContentTitle">Popular</span>
        <div className="flex justify-between gap-3">
          <CardShoes data={sample} />
        </div>
      </section>

      <section className="my-4 flex flex-col gap-2 order-[5]">
        <span className="ContentTitle">More Nike</span>
        <div className="flex flex-col md:flex-row gap-3">
          {Object.keys(Model).map((val, idx) => (
            <div key={idx}>
              <CardModel label={val} image={Model[val]} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
