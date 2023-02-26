import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../utils/config";
import Skeleton from "react-loading-skeleton";
import API from "../helper/api";

/* Redux */
import { useSelector, useDispatch } from "react-redux";

/* Component */
import { Checkbox, Card, Button } from "../components/custom/index";
import { Quantity } from "../components/index";

/* redux Action */
import {
  addNewShoes,
  removeItem,
  onSelectShoesOnCart,
  onSelectAllShoesOnCart,
  onAllowSummaryReducer,
} from "../service/redux/slice/cart";
import { skeletonToggle } from "../service/redux/slice/ui";

//Service
import { Toast } from "../utils";

//asset
import Logo from "../assets/PNG/LogoBlack.png";

function Cart() {
  const api = new API();

  /* Hook */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartSelector = useSelector((state) => state.cart);
  const uiSelector = useSelector((state) => state.userInterface);

  const [form, setForm] = useState([]);
  const [cartShoesList, setCartShoeList] = useState([]);

  // State Handle Checkbox
  const [selectedList, setSelectedList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  //State Handle Total Price
  const [totalPrice, setTotalPrice] = useState({
    totalPrice: 0,
    quantity: 0,
    discount: 0,
  });

  useEffect(() => {
    if (selectedList.length > 0) {
      // Find Selected Value in Form  refering the selectedList
      const selectedResult = form
        .filter((val, idx) => {
          const result = selectedList.some((valSome) => valSome === idx);
          if (result) return val;
          return false;
        })
        .map((val) => {
          return {
            totalQuantityprice: val.price.value * val.addToCart.value,
            quantity: val.addToCart.value,
          };
        });

      setTotalPrice({
        ...totalPrice,
        totalPrice:
          selectedResult.length === 1
            ? selectedResult[0].totalQuantityprice.toFixed(2)
            : selectedResult
                .reduce((a, b) => a + b.totalQuantityprice, 0)
                .toFixed(2),
        quantity:
          selectedResult.length === 1
            ? selectedResult[0].quantity
            : selectedResult.reduce((a, b) => a + b.quantity, 0),
      });
    } else {
      setTotalPrice({
        discount: 0,
        totalPrice: 0,
        quantity: 0,
      });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedList, form]);

  useEffect(() => {
    let tmpSelectedList = [];
    const newArr = cartSelector.data.map((val, idx) => {
      let obj = {};

      if (val.onSelected) {
        tmpSelectedList.push(idx);
      }

      Object.keys(val).forEach((objMap) => {
        obj[objMap] = {
          value: val[objMap],
          statusErr: false,
          message: "",
        };
      });

      return obj;
    });
    setSelectedList(tmpSelectedList);
    setForm(newArr);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cartSelector]);

  //Get Updated Stock
  useEffect(() => {
    getDataCart();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getDataCart = () => {
    const requestBody = {
      id_shoes: cartSelector.data.map((val) => {
        return val.id_shoes;
      }),
    };

    const currentShoeList = [];

    dispatch(skeletonToggle(true));
    api
      .getCartData(requestBody)
      .then((res) => {
        const data = res.data.data;
        if (res.status === 200 && res.data.status) {
          data.shoesCart.forEach((val) => {
            const currentCartData = cartSelector.data.find(
              (valFind) => valFind.id_shoes === val.id_shoes
            );
            const stockOnly = val.stock.find(
              (valFind) =>
                valFind.id_shoes === currentCartData.id_shoes &&
                valFind.color === currentCartData.color &&
                valFind.size === currentCartData.size_detail_shoe
            );
            currentShoeList.push(stockOnly);
          });

          setCartShoeList(currentShoeList);
        }
      })
      .finally(() => {
        dispatch(skeletonToggle(false));
      });
  };

  /* Handle Change of Form */
  const onHandleChangeQuantity = (name, value, idx) => {
    let arr = [...form];
    arr[idx][name].value = arr[idx][name].value > value ? -1 : 1;

    let objForm = {};

    Object.keys(arr[idx]).forEach((val) => {
      objForm[val] = arr[idx][val].value;
    });

    dispatch(addNewShoes(objForm));
  };

  /* Handle Delete Items from Cart */
  const onHandleDeleteItem = (val) => {
    dispatch(removeItem([val]));
  };

  /* Handle Delete Items from Cart By Selected Value */
  const onHandleDeleteSelected = () => {
    if (selectedList.length === 0) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Shoes To Be Deleted",
      });
    } else {
      dispatch(removeItem(selectedList));
      setSelectedList([]);
      setSelectAll(false);
      Toast.fire({
        icon: "success",
        title: "Selected Shoes Successfully Deleted",
      });
    }
  };

  const onHandleCheckBox = (value) => {
    if (selectedList.some((selectedVal) => selectedVal === value)) {
      const indexVal = selectedList.indexOf(value);
      setSelectedList(selectedList.filter((_, idx) => idx !== indexVal));
      dispatch(onSelectShoesOnCart({ index: value, value: false }));
    } else {
      setSelectedList([...selectedList, ...[value]]);
      dispatch(onSelectShoesOnCart({ index: value, value: true }));
    }
  };

  const onHandleCheckboxSelectAll = () => {
    if (selectAll === true) {
      setSelectedList([]);
      setSelectAll(false);
      dispatch(onSelectAllShoesOnCart(false));
    } else {
      dispatch(onSelectAllShoesOnCart(true));
      setSelectAll(true);
      setSelectedList(
        form.map((val, idx) => {
          return idx;
        })
      );
    }
  };

  const handleNavigate = (Route, state) => {
    navigate(`${Route}`, { state: state });
  };

  const onHandleBuy = () => {
    if (totalPrice.quantity === 0) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Some Shoes To Proceed",
      });
    } else {
      dispatch(onAllowSummaryReducer(true));
      handleNavigate(PageRoutePath.SUMMARY, totalPrice);
    }
  };

  return cartSelector.data.length !== 0 ? (
    !uiSelector.skeleton ? (
      <div className="flex container grow min-h-full mt-3 gap-3">
        <div className="basis-full md:basis-2/3 flex flex-col gap-3">
          <span className="font-black text-lg md:text-2xl text-soft-gray">
            Cart
          </span>
          <div className="flex items-center justify-between">
            <Checkbox
              name={"SelectAll"}
              label={"Select All"}
              value={selectAll}
              onChange={onHandleCheckboxSelectAll}
            />
            <div
              className="flex items-center gap-2 text-sm md:text-base cursor-pointer"
              onClick={onHandleDeleteSelected}
            >
              <i className="fa-solid fa-trash-can"></i>
              <span>Delete Selected</span>
            </div>
          </div>
          <div className="border-t-4 border-dark-gray-2"></div>
          {form.map((val, idx) => (
            <div className="flex flex-col gap-3" key={idx}>
              <div className="flex gap-2">
                <Checkbox
                  noLabel={true}
                  value={selectedList.some((valSome) => valSome === idx)}
                  onChange={() => onHandleCheckBox(idx)}
                />

                <img
                  className="h-auto w-16 md:w-28 object-contain mb-auto border-soft-black border p-2 rounded-lg"
                  src={val.asset.value.URL}
                  alt={"shoes-img"}
                />

                <div className="flex flex-col ml-2 gap-2 grow">
                  <span
                    className="text-sm md:text-lg cursor-pointer"
                    onClick={() =>
                      handleNavigate(
                        `${PageRoutePath.PRODUCTS}/${val.id.value}`
                      )
                    }
                  >
                    {val.name.value}
                  </span>
                  <span className="flex gap-2 text-xs md:text-sm">
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">Size :</span>
                      <span className="py-1 px-2 bg-white border text-[0.7rem] rounded-md">
                        {val.size_detail_shoe.value} - EU
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <span className="text-gray-400">Color :</span>
                      <span
                        className={`flex h-5 w-5 text-[0.7rem] rounded-full`}
                        style={{
                          backgroundColor: val.color.value.toLowerCase(),
                        }}
                      />
                    </div>
                  </span>
    
                  <div className="flex justify-between mt-4 items-center">
                    <div className="flex items-center gap-3">
                      <Quantity
                        size="small"
                        name={"addToCart"}
                        value={val.addToCart.value}
                        idx={idx}
                        onChange={onHandleChangeQuantity}
                        max={
                          cartShoesList.find(
                            (valFind) =>
                              valFind?.id_shoes === val?.id_shoes.value
                          )?.stock_number
                        }
                      />
                      <i
                        className="fa-solid fa-trash-can text-dark-gray fa-sm md:fa-lg cursor-pointer"
                        onClick={() => onHandleDeleteItem(idx)}
                      ></i>
                    </div>

                    <span className="font-black mt-1 text-soft-black text-sm md:text-base">
                      ${val.price.value}
                    </span>
                  </div>
                </div>
              </div>

              <div className="border-t-2 border-dark-gray-2"></div>
            </div>
          ))}

          {/* Handle Summary in Mobile View */}
          <div className="md:hidden flex flex-col gap-1 mt-auto">
            <span className="text-base font-bold mb-2">Summary</span>
            <div className="flex justify-between text-sm">
              <span>Total Price ({totalPrice.quantity} Items)</span>
              <span>${totalPrice.totalPrice}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Total Discount</span>
              <span>-</span>
            </div>
            <hr className="mt-4"></hr>
            <div className="flex justify-between text-sm my-2 !font-bold">
              <span className="font-bold">Total Price</span>
              <span className="font-bold">${totalPrice.totalPrice}</span>
            </div>
            <Button
              value={"Proceed"}
              className="!bg-soft-green p-2 mt-2"
              onClick={onHandleBuy}
            />
          </div>
        </div>

        {/* Handle Summary in Web View */}
        <div className="flex-col hidden md:flex basis-1/3 px-3 gap-3 realtive">
          <Card className="flex flex-col shadow-CartShadow gap-1 py-3 px-4 sticky top-24">
            <span className="font-black text-xl mb-2">Summary</span>
            <div className="flex justify-between">
              <span>Total Price ({totalPrice.quantity} Items)</span>
              <span>${totalPrice.totalPrice}</span>
            </div>
            <div className="flex justify-between">
              <span>Total Discount</span>
              <span>-</span>
            </div>
            <hr className="mt-4"></hr>
            <div className="flex justify-between text-base my-2 !font-bold">
              <span className="font-bold">Total Price</span>
              <span className="font-bold">${totalPrice.totalPrice}</span>
            </div>
            <Button
              value={"Proceed"}
              className="!bg-soft-green p-2 mt-2"
              onClick={onHandleBuy}
            />
          </Card>
        </div>
      </div>
    ) : (
      <Skeleton
        wrapper={() => (
          <div className="flex md:flex-row flex-col container gap-3">
            <div className="flex flex-col basis-3/4 gap-3 animate-pulse">
              <div className="flex h-10 w-32 bg-dark-gray rounded-md" />
              <div className="flex justify-between">
                <div className="flex h-8 w-32 bg-dark-gray rounded-md" />
                <div className="flex h-8 w-32 bg-dark-gray rounded-md" />
              </div>
              <div className="flex h-32 w-auto bg-dark-gray rounded-md" />
              <div className="flex h-32 w-auto bg-dark-gray rounded-md" />
              <div className="flex h-32 w-auto bg-dark-gray rounded-md" />
            </div>
            <div className="flex flex-col basis-1/4 animate-pulse w-auto h-40 bg-dark-gray rounded-md" />
          </div>
        )}
      />
    )
  ) : (
    <div className="flex flex-col grow justify-center items-center">
      <img
        src={Logo}
        className="w-auto animate-bounce h-14 mb-3"
        alt="logo-nike"
      />
      <span className="text-lg md:text-xl font-bold tracking-wide">
        Your Cart Empty
      </span>
      <span className="text-sm md:text-base font-light tracking-wide">
        Let's Fill With Your Dream Shoes
      </span>
    </div>
  );
}

export default Cart;
