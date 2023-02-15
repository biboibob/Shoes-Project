import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";

/* Skeleton Library */
import Skeleton from "react-loading-skeleton";

//style
import styles from "../../styles/components/CardCatalog.module.scss";

//asset
import JordanBlue from "../../assets/PNG/Shoes/Categories/Jordan/Jordan-Blue.png";

//Hook
import { usePrevious } from "../../hook";

/* Util */
import { PageRoutePath } from "../../utils/config";

function CardShoes({ data, sort, onFetch }) {
  const navigate = useNavigate();

  /* Redux */
  const uiSelector = useSelector((state) => state.userInterface);

  const dummy = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  const dummyInfiniteScroll = [1, 2, 3, 4, 5];

  const navigateTo = (Route, id) => {
    navigate(`${Route}/${id}`);
  };

  const onFetchMore = () => {
    onFetch((curr) => ({
      ...data,
      offset: curr.offset + data.limit,
    }));
  };

  //Hook Checking if previous value of Shoes
  const prevDataShoes = usePrevious(data.shoes);

  const loadSkeleton = (arr) => {
    return arr.map((val, idx) => (
      <Skeleton
        key={idx}
        wrapper={() => (
          <>
            <div className="rounded-lg animate-pulse bg-dark-gray h-52 w-full"></div>
            <div className="flex animate-pulse w-full gap-2 mt-3">
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
    ));
  };

  return (
    /* Layout Card */

    // flex-basis: calc(calc(100% / 4) - 5rem);

    !uiSelector.specificSkeleton.shoesListCategory ? (
      /* Adding Flex auto in after will make it behave as grid */
      <InfiniteScroll
        dataLength={data?.shoes?.length}
        next={onFetchMore}
        hasMore={prevDataShoes?.length === data?.shoes?.length ? false : true}
        loader={loadSkeleton(dummyInfiniteScroll)}
        className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[.7rem]"
      >
        {data.shoes
          .sort((a, b) => {
            if (sort.value.length > 0) {
              switch (sort.value) {
                case "Highest Price":
                  return b.shoes.price - a.shoes.price;
                case "Lowest Price":
                  return a.shoes.price - b.shoes.price;
                case "Shoes Name Desc":
                  if (b.shoes.name < a.shoes.name) {
                    return -1;
                  }
                  if (b.shoes.name > a.shoes.name) {
                    return 1;
                  }
                  return 0;
                case "Shoes Name Asc":
                  if (a.shoes.name < b.shoes.name) {
                    return -1;
                  }
                  if (a.shoes.name > b.shoes.name) {
                    return 1;
                  }
                  return 0;
                case "Category":
                  if (a.category.category_name < b.category?.category_name) {
                    return -1;
                  }
                  if (a.category?.category_name > b.category?.category_name) {
                    return 1;
                  }
                  return 0;
              }
            }
          })
          .map((val, idx) => (
            <div
              className={`${styles.cardWrapper} shadow-CardShadow gap-3`}
              onClick={() => navigateTo(PageRoutePath.PRODUCTS, val.id_shoes)}
              key={idx}
            >
              <div className={`${styles.ImageCard} relative`}>
                <img
                  src={val.shoes?.image[0]?.URL}
                  className="absolute z-99 inset-0 m-auto -rotate-[20deg]"
                />
              </div>
              <div className="flex flex-col md:flex-row gap-2 md:!gap-2 justify-between mt-3">
                <div className="flex flex-col md:gap-1 md:overflow-hidden">
                  <span className="text-xs md:text-base font-bold truncate">
                    {val.shoes?.name}
                  </span>
                  <span className="text-[0.625rem] md:text-xs font-lighter text-dark-gray-3">
                    {`${val.category?.category_name}'s  Shoes`}
                  </span>
                </div>
                <span className="text-sm md:text-base text-primary-color font-bold">
                  {`$${val.shoes?.price}`}
                </span>
              </div>
            </div>
          ))}
      </InfiniteScroll>
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-[.7rem]">
        {loadSkeleton(dummy)}
      </div>
    )
  );
}

export default CardShoes;
