import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Skeleton from "react-loading-skeleton";

//redux Action
import { addNewShoes, removeAllCart } from "../service/redux/slice/cart";

/* Component */
import {
  ShoesPreview,
  ShoesSize,
  ShoesColor,
  Quantity,
} from "../components/index";

/* Asset */
import ShoesFeatured from "../assets/PNG/Shoes/Featured/index";

/* Redux Action */
import { skeletonToggle } from "../service/redux/slice/ui";

function DetailProduct() {
  /* Redux */
  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state.cart);
  const uiSelector = useSelector((state) => state.userInterface);

  /* Test Data */
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
      "49",
    ],
  });

  const [sample, setSample] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  /* Hook */
  const [form, setForm] = useState({
    name: {
      value: "NIKE Metcon '6 By You",
      statusErr: false,
      message: "",
    },
    size: {
      value: 41,
      statusErr: false,
      message: "",
    },
    price: {
      value: 150,
      statusErr: false,
      message: "",
    },
    discount: {
      value: 130,
      statusErr: false,
      message: "",
    },
    color: {
      value: 0,
      statusErr: false,
      message: "",
    },
    size: {
      value: 0,
      statusErr: false,
      message: "",
    },
    addToCart: {
      value: 1,
      statusErr: false,
      message: "",
    },
  });

  const [form2, setForm2] = useState({
    name: {
      value: "NIKEu",
      statusErr: false,
      message: "",
    },
    size: {
      value: 43,
      statusErr: false,
      message: "",
    },
    price: {
      value: 110,
      statusErr: false,
      message: "",
    },
    discount: {
      value: 120,
      statusErr: false,
      message: "",
    },
    color: {
      value: 0,
      statusErr: false,
      message: "",
    },
    size: {
      value: 0,
      statusErr: false,
      message: "",
    },
    addToCart: {
      value: 1,
      statusErr: false,
      message: "",
    },
  });

  useEffect(() => {
    dispatch(skeletonToggle(true));

    setTimeout(() => {
      dispatch(skeletonToggle(false));
    }, 2000);
  }, []);

  const addShoesToCart = () => {
    let obj = {};

    Object.keys(form).map((val) => {
      obj[val] = form[val].value;
    });

    dispatch(addNewShoes(obj));
  };

  /* Handle Change of Form */
  const onHandleChange = (name, value) => {
    setForm({
      ...form,
      [name]: {
        value: value,
        statusErr: false,
      },
    });
  };

  return (
    <div className="flex flex-col md:flex-row container min-h-full">
      <div className="basis-1/2 px-[2.5rem] py-2 md:py-[3.125rem] flex justify-center md:sticky top-0">
        <ShoesPreview asset={ShoesFeatured} />
      </div>
      <div className="flex flex-col basis-1/2 px-[1.25rem] py-2 md:py-[3.125rem] gap-6">
        {!uiSelector.skeleton ? (
          <>
            <div className="flex flex-col gap-1 md:gap-2.5">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="grow text-soft-black text-sm md:text-base">
                    Men's Shoes
                  </span>
                  <span className="font-semibold md:font-black text-lg md:text-4xl text-soft-black">
                    NIKE Metcon '8 By You
                  </span>
                </div>

                <span className="text-soft-black flex md:hidden items-center text-xs">
                  $<span className="text-lg font-black">160</span>
                </span>
              </div>
              <div className="md:text-gray-400 tracking-wider mt-3 md:mt-0 hidden md:flex">
                The Nike Metcon 8 NBY allows you to add a little bling to your
                everyday workout routines with chrome options on everything from
                the Swoosh to the heel plate to shoelaces. Read More
              </div>
            </div>
            <div className="text-soft-black text-base font-black my-3 hidden md:block">
              $<span className="text-4xl">160</span>
            </div>
          </>
        ) : (
          <Skeleton
            wrapper={() => (
              <>
                <div className="flex flex-col gap-1 md:gap-2.5 animate-pulse">
                  <div className="flex justify-between items-end">
                    <div className="flex flex-col grow gap-2">
                      <span className="grow bg-dark-gray h-3 w-1/2 md:w-1/4 rounded-lg" />
                      <span className="h-5 bg-dark-gray w-2/3 rounded-lg" />
                    </div>

                    <span className="h-5 bg-dark-gray w-16 rounded-lg md:hidden" />
                  </div>
                  <div className="my-4 flex gap-2 flex-col">
                    <span className="h-2 bg-dark-gray w-full rounded-lg hidden md:flex" />
                    <span className="h-2 bg-dark-gray w-3/4 rounded-lg hidden md:flex" />
                    <span className="h-2 bg-dark-gray w-2/4 rounded-lg hidden md:flex" />
                  </div>
                </div>
                <div className="h-3 bg-dark-gray w-1/4 rounded-lg hidden md:flex" />
              </>
            )}
          />
        )}

        {!uiSelector.skeleton ? (
          <>
            <div className="flex flex-col gap-2 md:gap-4 md:hidden">
              <span className="flex text-base font-bold">Description</span>
              <span className="text-sm text-gray-400 tracking-wider">
                The Nike Metcon 8 NBY allows you to add a little bling to your
                everyday workout routines with chrome options on everything from
                the Swoosh to the heel plate to shoelaces. Read More
              </span>
            </div>

            <div className="flex flex-col gap-3">
              <span className="flex gap-1 text-base font-bold md:font-normal">
                Size <span className="hidden md:flex">:</span>
              </span>
              <ShoesSize
                className={"flex justify-center text-center !p-2"}
                size={data.size}
                onChange={onHandleChange}
                selected={form.size.value}
                withBasis={true}
              />
            </div>
            <div className="flex flex-col gap-3">
              <span className="flex gap-1 text-base font-bold md:font-normal">
                Color <span className="hidden md:flex">:</span>
              </span>
              <ShoesColor
                colors={data.color}
                onChange={onHandleChange}
                selected={form.color.value}
              />
            </div>
          </>
        ) : (
          <Skeleton
            containerClassName="flex flex-col gap-5"
            wrapper={() => (
              <>
                <div className="flex flex-col gap-2 md:gap-4  animate-pulse">
                  <span className="h-3 bg-dark-gray rounded-lg w-1/4" />
                  <ShoesSize
                    className={"flex justify-center text-center !p-2"}
                    size={data.size}
                    onChange={onHandleChange}
                    selected={form.size.value}
                    withBasis={true}
                  />
                </div>

                <div className="flex flex-col gap-2 md:gap-4 animate-pulse">
                  <span className="h-3 bg-dark-gray rounded-lg w-1/4" />
                  <ShoesColor
                    colors={data.color}
                    onChange={onHandleChange}
                    selected={form.color.value}
                  />
                </div>
              </>
            )}
          />
        )}
        
        <div className="flex gap-2">
          {!uiSelector.skeleton ? (
            <button
              className="bg-soft-green font-semibold grow text-white rounded-md py-2"
              onClick={addShoesToCart}
            >
              {"Add To Cart"}
            </button>
          ) : (
            <Skeleton
              containerClassName="grow animate-pulse bg-dark-gray rounded-lg"
              wrapper={() => <div className="bg-dark-gray" />}
            />
          )}
          <Quantity
            name={"addToCart"}
            value={form.addToCart.value}
            onChange={onHandleChange}
          />
        </div>
      </div>
    </div>
  );
}

export default DetailProduct;
