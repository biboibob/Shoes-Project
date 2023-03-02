import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate, useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import Swal from "sweetalert2";

//redux Action
import { addNewShoes } from "../service/redux/slice/cart";

/* Component */
import {
  ShoesPreview,
  ShoesSize,
  ShoesColor,
  Quantity,
} from "../components/index";
import { Button } from "../components/custom";

/* Redux Action */
import { skeletonToggle } from "../service/redux/slice/ui";

// Service
import { Toast } from "../utils";
import API from "../helper/api";
import { PageRoutePath } from "../utils/config";

function DetailProduct() {
  const api = new API();
  const navigate = useNavigate();
  const location = useLocation();

  /* Redux */
  const dispatch = useDispatch();
  const uiSelector = useSelector((state) => state.userInterface);

  /* Test Data */
  const [data, setData] = useState({
    allInfo: {},
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
    size_detail_shoe: {
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
    id_shoes: {
      value: null,
      statusErr: false,
      message: "",
    },
    id_product: {
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
      message: "",
    },
  });

  //Toggle Button ReadMore
  const [readMore, setReadMore] = useState(true);

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getData = () => {
    const lastPath = window.location.pathname.substring(
      window.location.pathname.lastIndexOf("/") + 1
    );

    const requestBody = {
      id_shoes: parseInt(lastPath),
    };

    dispatch(skeletonToggle(true));

    return api
      .getDetailShoes(requestBody)
      .then((res) => {
        if (res.data.status === 200 && res.data.data.status) {
          const dataResponse = res.data.data;

          let updatedForm = form;

          let updatedValue = {
            name: dataResponse.shoesDetail.name,
            price: dataResponse.shoesDetail.price,
            description: dataResponse.shoesDetail.description,
            category: dataResponse.categoryShoes.category.category_name,
            id_shoes: dataResponse.shoesDetail.id_shoes,
            asset: dataResponse.shoesPreview.find(
              (val) => val.type === "display"
            ),
            id_product: dataResponse.categoryShoes.id_product,
          };

          if (
            location.state !== null &&
            form.color.value === "" &&
            form.size_detail_shoe.value === ""
          ) {
            const data = location.state.state;

            updatedValue = {
              ...updatedValue,
              color: data.color,
              size_detail_shoe: data.size,
            };
          }

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
            size: dataResponse.sizeOpt,
            image: dataResponse.shoesPreview.filter(
              (val) => val.type !== "display"
            ),
            allInfo: dataResponse.shoesDetail,
          });

          setForm(updatedForm);
        } else {
          Toast.fire({
            icon: "warning",
            title: "Shoes product not found",
          });
          navigateTo(PageRoutePath.PRODUCTS);
        }
      })
      .then(() => {
        dispatch(skeletonToggle(false));
      });
  };

  const navigateTo = (Route) => {
    navigate(`${Route}`);
  };

  const addShoesToCart = () => {
    if (form.color.value === "" || form.size_detail_shoe.value === "") {
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

          Object.keys(form).forEach((val) => {
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
      addToCart: {
        ...form.addToCart,
        value: name === "size_detail_shoe" || name === "color" ? 1 : value,
      },
    });
  };

  const onHandleToggleDescription = () => {
    setReadMore(readMore ? false : true);
  };

  return (
    <>
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
                    <span className="text-lg font-black">
                      {form.price.value}
                    </span>
                  </span>
                </div>

                <div
                  id={`content-paragraph`}
                  className={`md:text-gray-400 tracking-wider mt-3 md:mt-0 hidden md:flex ${
                    readMore && "md:!line-clamp-3"
                  }`}
                >
                  {form.description.value}
                </div>
                <Button
                  className={"!w-fit !text-sm p-1 md:!p-2 hidden md:flex mt-2"}
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
                  <div className="flex flex-col my-3 gap-1 md:gap-2.5 animate-pulse">
                    <div className="flex justify-between items-end">
                      <div className="flex flex-col grow gap-2">
                        <span className="grow bg-dark-gray h-3 w-1/2 md:w-1/4 rounded-lg" />
                        <span className="h-10 bg-dark-gray w-2/3 rounded-lg" />
                      </div>

                      <span className="h-5 bg-dark-gray w-16 rounded-lg md:hidden" />
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
                  name={"size_detail_shoe"}
                  onChange={onHandleChange}
                  selected={[form.size_detail_shoe.value]}
                  gridClassName={"grid-cols-3"}
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
                  <div className="flex flex-col gap-2 md:gap-4 animate-pulse">
                    <span className="h-3 bg-dark-gray rounded-lg w-1/4" />
                    <ShoesSize
                      className={"flex justify-center text-center !p-2"}
                      name={"size_detail_shoe"}
                      size={data.size}
                      onChange={onHandleChange}
                      selected={[form.size_detail_shoe.value]}
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
              max={
                data.allInfo?.stock?.find(
                  (val) =>
                    val.size === form.size_detail_shoe.value &&
                    val.color === form.color.value
                )?.stock_number
              }
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default DetailProduct;
