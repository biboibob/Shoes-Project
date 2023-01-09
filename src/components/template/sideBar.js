import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../../utils/config";

//asset
import Logo from "../../assets/PNG/Logo.png";

import { sideBarToggle } from "../../service/redux/slice/ui";

function SideBar({ className }) {

  /* Hook */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const sideBar = useSelector((selector) => selector.userInterface.isSideBar);

  const handleNavigate = (Route) => {
    dispatch(sideBarToggle(sideBar ? false : true))
    navigate(Route);
  };

  return (
    <div className={`${className} last:mt-auto`}>
      <div className="w-full flex items-center justify-between">
        <span className="font-black text-xl">Menu</span>
        <i
          className="fa-solid fa-xmark fa-2xl"
          onClick={() => dispatch(sideBarToggle(sideBar ? false : true))}
        ></i>
      </div>

      <div className="flex flex-col text-lg grow gap-2">
        <span className="border-b border-dark-gray-2 py-3" onClick={() => handleNavigate(PageRoutePath.PRODUCTS)}>Men</span>
        <span className="border-b border-dark-gray-2 py-3" onClick={() => handleNavigate(PageRoutePath.PRODUCTS)}>Women</span>
        <span className="border-b border-dark-gray-2 py-3" onClick={() => handleNavigate(PageRoutePath.PRODUCTS)}>Kids</span>
      </div>

      <div className="flex gap-2 text-base font-bold items-center justify-end">
        <span>Logout</span>
        <i className="fa-solid fa-right-from-bracket"></i>
      </div>
    </div>
  );
}

export default SideBar;
