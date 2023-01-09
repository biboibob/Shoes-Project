import React, { useEffect, useState, useRef, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

/* Component */
import { Checkbox, Input, Button } from "../components/custom/index";
import {
  ShoesSize,
  ShoesColor,
  PriceRange,
  CardCatalog,
} from "../components/index";

/* Hook */
import { useWindowSize } from "../hook";

/* Redux Action */
import { skeletonToggle } from "../service/redux/slice/ui";

/* Dependencies */
import _ from "lodash";

// Service
import API from "../helper/api";
import { valueProcessing, JSXEventOffer } from "../utils";

function Products() {
  const api = new API();

  /* Redux */
  let param = useLocation();
  const ref = useRef();
  const dispatch = useDispatch();
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
    ],
    shoes: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
    offer: [],
  });

  /* Hook */
  const windowSize = useWindowSize();

  /* State */
  const [form, setForm] = useState({
    women: {
      value: false,
      statusErr: false,
      message: "",
    },
    men: {
      value: false,
      statusErr: false,
      message: "",
    },
    kids: {
      value: false,
      statusErr: false,
      message: "",
    },
    size: {
      value: [],
      statusErr: false,
      message: "",
    },
    minPrice: {
      value: 0,
      statusErr: false,
      message: "",
    },
    maxPrice: {
      value: 0,
      statusErr: false,
      message: "",
    },
    color: {
      value: [],
      statusErr: false,
      message: "",
    },
  });

  /* Handle Temporary Form Filter in Mobile View */
  const [tmpForm, setTmpForm] = useState({
    women: {
      value: false,
      statusErr: false,
      message: "",
    },
    men: {
      value: false,
      statusErr: false,
      message: "",
    },
    kids: {
      value: false,
      statusErr: false,
      message: "",
    },
    size: {
      value: [],
      statusErr: false,
      message: "",
    },
    color: {
      value: [],
      statusErr: false,
      message: "",
    },
    minPrice: {
      value: 0,
      statusErr: false,
      message: "",
    },
    maxPrice: {
      value: 0,
      statusErr: false,
      message: "",
    },
  });

  const [search, setSearch] = useState("");
  const [toggleFilter, setToggleFilter] = useState(false);

  /* Handle If Form Change, Data Shoes List WIll Be Update */
  useEffect(() => {
    if (!_.isEqual(form, tmpForm)) setTmpForm({ ...form });
    getData();
  }, [form]);

  /* Handle if offer change */
  // useEffect(() => {
  //   const currForm = form;
  //   for (var i = 0; i < data.offer.length; i++) {
  //     currForm[data.offer[i].id] = {
  //       value: false,
  //       statusErr: false,
  //       message: "",
  //     };
  //   }

  //   setForm({
  //     ...currForm,
  //   });
  //   setTmpForm({
  //     ...currForm,
  //   });
  // }, [data.offer]);

  useEffect(() => {
    dispatch(skeletonToggle(true));
    Promise.all([api.getFilterInitiate()])
      .then(([res1]) => {
        const currForm = form;
        const resFilter = res1.data.data;

        /* If There's Gender Category argument on navigate state, it will immediately change the value Form of Gender*/
        for (var i = 0; i < Object.keys(form).length; i++) {
          /* Check Value if Has State Category */
          if (param?.state?.state.category) {
            Object.keys(form).map((val) => {
              if (val === param.state.state.category) {
                currForm[param.state.state.category].value = true;
              }
            });
          }
        }

        /* Set Event Offer Data from API to Form State */
        if (resFilter.getOfferList.length > 0) {
          for (var i = 0; i < resFilter.getOfferList.length; i++) {
            currForm[resFilter.getOfferList[i].id_sale] = {
              value: false,
              statusErr: false,
              message: "",
            };
          }
        }

        setData({
          ...data,
          color: resFilter.colorOpt.map((val) => {
            return val.color;
          }),
          /*Set Unique */
          size: [
            ...new Set(
              resFilter.sizeOpt.map((val) => {
                return Math.round(val.size);
              })
            ),
          ],
          offer: resFilter.getOfferList.map((val) => {
            return {
              id: val.id_sale,
              label: val.sale_name,
            };
          }),
        });
        
        setForm({
          ...currForm,
        });

        setTmpForm({
          ...currForm,
        });
      })
      .finally(() => {
        dispatch(skeletonToggle(false));
      });
  }, []);

  // const getInitiateFilter = () => {
  //   api.getFilterInitiate().then((res) => {
  //     const dataResponse = res.data.data;

  //     setData({
  //       ...data,
  //       color: dataResponse.colorOpt.map((val) => {
  //         return val.color;
  //       }),
  //       /*Set Unique */
  //       size: [
  //         ...new Set(
  //           dataResponse.sizeOpt.map((val) => {
  //             return Math.round(val.size);
  //           })
  //         ),
  //       ],
  //     });
  //   });
  // };

  const getData = useCallback(
    _.debounce(() => {
      const arrGender = [];
      const arrOffer = [];

      /* Set Array Value From Object Bool (Set Gender and Offer) */
      for (var i = 0; i < Object.keys(form).length; i++) {
        const currentKey = Object.keys(form)[i];
        if (
          currentKey === "men" ||
          currentKey === "women" ||
          currentKey === "kids"
        ) {
          if (form[currentKey].value) arrGender.push(currentKey);
        } else if (data.offer.some((val) => val.id === parseInt(currentKey))) {
          if (form[currentKey].value) arrOffer.push(parseInt(currentKey));
        }
      }

      const requestBody = {
        gender: arrGender,
        minPrice: parseInt(form.minPrice.value),
        maxPrice: parseInt(form.maxPrice.value),
        size: form.size.value,
        color: form.color.value,
        offer: arrOffer,
      };

      return api.getProductList(requestBody).then((res) => {
        const dataResponse = res.data.data;
        setData({
          ...data,
          shoes: dataResponse.getShoesList,
        });
      });
    }),
    [form]
  );

  /* Handle on Change Value */
  const onHandleChange = (name, value) => {
    if (windowSize[0] < 768) {
      setTmpForm({
        ...tmpForm,
        [name]: {
          ...form[name],
          value: valueProcessing(value, form[name].value),
        },
      });
    } else {
      setForm({
        ...form,
        [name]: {
          ...form[name],
          value: valueProcessing(value, form[name].value),
        },
      });
    }
  };

  const onGetData = () => {
    // console.log("Form", form);
    // console.log("Temporary Form", tmpForm);
  };

  const onApplyFilter = () => {
    setForm({ ...tmpForm });
  };

  return (
    <div className="flex container relative min-h-min">
      <div className="hidden md:flex md:flex-col md:!basis-1/5 border border-gray-border">
        <div className="FilterStyle">
          <span className="font-bold">Filter</span>
        </div>
        <div className="FilterStyle">
          <span className="font-bold">Gender</span>
          <Checkbox
            onChange={onHandleChange}
            name={"women"}
            label={"Women's"}
            value={form.women.value}
          />
          <Checkbox
            onChange={onHandleChange}
            name={"men"}
            label={"Men's"}
            value={form.men.value}
          />
          <Checkbox
            onChange={onHandleChange}
            name={"kids"}
            label={"Kid's"}
            value={form.kids.value}
          />
        </div>
        <div className="FilterStyle">
          <span className="font-bold">Price Range</span>
          <PriceRange
            name={"minPrice"}
            label={"Min"}
            onChange={onHandleChange}
          />
          <PriceRange
            name={"maxPrice"}
            label={"Max"}
            onChange={onHandleChange}
          />
        </div>
        <div className="FilterStyle">
          <span className="font-bold">Size</span>
          <ShoesSize
            size={data.size}
            onChange={onHandleChange}
            selected={form.size.value}
          />
        </div>
        <div className="FilterStyle">
          <span className="font-bold">Color</span>
          <ShoesColor
            colors={data.color}
            onChange={onHandleChange}
            selected={form.color.value}
          />
        </div>
        <div className="FilterStyle">
          <span className="font-bold">Offer</span>
          {data.offer.map((val, idx) => (
            <div key={idx}>
              {JSXEventOffer(val.id, val.label, form, onHandleChange)}
            </div>
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-3 md:gap-4 md:border-y md:border-r border-gray-border basis-full md:basis-4/5 p-2 md:!p-5">
        {!uiSelector.skeleton ? (
          <div className="flex relative items-center w-full">
            <i className="fa-solid fa-magnifying-glass text-dark-gray-3 absolute left-5 fa-sm"></i>
            <input
              onChange={(e) => setSearch(e.target.value)}
              value={search}
              placeholder={"Nike Jordan"}
              className="flex w-full px-[1.25rem] py-[0.813rem] rounded-xl pl-12 shadow-inputProductShadow text-sm md:text-base"
            />
          </div>
        ) : (
          <Skeleton
            wrapper={() => (
              <div className="h-10 w-full bg-dark-gray animate-pulse rounded-lg" />
            )}
          />
        )}

        <div className="flex text-soft-gray justify-end gap-3 px-1">
          {!uiSelector.skeleton ? (
            <>
              {search !== "" && (
                <div className="grow text-xs md:text-base">
                  <span className="font-light">Search Result For</span>
                  <b>{`"${search}"`}</b>
                </div>
              )}
              <div
                className="flex md:hidden items-center gap-2 text-xs md:text-base"
                onClick={() => setToggleFilter(true)}
              >
                <i className="fa-solid fa-filter fa-xs"></i>
                <span>Filter</span>
              </div>
              <div className="flex items-center gap-2 text-xs md:text-base">
                <i className="fa-solid fa-sort fa-xs"></i>
                <span>Sort</span>
              </div>
            </>
          ) : (
            <Skeleton
              wrapper={() => (
                <div className="h-3 w-10 bg-dark-gray animate-pulse rounded-lg" />
              )}
            />
          )}
        </div>
        <CardCatalog data={data.shoes} />
      </div>

      {/* Handle Filter on Mobile Size  */}
      <div
        className={`${toggleFilter ? "left-0" : "-left-full"} ${
          windowSize[0] > 768 && "hidden"
        } inset-y-0 z-[9999] bg-white fixed flex flex-col h-full w-full transition-all duration-500 p-4`}
      >
        <div className="flex justify-between items-center">
          <span className="font-bold">Filter</span>
          <i
            className="fa-solid fa-circle-xmark fa-lg"
            onClick={() => setToggleFilter(false)}
          ></i>
        </div>
        <div className="flex-auto overscroll-y-auto overflow-y-auto min-h-0">
          <div className="FilterStyle px-0">
            <span className="font-bold">Gender</span>
            <Checkbox
              onChange={onHandleChange}
              name={"women"}
              label={"Women's"}
            />
            <Checkbox onChange={onHandleChange} name={"men"} label={"Men's"} />
            <Checkbox onChange={onHandleChange} name={"kids"} label={"Kid's"} />
          </div>
          <div className="FilterStyle px-0">
            <span className="font-bold">Price Range</span>
            <PriceRange
              name={"minPrice"}
              label={"Min"}
              onChange={onHandleChange}
            />
            <PriceRange
              name={"maxPrice"}
              label={"Max"}
              onChange={onHandleChange}
            />
          </div>
          <div className="FilterStyle px-0">
            <span className="font-bold">Size</span>
            <ShoesSize
              size={data.size}
              name={"size"}
              onChange={onHandleChange}
              selected={tmpForm.size.value}
            />
          </div>
          <div className="FilterStyle px-0">
            <span className="font-bold">Color</span>
            <ShoesColor
              colors={data.color}
              name={"color"}
              onChange={onHandleChange}
              selected={tmpForm.color.value}
            />
          </div>
          <div className="FilterStyle px-0">
            <span className="font-bold">Offer</span>
            {data.offer.map((val, idx) => (
              <div key={idx}>
                {JSXEventOffer(val.id, val.label, form, onHandleChange)}
              </div>
            ))}
          </div>
        </div>
        <div className="bg-white  bottom-0 inset-x-0 w-full p-3">
          <Button
            value={"Apply"}
            onClick={onApplyFilter}
            className="!bg-soft-green p-2 mt-2"
          />
        </div>
      </div>
    </div>
  );
}

export default Products;
