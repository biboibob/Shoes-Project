import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

/* Skeleton Library */
import Skeleton from "react-loading-skeleton";

/* Action */
import { skeletonToggle } from "../service/redux/slice/ui";

/*** Swiper ***/
import { Swiper, SwiperSlide } from "swiper/react";
import { Mousewheel, Pagination, Autoplay } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

// Asset
import { First, Second, Third } from "../assets/JPG/Slider";
import Model from "../assets/PNG/Model/index";
import ShoesFeatured from "../assets/PNG/Shoes/Featured/index";

//EndPoint and RoutePath
import API from "../helper/api";
import { PageRoutePath } from "../utils/config";

//Component
import {
  CardShoes,
  CardModel,
  ShoesPreview,
  ShoesColor,
  ShoesSize,
} from "../components/index";
import { Button } from "../components/custom/index";

import "../styles/Home.scss";

function Home() {
  const api = new API();
  const navigate = useNavigate();

  /* Redux */
  const dispatch = useDispatch();
  const uiSelector = useSelector((state) => state.userInterface);

  /* State */
  const [featured, setFeatured] = useState({
    title: "",
    category: "",
    description: "",
    price: "",
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

  const [popular, setPopular] = useState([]);
  const [newRelease, setNewRelease] = useState([]);

  const [selected, setSelected] = useState({
    color: "",
    size: "",
    type: "",
  });

  const onHandleChange = (name, value) => {
    setSelected({
      ...selected,
      [name]: value,
    });
  };

  useEffect(() => {
    // dispatch(skeletonToggle(true));

    getData()
    
    // Promise.all([getData()])
    //   .then(() => {
     
    //     dispatch(skeletonToggle(false));
    //   })
    //   .catch(() => {
    //     dispatch(skeletonToggle(false));
    //   });
  }, []);

  const getData = () => {
    return api.homeInitiate().then((res) => {
      const featured = res.data.data.featured;
      const newRelease = res.data.data.newRelease;
      const popular = res.data.data.popular;

      setFeatured({
        title: featured.detailShoes.shoes.name,
        category: featured.categoryShoes.category.category_name,
        description: featured.detailShoes.shoes.description,
        price: featured.detailShoes.shoes.price,
        color: featured.colorOpt.map((val) => {
          return val.color;
        }),
        image: [],
        size: featured.sizeOpt.map((val) => {
          return val.size;
        }),
      });

      

      setPopular(popular);
      setNewRelease(newRelease);
    });
  };

  const navigateTo = (Route, state) => {
    navigate(Route, {
      state: {
        state,
      },
    });
  };

  

  return (
    <div className="flex flex-col container my-3 md:my-5">
      <section className="flex flex-col gap-5 md:gap-0 mt-3 md:my-5 md:flex-row order-[2] md:order-first">
        <div className="flex flex-col relative bg-white shadow-CardShadow md:shadow-none rounded-lg md:!bg-inherit w-100 md:w-50 p-3 md:p-0">
          <span className="block md:hidden font-semibold absolute top-0 left-0 bg-red-pallete text-white px-3.5 py-1.5 rounded-tl-lg rounded-br-lg">
            Featured
          </span>

          {/* <ShoesPreview
            asset={ShoesFeatured}
            responsive={true}
            className={"md:hidden"}
          /> */}

          {!uiSelector.skeleton ? (
            <>
              <span className="text-xs md:text-lg hidden md:block text-purple-pallete font-semibold">
                Featured
              </span>
              <span className="text-lg md:text-5xl font-bold text-soft-gray">
                {featured.title}
              </span>
              <span className="text-xs block md:hidden text-dark-gray-3">
                {featured.category}
              </span>
              <span className="text-xs md:text-base text-gray-400 my-3 tracking-wider hidden md:block md:line-clamp-3">
                {featured.description}
              </span>
            </>
          ) : (
            <Skeleton
              wrapper={() => (
                <div className="flex flex-col gap-2 animate-pulse my-4 md:my-0">
                  <span className="h-5 md:h-10 rounded-lg bg-dark-gray w-3/4" />

                  <div className="flex-col gap-2 my-3 hidden md:flex">
                    <span className="h-5 rounded-lg bg-dark-gray w-full" />
                    <span className="h-5 rounded-lg bg-dark-gray w-2/3" />
                  </div>

                  <span className="h-2 rounded-lg bg-dark-gray w-1/3 md:hidden" />
                </div>
              )}
            />
          )}

          <div id="price" className="flex flex-col font-medium mt-2 md:my-3">
            {!uiSelector.skeleton ? (
              <>
                <span className="text-sm md:text-base hidden md:block">
                  Price :
                </span>
                <div className="flex gap-2 md:gap-3">
                  <span className="text-base md:text-3xl font-bold">
                    <span className="text-sm text-soft-green md:text-base">
                      $
                    </span>
                    <span className="line-through">{featured.price}</span>
                  </span>
                  <span className="text-base md:text-3xl font-bold">
                    <span className="text-sm text-soft-green md:text-base">
                      $
                    </span>
                    {featured.price}
                  </span>
                </div>
              </>
            ) : (
              <Skeleton
                containerClassName="h-fit"
                wrapper={() => (
                  <div>
                    <span className="h-3 w-20 hidden md:block bg-dark-gray" />
                  </div>
                )}
              />
            )}
          </div>

          <div
            id="colorAndSize"
            className="hidden md:flex flex-row gap-3 md:gap-0 "
          >
            <div className="flex flex-col gap-3 w-50">
              <span
                className={`${
                  uiSelector.skeleton && "!hidden"
                } text-sm md:text-base`}
              >
                Colors :
              </span>
              <ShoesColor
                colors={featured.color}
                onChange={onHandleChange}
                selected={selected.color}
              />
            </div>
            <div className="flex flex-col gap-3 w-50">
              <span
                className={`${
                  uiSelector.skeleton && "!hidden"
                } text-sm md:text-base`}
              >
                Size :
              </span>
              <ShoesSize
                size={featured.size}
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
            <span
              className={`${
                uiSelector.skeleton && "!hidden"
              } text-sm md:text-lg underline cursor-pointer`}
            >
              See Details
            </span>
          </div>
        </div>
        <div className="hidden md:flex flex-col w-100 md:w-50 items-center mx-auto">
          {/* <ShoesPreview asset={ShoesFeatured} /> */}
        </div>
      </section>
      <section className="flex flex-col my-2 md:!my-4 order-first  md:order-[2]">
        {!uiSelector.skeleton ? (
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
              <img
                className="w-100 rounded-2xl"
                src={Third}
                alt="Third Slider"
              />
            </SwiperSlide>
          </Swiper>
        ) : (
          <Skeleton
            containerClassName="h-fit"
            wrapper={() => (
              <div className="w-100 h-28 md:h-72 rounded-lg bg-dark-gray animate-pulse" />
            )}
          />
        )}
      </section>

      <section className="my-4 flex flex-col gap-2 order-[3]">
        {!uiSelector.skeleton ? (
          <span className="ContentTitle">New Release</span>
        ) : (
          <span className="h-10 w-1/5 rounded-lg bg-dark-gray animate-pulse" />
        )}
        <div className="justify-between gap-3">
          <CardShoes data={newRelease} />
        </div>
      </section>

      <section className="my-4 flex flex-col gap-2 order-[4]">
        {!uiSelector.skeleton ? (
          <span className="ContentTitle">Popular</span>
        ) : (
          <span className="h-10 w-1/5 rounded-lg bg-dark-gray animate-pulse" />
        )}
        <div className="justify-between gap-3">
          <CardShoes data={popular} />
        </div>
      </section>

      <section className="my-4 flex flex-col gap-2 order-[5]">
        {!uiSelector.skeleton ? (
          <span className="ContentTitle">More Nike</span>
        ) : (
          <span className="h-10 w-1/5 rounded-lg bg-dark-gray animate-pulse" />
        )}
        <div className="flex flex-col md:flex-row gap-3">
          {Object.keys(Model).map((val, idx) => (
            <div
              className="cursor-pointer"
              key={idx}
              onClick={() =>
                navigateTo(PageRoutePath.PRODUCTS, { category: val })
              }
            >
              <CardModel label={val} image={Model[val]} />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Home;
