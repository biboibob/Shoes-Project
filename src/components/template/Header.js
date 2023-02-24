import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../../utils/config";
import TokenService from "../../utils/Token/tokenService";
import Swal from "sweetalert2";

//Redux
import { sideBarToggle } from "../../service/redux/slice/ui";
import { resetUI } from "../../service/redux/slice/ui";
import { resetCart } from "../../service/redux/slice/cart";
import { resetUser } from "../../service/redux/slice/user";

//Hook
import { useWindowScroll } from "../../hook/index";

//component
import { Button } from "../custom";

//asset
import Logo from "../../assets/PNG/LogoBlack.png";

//Service
import { Capitalize } from "../../utils";

function Header() {
  /* State */
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userMenu, setUserMenu] = useState(false);

  const [totalCart, setTotalCart] = useState({
    /* Current Cart Total */
    value: null,

    /* Status intiate for Ping Animation */
    status: false,
  });


  /* Hook */
  const scrollWindow = useWindowScroll();

  /* Redux */
  const sideBar = useSelector((selector) => selector.userInterface.isSideBar);
  const cartSelector = useSelector((val) => val.cart.data);
  const loginData = useSelector((state) => state.userInfo.loginData);

  // tokenService
  const tokenService = TokenService.getService();

  useEffect(() => {
    let curr = 0;

    cartSelector.forEach((val) => {
      curr += val.addToCart;
    });

    setTotalCart(() => ({
      status:
        totalCart?.value === null || curr === totalCart?.value ? false : true,
      value: curr,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalCart.value]);

  const handleLogout = (e) => {
    e.stopPropagation();
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
    tokenService.clearToken();
    dispatch(resetUI());
    dispatch(resetCart());
    dispatch(resetUser());
    navigate(PageRoutePath.LOGIN);
  };

  const handleNavigate = (Route, state) => {
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

  const handleToggleUserMenu = (e) => {
    e.stopPropagation();
    setUserMenu(userMenu ? false : true);
  };

  return (
    <>
      <div
        className={`flex items-center ${
          scrollWindow !== 0 && "shadow-headerShadow"
        } transition-all duration-700 bg-soft-gray-2 px-4 py-3 sticky top-0 z-[99]`}
      >
        {/* Large Screen Handle */}
        <div className="container hidden ml-auto items-center justify-between lg:flex">
          <img
            src={Logo}
            width={60}
            alt="home"
            onClick={() => handleNavigate(PageRoutePath.HOME)}
            className={"cursor-pointer"}
          />
          <div className="flex gap-4">
            <span
              className="font-medium cursor-pointer"
              onClick={() =>
                handleNavigate(PageRoutePath.PRODUCTS, { category: "men" })
              }
            >
              Men
            </span>
            <span
              className="font-medium cursor-pointer"
              onClick={() =>
                handleNavigate(PageRoutePath.PRODUCTS, { category: "women" })
              }
            >
              Women
            </span>
            <span
              className="font-medium cursor-pointer"
              onClick={() =>
                handleNavigate(PageRoutePath.PRODUCTS, { category: "kids" })
              }
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

            <div
              className="flex flex-col justify-center rounded-[60px] px-[.8em] py-[1.2em] relative shadow-headerIcon cursor-pointer"
              onClick={handleToggleUserMenu}
            >
              <i className="fa-solid fa-user text-soft-gray fa-sm"></i>

              {/* Handle Menu User on Large Screen */}
              <div
                className={`${
                  userMenu ? "top-16" : "-top-[50rem]"
                } transition-all duration-500 overflow-x-hidden box-border rounded-lg hidden md:block right-0 gap-2 w-[15rem] absolute bg-white shadow-xl`}
              >
                <div className="flex flex-col gap-3 p-3">
                  <div className="flex flex-col items-center">
                    <i className="fa-solid fa-circle-user text-5xl"></i>
                    <span className="text-lg font-bold">
                      {Capitalize(loginData?.username)}
                    </span>
                    <span className="text-sm">{loginData?.email}</span>
                  </div>

                  {/* Menu Option */}
                  <div className="flex flex-col">
                    <span className="px-1">Menu</span>
                    <hr className="mb-3 mt-1 ml-[-1rem] mr-[-1rem]"></hr>
                    <div className="flex flex-col gap-2.5 px-1">
                      <div className="flex items-center text-gray-400 gap-2 hover:text-soft-black">
                        <i className="basis-1/6 fa-regular fa-user"></i>
                        <span className="basis-5/6">Profile</span>
                      </div>
                      <div className="flex items-center text-gray-400 gap-2 hover:text-soft-black" onClick={() => handleNavigate(PageRoutePath.ORDER_LIST)}>
                        <i className="basis-1/6 fa-solid fa-bag-shopping"></i>
                        <span className="basis-5/6">Order</span>
                      </div>
                      <div className="flex items-center text-gray-400 justify-between gap-2 hover:text-soft-black" onClick={() => handleNavigate(PageRoutePath.CART)}>
                        <div className="flex basis-4/5 items-center">
                          <i className="basis-1/4 fa-solid fa-cart-shopping"></i>
                          <span className="basis-3/4">Cart</span>
                        </div>

                        {totalCart.value > 0 && (
                          <span className="flex relative h-6 w-6">
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
                    </div>
                  </div>
                  <hr className="my-1 ml-[-1rem] mr-[-1rem]"></hr>
                  <Button
                    value={
                      <div className="flex gap-2  justify-center items-center">
                        <i className="fa-solid fa-power-off"></i>
                        <span>Logout</span>
                      </div>
                    }
                    onClick={handleLogout}
                    className={"bg-red-500 p-1 py-2 !text-base"}
                  />
                </div>
              </div>
              {/* End Handle User Menu */}
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
            alt="home"
            onClick={() => handleNavigate(PageRoutePath.HOME)}
            className={"cursor-pointer"}
          />
          <i
            className="fa-solid fa-cart-shopping relative"
            onClick={() => handleNavigate(PageRoutePath.CART)}
          >
            {totalCart.value > 0 && (
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
            )}
          </i>
        </div>
      </div>
    </>
  );
}

export default Header;
