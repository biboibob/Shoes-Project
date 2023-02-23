import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../../utils/config";
import TokenService from "../../utils/Token/tokenService";
import Swal from "sweetalert2";

//Redux
import { resetUI } from "../../service/redux/slice/ui";
import { resetCart } from "../../service/redux/slice/cart";
import { resetUser } from "../../service/redux/slice/user";

//asset
import Logo from "../../assets/PNG/Logo.png";

//Redux
import { removeUser } from "../../service/redux/slice/user";
import { sideBarToggle } from "../../service/redux/slice/ui";

//Component
import { FullPanel } from "../";

function SideBar({ className }) {
  /* Hook */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // tokenService
  const tokenService = TokenService.getService();

  const sideBar = useSelector((selector) => selector.userInterface.isSideBar);

  const handleNavigate = (Route, state) => {
    dispatch(sideBarToggle(sideBar ? false : true));
    if (state) {
      navigate(Route, {
        state: {
          state,
        },
      });
    } else {
      navigate(Route);
    }
  };

  const handleLogout = () => {
    dispatch(sideBarToggle(false));
    Swal.fire({
      title: "Confirmation",
      text: `Are you sure want to Logout?`,
      icon: "info",
      showCancelButton: true,
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        onLogout();
      }
    });
  };

  const onLogout = () => {
    dispatch(resetUI())
    dispatch(resetCart())
    dispatch(resetUser())
    tokenService.clearToken();
    navigate(PageRoutePath.LOGIN);
  };

  const onHideSideBar = () => {
    dispatch(sideBarToggle(sideBar ? false : true))
  } 

  return (
    <FullPanel
      onToggle={sideBar}
      onHide={() => onHideSideBar()}
      contentClassName={"h-full gap-3"}
    >
      <div className="w-full flex items-center justify-between">
        <span className="font-black text-xl">Menu</span>
      </div>

      <div className="flex flex-col text-lg grow gap-2">
        <span
          className="border-b border-dark-gray-2 py-3"
          onClick={() =>
            handleNavigate(PageRoutePath.PRODUCTS, { category: "men" })
          }
        >
          Men
        </span>
        <span
          className="border-b border-dark-gray-2 py-3"
          onClick={() =>
            handleNavigate(PageRoutePath.PRODUCTS, { category: "women" })
          }
        >
          Women
        </span>
        <span
          className="border-b border-dark-gray-2 py-3"
          onClick={() =>
            handleNavigate(PageRoutePath.PRODUCTS, { category: "kids" })
          }
        >
          Kids
        </span>
      </div>

      <div
        className="flex gap-2 text-base font-bold items-center justify-end"
        onClick={handleLogout}
      >
        <span>Logout</span>
        <i className="fa-solid fa-right-from-bracket"></i>
      </div>
    </FullPanel>
  );
}

export default SideBar;
