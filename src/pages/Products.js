import React, { useState } from "react";

/* Component */
import { Checkbox, Input } from "../components/custom/index";
import {
  ShoesSize,
  ShoesColor,
  PriceRange,
  CardCatalog,
} from "../components/index";

function Products() {
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
      value: 0,
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
      value: 0,
      statusErr: false,
      message: "",
    },
    discount: {
      value: false,
      statusErr: false,
      message: "",
    },
    latenightsale: {
      value: false,
      statusErr: false,
      message: "",
    },
  });

  const [search, setSearch] = useState("");

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
      <div className="basis-1/5 border border-gray-border">
        <div className="FilterStyle">
          <span className="font-bold">Filter</span>
        </div>
        <div className="FilterStyle">
          <span className="font-bold">Gender</span>
          <Checkbox
            onChange={onHandleChange}
            name={"women"}
            label={"Women's"}
          />
          <Checkbox onChange={onHandleChange} name={"men"} label={"Men's"} />
          <Checkbox onChange={onHandleChange} name={"kid"} label={"Kids'"} />
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
          <Checkbox
            onChange={onHandleChange}
            name={"discount"}
            label={"Discount's"}
          />
          <Checkbox
            onChange={onHandleChange}
            name={"latenightsale"}
            label={"Late Night Sale"}
          />
        </div>
      </div>
      <div className="flex flex-col gap-4 border-y border-r border-gray-border basis-4/5 p-5">
        <div className="flex relative items-center w-full">
          <i className="fa-solid fa-magnifying-glass text-dark-gray-3 absolute left-5"></i>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder={"Nike Jordan"}
            className="flex w-full px-[1.25rem] py-[0.813rem] rounded-xl pl-12 shadow-inputProductShadow"
          />
        </div>
        <div className="flex text-soft-gray">
          <div className="grow">
            <span className="font-light">Search Result For</span>{" "}
            <b>"Nike Jordan"</b>
          </div>
          <i className="fa-solid fa-filter"></i>
        </div>
        <CardCatalog data={sample} />
      </div>
    </div>
  );
}

export default Products;
