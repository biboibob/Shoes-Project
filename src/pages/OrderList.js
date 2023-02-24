import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PageRoutePath } from "../utils/config";
import moment from "moment";

/* Skeleton Library */
import Skeleton from "react-loading-skeleton";

/* End Point */
import API from "../helper/api";

/* Redux Action */
import { skeletonToggle } from "../service/redux/slice/ui";

//Service
import { formatDate } from "../utils";

//Asset
import Logo from "../assets/PNG/LogoBlack.png";

const OrderList = () => {
  const api = new API();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  //State
  const [selectedTab, setSelectedTab] = useState("On-Progress");
  const [listOrder, setListOrder] = useState([]);

  //Redux State
  const uiSelector = useSelector((state) => state.userInterface);

  useEffect(() => {
    getList();
  }, [selectedTab]);

  const getList = () => {
    const requestBody = {
      status: selectedTab,
    };

    dispatch(skeletonToggle(true));
    api
      .getOrderList(requestBody)
      .then((res) => {
        const data = res.data;
        if (data.status === 200) {
          setListOrder(data.data.transactionList);
        }
      })
      .finally(() => {
        dispatch(skeletonToggle(false));
      });
  };

  const onNavigate = (id_transaction) => {
    navigate(`${PageRoutePath.ORDER_LIST}/${id_transaction}`);
  };

  return (
    <div className="flex flex-col container grow gap-3 py-3">
      <div className="flex gap-2">
        <div
          className={`py-1 px-2 md:py-2 md:px-3 text-sm md:text-base border-2 border-soft-black text-soft-black font-bold rounded-lg ${
            selectedTab === "On-Progress" && "bg-soft-black text-white"
          }`}
          onClick={() => setSelectedTab("On-Progress")}
        >
          On-Progress
        </div>
        <div
          className={`py-1 px-2 md:py-2 md:px-3 text-sm md:text-base border-2 border-soft-black text-soft-black font-bold rounded-lg ${
            selectedTab === "On-Delivery" && "bg-soft-black text-white"
          }`}
          onClick={() => setSelectedTab("On-Delivery")}
        >
          On-Delivery
        </div>
        <div
          className={`py-1 px-2 md:py-2 md:px-3 text-sm md:text-base border-2 border-soft-black text-soft-black font-bold rounded-lg ${
            selectedTab === "Complete" && "bg-soft-black text-white"
          }`}
          onClick={() => setSelectedTab("Complete")}
        >
          Complete
        </div>
      </div>

      {!uiSelector.skeleton ? (
        listOrder.length > 0 ? (
          listOrder
            .sort(
              (a, b) =>
                moment(b.purchased_date).unix() -
                moment(a.purchased_date).unix()
            )
            .map((val, idx) => (
              <div
                className="flex flex-col md:flex-row justify-between bg-white p-3 rounded-lg gap-3 md:gap-0 shadow-sm cursor-pointer"
                key={idx}
                onClick={() => onNavigate(val.id_transaction)}
              >
                <div className="flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <span className="text-sm md:text-base font-extrabold">
                      Transaction ID : #{val.id_transaction}
                    </span>
                    <span className="bg-green-pallete text-white rounded px-2 py-1 text-xs md:text-sm block md:hidden">
                      {val.courier.toUpperCase()}
                    </span>
                  </div>
                  <div className="flex gap-3">
                    <img
                      className="h-auto w-12 md:w-16 object-contain mb-auto mt-2"
                      src={val.transaction_detail_parent[0].image}
                    />
                    <div className="flex flex-col gap-3 text-soft-black">
                      <div className="flex flex-col">
                        <span className="text-sm md:text-base font-semibold">
                          {val.transaction_detail_parent[0].name}
                        </span>
                        <span className="text-xs md:text-sm flex gap-1 items-center">
                          {val.transaction_detail_parent[0].size} EU -{" "}
                          <span
                            className="flex h-3 w-3 md:h-4 md:w-4 rounded-full"
                            style={{
                              backgroundColor:
                                val.transaction_detail_parent[0].color.toLowerCase(),
                            }}
                          ></span>
                        </span>
                      </div>
                      <span className="text-xs px-2 py-1 bg-dark-gray rounded w-fit">
                        Qty : {val.transaction_detail_parent[0].quantity}
                      </span>
                    </div>
                  </div>
                  {val.transaction_detail_parent.length > 1 && (
                    <span className="text-xs md:text-sm text-dark-gray-3">
                      + {val.transaction_detail_parent.length - 1} Other
                      Products
                    </span>
                  )}
                </div>
                <div className="flex flex-row md:!flex-col justify-between items-center md:items-end">
                  <div className="flex justify-end gap-2 items-center order-2 md:order-1">
                    <span className="bg-green-pallete text-white rounded px-2 py-1 text-xs md:text-sm hidden md:block">
                      {val.courier.toUpperCase()}
                    </span>
                    <span className="font-black text-sm md:text-base">
                      ${val.total_price}
                    </span>
                  </div>
                  <span className="text-xs md:text-sm text-right order-1 md:order-2">
                    {formatDate(val.purchased_date)}
                  </span>
                </div>
              </div>
            ))
        ) : (
          <div className="flex flex-col grow justify-center items-center">
            <img src={Logo} className="w-auto animate-bounce h-14 mb-3" />
            <span className="text-lg md:text-xl font-bold tracking-wide">
              This Order Empty
            </span>
           
          </div>
        )
      ) : (
        <Skeleton
          wrapper={() => (
            <div className="flex flex-col gap-2 animate-pulse">
              <div className="flex h-32 w-auto bg-dark-gray rounded-md" />
              <div className="flex h-32 w-auto bg-dark-gray rounded-md" />
              <div className="flex h-32 w-auto bg-dark-gray rounded-md" />
            </div>
          )}
        />
      )}
    </div>
  );
};

export default OrderList;
