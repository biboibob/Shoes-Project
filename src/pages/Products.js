import React, { useEffect, useState, useMemo } from "react";
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
  FullPanel,
} from "../components/index";

/* Hook */
import { usePrevious, useWindowSize } from "../hook";

/* Redux Action */
import {
  skeletonToggle,
  specificSkeletonToggle,
} from "../service/redux/slice/ui";

/* Dependencies */
import _ from "lodash";

// Service
import API from "../helper/api";
import { valueProcessing, JSXEventOffer } from "../utils";

function Products() {
  const api = new API();

  /* Redux */
  let param = useLocation();

  const dispatch = useDispatch();
  const uiSelector = useSelector((state) => state.userInterface);

  /* Test Data */
  const [data, setData] = useState({
    limit: 10,
    offset: 0,
    hasMoreData: true,
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
    shoes: [],
    offer: [],
    sort: [
      "Highest Price",
      "Lowest Price",
      "Shoes Name Asc",
      "Shoes Name Desc",
      "Category",
    ],
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

  const [sort, setSort] = useState({
    status: false,
    value: "",
  });
  const [search, setSearch] = useState("");
  const [toggleFilter, setToggleFilter] = useState(false);

  //To Prevent Initiate Render on UseEffect, we use this state
  const [boolFilter, setBoolFilter] = useState(false);

  //Hook Previous
  const prevForm = usePrevious(form);

  useEffect(() => {
    getInitiateFilter();
  }, []);

  const getInitiateFilter = () => {
    dispatch(skeletonToggle(true));
    return api
      .getFilterInitiate()
      .then((res) => {
        const currForm = form;
        const resFilter = res.data.data;

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
      .then(() => {
        dispatch(skeletonToggle(false));
        setBoolFilter(true);
      });
  };

  /* Handle If Form Change, Data Shoes List WIll Be Update */
  useEffect(() => {
    if (!_.isEqual(form, tmpForm)) setTmpForm({ ...form });

    dispatch(specificSkeletonToggle({ shoesListCategory: true }));
    if (boolFilter) {
      getData(form, data, search);
    }
  }, [form, search]);

  //Handle InfiniteScroll Get More Data
  // useEffect(() => {
  //   if (data.shoes.length > 0) {
  //     fetchMore(form, data, search);
  //   }
  // }, [data.offset]);

  const fetchMore = (currOffset) => {
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
      limit: data.limit,
      offset: currOffset ? currOffset : data.offset,
      search: search,
      gender: arrGender,
      minPrice: parseInt(form.minPrice.value),
      maxPrice: parseInt(form.maxPrice.value),
      size: form.size.value,
      color: form.color.value,
      offer: arrOffer,
    };

    return api
      .getProductList(requestBody)
      .then((res) => {
        const dataResponse = res.data.data;

        setData(() => ({
          ...data,
          hasMoreData: dataResponse.getShoesList.length > 0 ? true : false,
          offset: currOffset,
          shoes: [...data.shoes, ...dataResponse.getShoesList],
        }));

        setSort({
          status: false,
          value: "",
        });
      })
      .then(() => {});
  };

  /* Handle New Shoe List Request With Debounce Technique */
  const getData = useMemo(
    () =>
      _.debounce((newForm, newData, newSearch) => {
        const arrGender = [];
        const arrOffer = [];

        /* Set Array Value From Object Bool (Set Gender and Offer) */
        for (var i = 0; i < Object.keys(newForm).length; i++) {
          const currentKey = Object.keys(newForm)[i];
          if (
            currentKey === "men" ||
            currentKey === "women" ||
            currentKey === "kids"
          ) {
            if (newForm[currentKey].value) arrGender.push(currentKey);
          } else if (
            data.offer.some((val) => val.id === parseInt(currentKey))
          ) {
            if (newForm[currentKey].value) arrOffer.push(parseInt(currentKey));
          }
        }

        const requestBody = {
          limit: 10,
          offset: 0,
          search: newSearch,
          gender: arrGender,
          minPrice: parseInt(newForm.minPrice.value),
          maxPrice: parseInt(newForm.maxPrice.value),
          size: newForm.size.value,
          color: newForm.color.value,
          offer: arrOffer,
        };

        return api
          .getProductList(requestBody)
          .then((res) => {
            const dataResponse = res.data.data;

            setData({
              ...newData,
              offset: 0,
              hasMoreData: true,
              shoes: dataResponse.getShoesList,
            });

            setSort({
              status: false,
              value: "",
            });
          })
          .then(() => {})
          .finally(() => {
            dispatch(specificSkeletonToggle({ shoesListCategory: false }));
          });
      }, 750),
    []
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

  const onApplyFilter = () => {
    setForm({ ...tmpForm });
    setToggleFilter(false);
  };

  const onToggleSort = () => {
    setSort({
      ...sort,
      status: sort.status ? false : true,
    });
  };

  const setValueSort = (e, val) => {
    e.stopPropagation();
    setSort({
      value: val,
      status: false,
    });
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
              <div
                className="flex relative items-center gap-2 text-xs md:text-base cursor-pointer"
                onClick={onToggleSort}
              >
                <i className="fa-solid fa-sort fa-xs"></i>
                <span>Sort</span>

                {/* Handle Sort */}
                <div
                  className={`${
                    sort.status ? "max-w-lg" : "max-w-0"
                  } transition-all  z-50 duration-500 overflow-x-hidden box-border rounded-lg block right-0 gap-2 absolute top-10 bg-white shadow-2xl`}
                >
                  <div className="flex flex-col w-max p-2 gap-2.5">
                    {data.sort.map((val, idx) => (
                      <span
                        key={idx}
                        onClick={(e) => setValueSort(e, val)}
                        className={`${
                          val === sort.value
                            ? "bg-primary-color text-white p-2 rounded-lg"
                            : "p-2"
                        }`}
                      >
                        {val}
                      </span>
                    ))}
                  </div>
                </div>
                {/* End Sort */}
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
        <CardCatalog data={data} onFetch={fetchMore} sort={sort} />
      </div>

      {/* Handle Filter on Mobile Size  */}
      <FullPanel
        contentClassName={"gap-3"}
        onToggle={toggleFilter}
        onHide={() => setToggleFilter(false)}
      >
        <div className="flex justify-between items-center">
          <span className="font-bold">Filter</span>
        </div>
        <div className="flex-auto overscroll-y-auto min-h-0">
          <div className="FilterStyle px-0">
            <span className="text-sm font-bold">Gender</span>
            <Checkbox
              onChange={onHandleChange}
              name={"women"}
              label={"Women's"}
              value={tmpForm.women.value}
            />
            <Checkbox
              onChange={onHandleChange}
              name={"men"}
              label={"Men's"}
              value={tmpForm.men.value}
            />
            <Checkbox
              onChange={onHandleChange}
              name={"kids"}
              label={"Kid's"}
              value={tmpForm.kids.value}
            />
          </div>
          <div className="FilterStyle px-0">
            <span className="text-sm font-bold">Price Range</span>
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
            <span className="text-sm font-bold">Size</span>
            <ShoesSize
              size={data.size}
              name={"size"}
              onChange={onHandleChange}
              selected={tmpForm.size.value}
            />
          </div>
          <div className="FilterStyle px-0">
            <span className="text-sm font-bold">Color</span>
            <ShoesColor
              colors={data.color}
              name={"color"}
              onChange={onHandleChange}
              selected={tmpForm.color.value}
            />
          </div>
          <div className="FilterStyle px-0">
            <span className="text-sm font-bold">Offer</span>
            {data.offer.map((val, idx) => (
              <div key={idx}>
                {JSXEventOffer(val.id, val.label, tmpForm, onHandleChange)}
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white text-sm bottom-0 inset-x-0 w-full">
          <Button
            value={"Apply"}
            onClick={onApplyFilter}
            className="!bg-soft-green p-2 mt-2"
          />
        </div>
      </FullPanel>
    </div>
  );
}

export default Products;
