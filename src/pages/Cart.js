import React, { useState, useEffect } from "react";

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

function Cart() {
  /* Hook */
  const dispatch = useDispatch();

  const cartSelector = useSelector((state) => state.cart);
  const [form, setForm] = useState([]);

  // State Handle Checkbox
  const [selectedList, setSelectedList] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

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
    dispatch(removeItem(val));
  };

  const onHandleCheckBox = (value) => {
    if (selectedList.some((selectedVal) => selectedVal === value)) {
      const indexVal = selectedList.indexOf(value);
      setSelectedList(
        selectedList.filter((val, idx) => idx !== indexVal && val)
      );
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
        form.map((val) => {
          return val.name.value;
        })
      );
    }
  };

  return (
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
          <div className="flex items-center gap-2 text-sm md:text-base">
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
                value={selectedList.some(
                  (valSome) => valSome === val.name.value
                )}
                onChange={() => onHandleCheckBox(val.name.value)}
              />
              <img className="h-16 w-16 md:h-24 md:w-24" />
              <div className="flex flex-col ml-2">
                <span className="text-sm md:text-xl font-semibold">
                  {val.name.value}
                </span>
                <span className="flex gap-2 text-xs md:text-sm">
                  <span className="py-1 px-2 bg-white border text-[0.7rem] rounded-md">
                    {val.size.value} - EU
                  </span>
                  <span
                    className={`h-auto py-1 px-2 text-[0.7rem] rounded-md bg-[${val.color.value.toLowerCase()}]`}
                  >
                    {val.color.value}
                  </span>
                </span>
                <span className="font-black mt-2 text-sm md:text-base">
                  ${val.price.value}
                </span>
              </div>
            </div>
            <div className="flex justify-between ml-8">
              <div className="flex gap-2 text-purple-pallete items-center text-xs md:text-sm">
                <i className="fa-solid fa-pencil"></i>
                <span className="font-bold">Write A Note</span>
              </div>
              <div className="flex items-center gap-3">
                <i
                  className="fa-solid fa-trash-can text-dark-gray fa-sm md:fa-lg cursor-pointer"
                  onClick={() => onHandleDeleteItem(val.name.value)}
                ></i>
                <Quantity
                  size="small"
                  name={"addToCart"}
                  value={val.addToCart.value}
                  idx={idx}
                  onChange={onHandleChangeQuantity}
                />
              </div>
            </div>
            <div className="border-t-2 border-dark-gray-2"></div>
          </div>
        ))}

        <div className="md:hidden">
          <div className="flex justify-between">
            <span className="text-base font-bold">Checkout</span>
          </div>
        </div>
      </div>
      <div className="flex-col hidden md:flex px-3 gap-3">
        <Card className="flex items-center shadow-CartShadow gap-2 py-3 px-4">
          <div className="flex text-2xl font-bold">%</div>
          <div className="flex flex-col px-2">
            <span className="font-bold">Redeem Your Code</span>
            <span className="text-sm">
              Input Your Code Here To Get Discount
            </span>
          </div>
        </Card>
        <Card className="flex flex-col shadow-CartShadow gap-1 py-3 px-4">
          <span className="font-black text-xl mb-2">Summary</span>
          <div className="flex justify-between">
            <span>Total Price (3 Items)</span>
            <span>$180</span>
          </div>
          <div className="flex justify-between">
            <span>Total Discount</span>
            <span>$80</span>
          </div>
          <hr className="mt-4"></hr>
          <div className="flex justify-between text-lg">
            <span className="font-bold">Total Discount</span>
            <span className="font-bold">$100</span>
          </div>
          <Button value={"Buy"} className="!bg-soft-green p-2 mt-2" />
        </Card>
      </div>
    </div>
  );
}

export default Cart;
