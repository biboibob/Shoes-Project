import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageRoutePath } from "../utils/config";

/* Redux */
import { useSelector, useDispatch } from "react-redux";

/* redux Action */
import { onAllowSummaryReducer } from "../service/redux/slice/cart";

/* Component */
import { Card, Button, Checkbox } from "../components/custom/index";

/* Asset */
import { JNE, Paxel } from "../assets/PNG/Courier/Index";

function Summary() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartSelector = useSelector((state) => state.cart);

  let location = useLocation();

  /*Dummy Cour Section*/
  const [courOpt, setCourOpt] = useState([
    {
      name: "JNE",
      logo: JNE,
      type: [
        {
          name: "instant",
          ETA: "2 - 3 Hours",
        },
        {
          name: "same day",
          ETA: "6 Hours",
        },
      ],
    },
    {
      name: "Paxel",
      logo: Paxel,
      type: [
        {
          name: "instant",
          ETA: "2 - 3 Hours",
        },
        {
          name: "same day",
          ETA: "6 Hours",
        },
      ],
    },
  ]);

  //State Handle Total Price
  const [totalPrice, setTotalPrice] = useState({
    totalPrice: 0,
    quantity: 0,
    discount: 0,
  });

  const [selectedCour, setSelectedCour] = useState({
    name: "",
    price: "",
    type: {
      name: "",
      ETA: "",
    },
  });

  useEffect(() => {
    if (!cartSelector.onAllowSummary) {
      //   handleNavigate(PageRoutePath.CART);
    } else {
      setTotalPrice(location.state);
    }
    return () => {
      dispatch(onAllowSummaryReducer(false));
    };
  }, []);

  const handleNavigate = (Route) => {
    navigate(`${Route}`);
  };

  const onHandleChangeCour = (value) => {
    setSelectedCour({
      name: value.name,
      type: {
        name: value.type[0].name,
        ETA: value.type[0].ETA,
      },
    });
  };

  return (
    <div className="flex container min-h-full mt-3 gap-3">
      <div className="basis-full md:basis-2/3 flex flex-col gap-4">
        <span className="text-2xl font-bold">Order Overview</span>

        {/* Summary Order */}
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold">Summary Order</span>
          <span className="text-gray-400">
            Please Cross-check your order and select the shipping before doing
            payment for best exprience.
          </span>
          <Card className="flex flex-col px-4 py-3 gap-3">
            <div className="flex gap-3">
              <img className="h-auto w-24" />
              <div className="flex flex-col grow">
                <span>NIKE Metcon'8 By You</span>
                <span className="text-gray-400 text-sm">Men's</span>
                <span className="mt-4 text-lg font-black">$160</span>
              </div>
              <span>41 EU - Black</span>
            </div>
            <div className="flex gap-3">
              <img className="h-auto w-24" />
              <div className="flex flex-col grow">
                <span>NIKE Metcon'8 By You</span>
                <span className="text-gray-400 text-sm">Men's</span>
                <span className="mt-4 text-lg font-black">$160</span>
              </div>
              <span>41 EU - Black</span>
            </div>
          </Card>
        </div>

        {/* Address Section */}
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold">Address Detail</span>
          <Card className="flex flex-col px-4 py-3 gap-3">
            <span className="font-bold">Bobby's Home</span>
            <div className="flex flex-col gap-2">
              <span className="text-sm text-gray-400">
                Komplek Pegangsaan No 11 Blok B3, Ujung Raya, Jakarta Selatan,
                13867
              </span>
              <span className="italic text-sm text-gray-400">
                +62 8219 9866 203
              </span>
            </div>
            <div className="flex flex-col gap-2">
              <span className="text-sm">Detail :</span>
              <span className="flex p-3 text-sm bg-blue-pallete text-white rounded-lg border-2 border-dark-blue-pallete">
                Pagar warna hijau, jika sudah datang silahkan tekan bel rumah
                ya, terima kasih.
              </span>
            </div>
          </Card>
          <Button
            value={"Change Address"}
            className={"w-fit ml-auto !bg-soft-green !text-xs py-2 px-3"}
          />
        </div>

        {/* Available Shipping */}
        <div className="flex flex-col gap-2">
          <span className="text-lg font-bold">
            Available Shipping - Domestic
          </span>

          {courOpt.map((val, idx) => (
            <Card
              className="flex px-4 py-3 gap-4 items-center"
              onClick={() => onHandleChangeCour(val)}
            >
              <div className="flex basis-1/6">
                <img src={val.logo} className="w-auto h-8" />
              </div>
              <div className="flex flex-col grow gap-2">
                <span className="text-lg font-bold">{val.name}</span>
                {val.name === selectedCour.name && (
                  <div className="flex flex-col gap-1">
                    <span className="text-gray-400 text-sm">
                      Choose Delivery Type :
                    </span>
                    <div className="flex bg-soft-yellow border-2 border-yellow rounded-lg px-3 py-2 justify-between items-center gap-5 w-fit">
                      <div className="flex flex-col text-xs gap-1">
                        <span>Instant</span>
                        <span className="font-light">
                          Estimation Arrival : 2 - 3 Hours
                        </span>
                      </div>
                      <span className="font-bold text-xs">Change</span>
                    </div>
                  </div>
                )}
              </div>
              <Checkbox
                value={val.name === selectedCour.name}
                swapPlacement={true}
                label={"$15.00"}
                type="radio"
              />
            </Card>
          ))}
        </div>
      </div>

      {/* Handle Summary in Web View */}
      <div className="flex-col hidden md:flex basis-1/3 px-3 gap-3 realtive">
        <Card className="flex flex-col shadow-CartShadow gap-1 py-3 px-4 sticky top-24">
          <span className="font-black text-xl mb-2">Summary</span>
          <div className="flex justify-between">
            <span>Total Price ({totalPrice.quantity} Items)</span>
            <span>${totalPrice.totalPrice}</span>
          </div>
          <div className="flex justify-between">
            <span>Total Discount</span>
            <span>-</span>
          </div>
          <hr className="mt-4"></hr>
          <div className="flex justify-between text-base my-2 !font-bold">
            <span className="font-bold">Total Price</span>
            <span className="font-bold">${totalPrice.totalPrice}</span>
          </div>
          <Button value={"Buy"} className="!bg-soft-green p-2 mt-2" />
        </Card>
      </div>
    </div>
  );
}

export default Summary;
