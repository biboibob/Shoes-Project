import React, { useState } from "react";
import { useSelector, useDispatch } from 'react-redux'

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

function DetailProduct() {

  /* Redux */
  const dispatch = useDispatch();
  const cartSelector = useSelector((state) => state.cart);

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

  const addShoesToCart = () => {
    let obj = {};

    Object.keys(form).map((val) => {
      obj[val] = form[val].value;
    })
    
    dispatch(addNewShoes(obj))

  }

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
    <div className="flex container min-h-full">
      <div className="basis-1/2 px-[2.5rem] py-[3.125rem] sticky top-0">
        <ShoesPreview asset={ShoesFeatured} />
      </div>
      <div className="flex flex-col basis-1/2 px-[1.25rem] py-[3.125rem] gap-6">
        <div className="flex flex-col gap-2.5">
          <div className="flex">
            <span className="grow text-soft-black">Men's Shoes</span>
            <i className="fa-solid fa-heart"></i>
          </div>
          <div className="font-black text-4xl text-soft-black">
            NIKE Metcon '8 By You
          </div>
          <div className="text-soft-black">
            The Nike Metcon 8 NBY allows you to add a little bling to your
            everyday workout routines with chrome options on everything from the
            Swoosh to the heel plate to shoelaces. Read More
          </div>
        </div>
        <div className="text-soft-black text-base font-black my-3">
          $<span className="text-4xl">160</span>
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-base">Size :</span>
          <ShoesSize
            className={"w-[5.6rem] text-center !p-2"}
            size={data.size}
            onChange={onHandleChange}
            selected={form.size.value}
          />
        </div>
        <div className="flex flex-col gap-4">
          <span className="text-base">Color :</span>
          <ShoesColor
            colors={data.color}
            onChange={onHandleChange}
            selected={form.color.value}
          />
        </div>
        <div className="flex gap-2">
          <button className="bg-soft-green font-semibold grow text-white rounded-md py-2" onClick={addShoesToCart}>
            {"Add To Cart"}
          </button>
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
