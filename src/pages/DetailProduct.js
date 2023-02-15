import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";

//redux Action
import { addNewShoes, removeAllCart } from "../service/redux/slice/cart";

/* Component */
import {
  ShoesPreview,
  ShoesSize,
  ShoesColor,
  Quantity,
} from "../components/index";
import { Button } from "../components/custom";

/* Asset */
import ShoesFeatured from "../assets/PNG/Shoes/Featured/index";

/* Redux Action */
import { skeletonToggle } from "../service/redux/slice/ui";

// Service
import { valueProcessing, Toast } from "../utils";
import API from "../helper/api";
import { PageRoutePath } from "../utils/config";

function DetailProduct() {
  const api = new API();
  const navigate = useNavigate();

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
    description: {
      value: "",
      statusErr: false,
      message: "",
    },
    category: {
      value: "",
      statusErr: false,
      message: "",
    },
    size: {
      value: "",
      statusErr: false,
      message: "",
    },
    color: {
      value: "",
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
    addToCart: {
      value: 1,
      statusErr: false,
      message: "",
    },
    id: {
      value: null,
      statusErr: false,
      message: "",
    },
    onSelected: {
      value: false,
      statusErr: false,
      message: "",
    },
    asset: {
      value: [],
      statusErr: false,
      message: ""
    }

  });

  const [readMore, setReadMore] = useState(true);

  useEffect(() => {
    dispatch(skeletonToggle(true));

    Promise.all([getData()])
    .then(() => {
      dispatch(skeletonToggle(false));
    })
    .catch(() => {
      dispatch(skeletonToggle(false));
    });
  }, []);

  const getData = () => {
    const lastPath = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );

    const requestBody = {
      id_shoes: parseInt(lastPath),
    };

    api.getDetailShoes(requestBody).then((res) => {
      if (res.status === 200 && res.data.status) {
        const dataResponse = res.data.data;

        let updatedForm = form;

        const updatedValue = {
          name: dataResponse.shoesDetail.name,
          price: dataResponse.shoesDetail.price,
          description: dataResponse.shoesDetail.description,
          category: dataResponse.categoryShoes.category.category_name,
          id: dataResponse.shoesDetail.id_shoes,
          asset: dataResponse.shoesPreview.find((val) => val.type === "display")
        };

        for (const property in updatedValue) {
          updatedForm = {
            ...updatedForm,
            [property]: {
              ...updatedForm[property],
              value: updatedValue[property],
            },
          };
        }

        setData({
          ...data,
          color: dataResponse.colorOpt.map((val) => {
            return val.color;
          }),
          size: dataResponse.sizeOpt.map((val) => {
            return val.size;
          }),
          image: dataResponse.shoesPreview.filter((val) => val.type !== "display")
        });

        setForm(updatedForm);
      } else {
      }
    });
  };

  const navigateTo = (Route) => {
    navigate(`${Route}`);
  };

  const addShoesToCart = () => {
    if (form.color.value === "" || form.size.value === "") {
      Swal.fire({
        title: "Select All Field",
        text: "Color or Size option should be selected",
        icon: "warning",
        confirmButtonText: "Ok",
      });
    } else {
      Swal.fire({
        title: "Whoops! Hold on.",
        text: "Have you cross check all selected option you made?",
        icon: "info",
        showDenyButton: true,
        confirmButtonText: "Sure",
        denyButtonText: `Nope`,
      }).then((result) => {
        if (result.isConfirmed) {
          let obj = {};

          Object.keys(form).map((val) => {
            obj[val] = form[val].value;
          });

          dispatch(addNewShoes(obj));

          Toast.fire({
            icon: "success",
            title: "Shoes successfully add to cart",
          });

          navigateTo(PageRoutePath.PRODUCTS);
        }
      });
    }
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

  const onHandleToggleDescription = () => {
    setReadMore(readMore ? false : true);
  };

  return (
    <div className="flex flex-col md:flex-row container min-h-full">
      <div className="basis-1/2 px-[2.5rem] py-2 md:py-[3.125rem] flex justify-center">
        <ShoesPreview className={"sticky top-14"} asset={data.image} />
      </div>
      <div className="flex flex-col basis-1/2 px-[1.25rem] py-2 md:py-[3.125rem] gap-6">
        {!uiSelector.skeleton ? (
          <>
            <div className="flex flex-col gap-1 md:gap-2.5">
              <div className="flex justify-between items-end">
                <div className="flex flex-col">
                  <span className="font-semibold md:font-black text-lg md:text-4xl text-soft-black">
                    {form.name.value}
                  </span>
                  <span className="grow text-dark-gray-3 text-sm md:text-base">
                    {form.category.value}
                  </span>
                </div>

                <span className="text-soft-black flex md:hidden items-center text-xs mb-auto">
                  $
                  <span className="text-lg font-black">{form.price.value}</span>
                </span>
              </div>
              <div
                className={`md:text-gray-400 tracking-wider mt-3 md:mt-0 hidden md:flex ${
                  readMore && "md:!line-clamp-3"
                }`}
              >
                {form.description.value}
              </div>
              <Button
                className={
                  "!w-fit !text-sm p-1 md:!p-2 hidden md:flex mt-2"
                }
                value={`${readMore ? "Read More" : "Read Less"}`}
                onClick={onHandleToggleDescription}
              />
            </div>
            <div className="text-soft-black text-base font-black my-3 hidden md:block">
              $<span className="text-4xl">{form.price.value}</span>
            </div>
          </>
        ) : (
          <Skeleton
            wrapper={() => (
              <>
                <div className="flex flex-col mt-3 gap-1 md:gap-2.5 animate-pulse">
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
              <span
                className={`text-sm text-gray-400 tracking-wider ${
                  readMore && "!line-clamp-3"
                }`}
              >
                {form.description.value}
              </span>
            </div>

            <Button
              className={"!w-fit !text-xs p-1.5 flex md:hidden"}
              value={`${readMore ? "Read More" : "Read Less"}`}
              onClick={onHandleToggleDescription}
            />

            <div className="flex flex-col gap-3">
              <span className="flex gap-1 text-base font-bold md:font-normal">
                Size <span className="hidden md:flex">:</span>
              </span>
              <ShoesSize
                className={"flex justify-center text-center !p-2"}
                size={data.size}
                onChange={onHandleChange}
                selected={[form.size.value]}
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
                selected={[form.color.value]}
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
                    selected={[form.size.value]}
                    withBasis={true}
                  />
                </div>

                <div className="flex flex-col gap-2 md:gap-4 animate-pulse">
                  <span className="h-3 bg-dark-gray rounded-lg w-1/4" />
                  <ShoesColor
                    colors={data.color}
                    onChange={onHandleChange}
                    selected={[form.color.value]}
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
