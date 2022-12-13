import React, { useEffect, useState } from "react";

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

/* Dependencies */
import _ from "lodash";

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
  const [toggleFilter, setToggleFilter] = useState(false);

  useEffect(() => {
    if (!_.isEqual(form, tmpForm)) setTmpForm({ ...form });
    onGetData();
  }, [form]);

  /* Handle on Change Value */
  const onHandleChange = (name, value) => {
    if (windowSize[0] < 768) {
      setTmpForm({
        ...tmpForm,
        [name]: {
          value: value,
          statusErr: false,
        },
      });
    } else {
      setForm({
        ...form,
        [name]: {
          value: value,
          statusErr: false,
        },
      });
    }
  };

  const onGetData = () => {
    console.log("Form", form);
    console.log("Temporary Form", tmpForm);
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
      <div className="flex flex-col gap-3 md:gap-4 md:border-y md:border-r border-gray-border basis-full md:basis-4/5 p-2 md:!p-5">
        <div className="flex relative items-center w-full">
          <i className="fa-solid fa-magnifying-glass text-dark-gray-3 absolute left-5 fa-sm"></i>
          <input
            onChange={(e) => setSearch(e.target.value)}
            value={search}
            placeholder={"Nike Jordan"}
            className="flex w-full px-[1.25rem] py-[0.813rem] rounded-xl pl-12 shadow-inputProductShadow text-sm md:text-base"
          />
        </div>
        <div className="flex text-soft-gray gap-3 px-1">
          <div className="grow text-xs md:text-base">
            <span className="font-light">Search Result For</span>{" "}
            <b>"Nike Jordan"</b>
          </div>
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
        </div>
        <CardCatalog data={sample} />
      </div>

      {/* Handle Filter on Mobile Size  */}
      <div
        className={`${toggleFilter ? "right-0" : "-right-full"} ${
          windowSize[0] > 768 && "hidden"
        } inset-y-0 z-[9999] bg-white fixed flex flex-col h-full w-full transition-all p-4`}
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
            <Checkbox onChange={onHandleChange} name={"kid"} label={"Kids'"} />
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
          <div className="FilterStyle px-0">
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
          <div className="FilterStyle px-0">
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
        <div className="bg-white border-t bottom-0 inset-x-0 w-full p-3">
          <Button
            value={"Apply"}
            onClick={onApplyFilter}
            className="!bg-soft-green p-2 mt-2"
          />
        </div>

        {/* <div className="flex justify-between items-center">
            <span className="font-bold">Filter</span>
            <i
              className="fa-solid fa-circle-xmark fa-lg"
              onClick={() => setToggleFilter(false)}
            ></i>
          </div>

          <div className="grow overflow-y-scroll">
            <div className="FilterStyle px-0">
              <span className="font-bold">Gender</span>
              <Checkbox
                onChange={onHandleChange}
                name={"women"}
                label={"Women's"}
              />
              <Checkbox
                onChange={onHandleChange}
                name={"men"}
                label={"Men's"}
              />
              <Checkbox
                onChange={onHandleChange}
                name={"kid"}
                label={"Kids'"}
              />
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
          <div className="border-t">
            <Button value={"Apply"} onClick={onApplyFilter} className="!bg-soft-green p-2 mt-2" />
          </div> */}
      </div>
    </div>
  );
}

export default Products;
