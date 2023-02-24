import React, { useEffect, useState } from "react";
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
import Logo from "../../assets/PNG/LogoBlack.png";

//Redux
import { sideBarToggle } from "../../service/redux/slice/ui";

//Component
import { FullPanel } from "../";

function SideBar() {
  const [totalCart, setTotalCart] = useState({
    /* Current Cart Total */
    value: null,

    /* Status intiate for Ping Animation */
    status: false,
  });

  /* Hook */
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // tokenService
  const tokenService = TokenService.getService();

  //Redux
  const sideBar = useSelector((selector) => selector.userInterface.isSideBar);
  const cartSelector = useSelector((val) => val.cart.data);

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
    dispatch(resetUI());
    dispatch(resetCart());
    dispatch(resetUser());
    tokenService.clearToken();
    navigate(PageRoutePath.LOGIN);
  };

  const onHideSideBar = () => {
    dispatch(sideBarToggle(sideBar ? false : true));
  };

  return (
    <FullPanel
      onToggle={sideBar}
      onHide={() => onHideSideBar()}
      contentClassName={"flex flex-col grow gap-5"}
    >
      <img src={Logo} alt="logo-img" className="h-auto w-16 object-contain" />

      <div>
        <span className="font-black text-lg">Category</span>
        <div className="flex flex-col text-lg gap-2 text-soft-gray">
          <span
            className="border-b border-dark-gray-2 py-3 text-base"
            onClick={() =>
              handleNavigate(PageRoutePath.PRODUCTS, { category: "men" })
            }
          >
            Men
          </span>
          <span
            className="border-b border-dark-gray-2 py-3 text-base"
            onClick={() =>
              handleNavigate(PageRoutePath.PRODUCTS, { category: "women" })
            }
          >
            Women
          </span>
          <span
            className="border-b border-dark-gray-2 py-3 text-base"
            onClick={() =>
              handleNavigate(PageRoutePath.PRODUCTS, { category: "kids" })
            }
          >
            Kids
          </span>
        </div>
      </div>

      <div>
        <span className="font-black text-lg">Menu</span>
        <div className="flex flex-col text-lg gap-2 text-soft-gray">
          <div className="flex items-center border-b border-dark-gray-2 py-3 text-base">
            <i className="basis-2/12 fa-solid fa-user"></i>
            <span className="basis-10/12">Profile</span>
          </div>
          <div
            className="flex items-center border-b border-dark-gray-2 py-3 text-base"
            onClick={() => handleNavigate(PageRoutePath.ORDER_LIST)}
          >
            <i className="basis-2/12 fa-solid fa-bag-shopping"></i>
            <span className="basis-10/12">Order</span>
          </div>
          <div
            className="flex items-center border-b border-dark-gray-2 py-3 text-base justify-between"
            onClick={() => handleNavigate(PageRoutePath.CART)}
          >
            <div className="flex grow items-center">
              <i className="basis-2/12 fa-solid fa-cart-shopping"></i>
              <span className="basis-10/12 ml-1.5">Cart</span>
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

      <div
        className="flex gap-2 text-base font-bold items-center justify-end mt-auto"
        onClick={handleLogout}
      >
        <span>Logout</span>
        <i className="fa-solid fa-right-from-bracket"></i>
      </div>
    </FullPanel>
  );
}

export default SideBar;
