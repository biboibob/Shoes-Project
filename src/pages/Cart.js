import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../utils/config";

/* Redux */
import { useSelector, useDispatch } from "react-redux";

/* Component */
import { Checkbox, Card, Button } from "../components/custom/index";
import { Quantity } from "../components/index";

/* redux Action */
import {
  addNewShoes,
  removeAllCart,
  removeItem,
} from "../service/redux/slice/cart";

//Service
import { Toast } from "../utils";

//asset
import Logo from "../assets/PNG/LogoBlack.png";
import { style } from "@mui/system";

function Cart() {
  /* Hook */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartSelector = useSelector((state) => state.cart);
  const [form, setForm] = useState([]);

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
        })
        .map((val) => {
          return val.price.value * val.addToCart.value;
        });

      setTotalPrice({
        ...totalPrice,
        totalPrice:
          selectedResult.length === 1
            ? selectedResult[0]
            : selectedResult.reduce((a, b) => a + b),
        quantity: selectedList.length,
      });
    } else {
      setTotalPrice({
        discount: 0,
        totalPrice: 0,
        quantity: 0,
      });
    }
  }, [selectedList, form]);

  useEffect(() => {
    const newArr = cartSelector.data.map((val) => {
      let obj = {};

      Object.keys(val).map((objMap) => {
        obj[objMap] = {
          value: val[objMap],
          statusErr: false,
          message: "",
        };
      });

      return obj;
    });

    setForm(newArr);
  }, [cartSelector]);

  /* Handle Change of Form */
  const onHandleChangeQuantity = (name, value, idx) => {
    let arr = [...form];
    arr[idx][name].value = arr[idx][name].value > value ? -1 : 1;

    let objForm = {};

    Object.keys(arr[idx]).map((val) => {
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
    } else {
      setSelectedList([...selectedList, ...[value]]);
    }
  };

  const onHandleCheckboxSelectAll = () => {
    if (selectAll === true) {
      setSelectedList([]);
      setSelectAll(false);
    } else {
      setSelectAll(true);
      setSelectedList(
        form.map((val, idx) => {
          return idx;
        })
      );
    }
  };

  const handleNavigate = (Route) => {
    navigate(`${Route}`);
  };

  const onHandleBuy = () => {
    if (totalPrice.quantity === 0) {
      Toast.fire({
        icon: "warning",
        title: "Please Select Some Shoes To Proceed",
      });
    } else {
    }
  };

  {
    return cartSelector.data.length !== 0 ? (
      <div className="flex container min-h-full mt-3 gap-3">
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
                <img className="h-16 w-16 md:h-24 md:w-24" />
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
                        {val.size.value} - EU
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
          <div className="md:hidden flex flex-col gap-1">
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
              value={"Buy"}
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
              value={"Buy"}
              className="!bg-soft-green p-2 mt-2"
              onClick={onHandleBuy}
            />
          </Card>
        </div>
      </div>
    ) : (
      <div className="flex flex-col grow justify-center items-center">
        <img src={Logo} className="w-auto h-14 mb-3" />
        <span className="text-lg md:text-xl font-bold tracking-wide">
          Your Cart Empty
        </span>
        <span className="text-sm md:text-base font-light tracking-wide">
          Let's Fill With Your Dream Shoes
        </span>
      </div>
    );
  }
}

export default Cart;
