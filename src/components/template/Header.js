import React, { useState, useEffect } from "react";
import { useDispatch, useSelector, useDebounce } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../../utils/config";

import { sideBarToggle } from "../../service/redux/slice/ui";
import { removeUser } from "../../service/redux/slice/user";

//Hook
import { useWindowScroll, usePrevious } from "../../hook/index";

//component
import Modal from "../custom/Modal";

//asset
import Logo from "../../assets/PNG/Logo.png";

function Header() {
  /* State */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const [totalCart, setTotalCart] = useState({
    /* Current Cart Total */
    value: null,

    /* Status intiate for Ping Animation */
    status: false,
  });

  /* This Ref To Accessing Previous Value */
  const prevTotalCart = usePrevious(totalCart);

  /* Hook */
  const scrollWindow = useWindowScroll();

  /* Redux */
  const sideBar = useSelector((selector) => selector.userInterface.isSideBar);
  const cartSelector = useSelector((val) => val.cart.data);

  useEffect(() => {
    let curr = 0;

    cartSelector.map((val) => {
      curr += val.addToCart;
    });

    setTotalCart((prevValue) => ({
      status:
        totalCart?.value === null || curr === totalCart?.value ? false : true,
      value: curr,
    }));
  }, [cartSelector]);

  useEffect(() => {
    let timer = setTimeout(() => {
      setTotalCart((prevValue) => ({
        ...prevValue,
        status: false,
      }));
    }, 2700);

    return () => {
      clearTimeout(timer);
    };
  }, [totalCart.value]);

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    dispatch(removeUser());
    setShowModal(false);
    navigate(PageRoutePath.LOGIN);
  };

  const handleNavigate = (Route) => {
    navigate(Route);
  };
  return (
    <>
      <Modal
        modalHeader={"Logout Modal"}
        modalTitle={"Are You Sure Want To Logout?"}
        modalDesc={
          "Your data from browser will be erased and you'll redirect to login page"
        }
        showStatus={showModal}
        onClick={() => handleCloseModal()}
      />

      <div
        className={`flex items-center ${
          scrollWindow !== 0 && "shadow-headerShadow"
        } transition-all duration-700 bg-soft-gray-2 px-4 py-3 sticky top-0 z-[9999]`}
      >
        {/* Large Screen Handle */}
        <div className="container hidden ml-auto items-center justify-between lg:flex">
          <img
            src={Logo}
            width={60}
            onClick={() => handleNavigate(PageRoutePath.HOME)}
            className={"cursor-pointer"}
          />
          <div className="flex gap-4">
            <span
              className="font-medium cursor-pointer"
              onClick={() => handleNavigate(PageRoutePath.PRODUCTS)}
            >
              Men
            </span>
            <span
              className="font-medium cursor-pointer"
              onClick={() => handleNavigate(PageRoutePath.PRODUCTS)}
            >
              Woman
            </span>
            <span
              className="font-medium cursor-pointer"
              onClick={() => handleNavigate(PageRoutePath.PRODUCTS)}
            >
              Kids
            </span>
          </div>
          <div className="flex relative gap-4">
            <div
              className="flex flex-col relative justify-center rounded-[60px] px-[.8em] py-[1.2em] shadow-headerIcon cursor-pointer"
              onClick={() => handleNavigate(PageRoutePath.CART)}
            >
              <i className="fa-solid fa-cart-shopping text-soft-gray fa-sm"></i>
              {totalCart.value > 0 && (
                <span className="flex absolute h-6 w-6 top-[-.2rem] right-[-.5rem]">
                  <span
                    className={`${
                      totalCart.status && "animate-ping"
                    } absolute ease-in inline-flex h-full w-full rounded-full bg-red-pallete opacity-75`}
                  ></span>
                  <span className="relative inline-flex rounded-full h-6 w-6 bg-red-pallete text-white text-xs font-bold items-center justify-center">
                    {totalCart.value}
                  </span>
                </span>
              )}
            </div>
            <div className="flex flex-col justify-center rounded-[60px] px-[.8em] py-[1.2em] shadow-headerIcon">
              <i className="fa-solid fa-heart text-soft-gray fa-sm"></i>
            </div>
            <div className="flex flex-col justify-center rounded-[60px] px-[.8em] py-[1.2em] shadow-headerIcon">
              <i className="fa-solid fa-user text-soft-gray fa-sm"></i>
            </div>
          </div>
        </div>
        {/* End Large Scrren Handle */}

        {/* Small Screen Handle */}
        <div className="flex w-full justify-between lg:hidden">
          <i
            className="fa-solid fa-bars"
            onClick={() => dispatch(sideBarToggle(sideBar ? false : true))}
          ></i>
          <img
            src={Logo}
            width={50}
            onClick={() => handleNavigate(PageRoutePath.HOME)}
            className={"cursor-pointer"}
          />
          <i
            className="fa-solid fa-cart-shopping relative"
            onClick={() => handleNavigate(PageRoutePath.CART)}
          >
            <span className="flex absolute h-4 w-4 top-[-.7rem] right-[-.6rem]">
              <span
                className={`${
                  totalCart.status && "animate-ping"
                } absolute ease-in inline-flex h-full w-full rounded-full bg-red-pallete opacity-75`}
              ></span>
              <span className="relative inline-flex rounded-full h-4 w-4 bg-red-pallete text-white text-[.5rem] font-bold items-center justify-center">
                {totalCart.value}
              </span>
            </span>
          </i>
        </div>
      </div>
    </>
  );
}

export default Header;
