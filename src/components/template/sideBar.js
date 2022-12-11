import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";

import { faTimes } from "@fortawesome/free-solid-svg-icons";

import { sideBarToggle } from "../../service/redux/slice/ui";

function SideBar({ className }) {
  const dispatch = useDispatch()
  const sideBar = useSelector((selector) => selector.userInterface.isSideBar);
  

  return (
    <div className={`${className}`}>
      <FontAwesomeIcon
        size="lg"
        className="text-soft-black"
        onClick={() => dispatch(sideBarToggle(sideBar ? false : true))}
        icon={faTimes}
      />
      <span>sideBar</span>
    </div>
  );
}

export default SideBar;
