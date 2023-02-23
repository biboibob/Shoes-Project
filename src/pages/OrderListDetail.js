import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { PageRoutePath } from "../utils/config";
import * as Constants from "../utils/Constant";
import moment from "moment";

/* Skeleton Library */
import Skeleton from "react-loading-skeleton";

/* End Point */
import API from "../helper/api";

/* Redux Action */
import { skeletonToggle } from "../service/redux/slice/ui";

/* Component */
import { Card } from "../components/custom/index";
import { FullPanel } from "../components";

//style
import "../styles/components/stepProgressBar.scss";

/* Service */
import { Toast, formatDate } from "../utils";

function OrderListDetail() {
  const api = new API();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [orderProgressToggle, setOrderProgressDetail] = useState(false);
  const [orderData, setOrderData] = useState({});
  const [userData, setUserData] = useState({});

  //Redux State
  const uiSelector = useSelector((state) => state.userInterface);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    const getIdTransaction = window.location.href;

    const requestBody = {
      id_transaction: Number(getIdTransaction.split("/").pop()),
    };

    dispatch(skeletonToggle(true));

    api
      .getOrderDetail(requestBody)
      .then((res) => {
        const data = res.data;
        if (
          data.status === 200 &&
          data.data.status &&
          data.data.transactionDetail !== null
        ) {
          const transactionDetail = data.data.transactionDetail;

          setOrderData({
            ...transactionDetail,
            totalItems:
              transactionDetail?.transaction_detail_parent?.length === 1
                ? transactionDetail.transaction_detail_parent[0].quantity
                : transactionDetail.transaction_detail_parent?.reduce(
                    (a, b) => a + b.quantity,
                    0
                  ),
            totalItemsPrice:
              transactionDetail?.transaction_detail_parent?.length === 1
                ? Number(
                    (
                      transactionDetail.transaction_detail_parent[0].quantity *
                      transactionDetail.transaction_detail_parent[0].price
                    ).toFixed(2)
                  )
                : Number(
                    transactionDetail.transaction_detail_parent
                      ?.reduce((a, b) => a + b.price * b.quantity, 0)
                      .toFixed(2)
                  ),
          });
          setUserData(data.data.userInfo);
        } else {
          navigate(PageRoutePath.ORDER_LIST);
          Toast.fire({
            icon: "warning",
            title: Constants.MESSAGE.ORDER_NOT_FOUND,
          });
        }
      })
      .finally(() => {
        dispatch(skeletonToggle(false));
      });
  };

  const orderProgress = () => {
    return (
      <div className={"wrapper"}>
        <ul className={"StepProgress"}>
          {orderData.transaction_progress_parent?.length > 0 &&
            orderData.transaction_progress_parent
              .sort((a, b) => moment(b.date).unix() - moment(a.date).unix())
              .map((val, idx) => (
                <li
                  className={`StepProgressItem ${
                    idx === 0 ? "current" : "is-done"
                  }`}
                  key={idx}
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex justify-between items-center">
                      <span className="font-bold">{val.progress_name}</span>
                      <span className="!text-xs">{formatDate(val.date)}</span>
                    </div>
                    <p className="text-gray-400">{val.progress_description}</p>
                  </div>
                </li>
              ))}
        </ul>
      </div>
    );
  };

  const onToggleOrderProgress = () => {
    setOrderProgressDetail(orderProgressToggle ? false : true);
  };

  return (
    <>
      <FullPanel
        onToggle={orderProgressToggle}
        onHide={() => onToggleOrderProgress()}
        contentClassName={"h-full gap-3"}
        title="Order Progress"
      >
        <div className="flex flex-col gap-4">
          <span className="font-bold text-lg">Order Progress</span>
          {orderProgress()}
        </div>
      </FullPanel>

      {!uiSelector.skeleton ? (
        <div className="flex flex-col container gap-4 py-3">
          <div className="flex flex-col gap-1 md:gap-2">
            <span className="font-black text-lg md:text-2xl">
              Transaction-ID : #{orderData.id_transaction}
            </span>
            <span className="text-base md:text-lg">
              {formatDate(orderData.purchased_date)}
            </span>
          </div>
          <div className="flex gap-3">
            <div className="basis-full md:basis-2/3 flex flex-col gap-4">
              {/* Ordered Progress Mobile Screen */}
              <div className="flex flex-col md:hidden">
                <div className="flex justify-between pt-2 items-center">
                  <span className="text-base md:text-lg font-bold">
                    Order Progress
                  </span>
                  <span
                    className="text-sm md:text-base flex items-center gap-2 cursor-pointer"
                    onClick={onToggleOrderProgress}
                  >
                    Lihat Detail
                    <i className="fa-solid fa-chevron-down fa-sm"></i>
                  </span>
                </div>
              </div>

              {/* Ordered Items */}
              <div className="flex flex-col gap-2">
                <span className="text-base md:text-lg font-bold">
                  Ordered Items
                </span>
                {orderData.transaction_detail_parent?.length > 0 &&
                  orderData.transaction_detail_parent.map((val, idx) => (
                    <Card
                      className="flex flex-col px-3 md:px-4 py-3 gap-3"
                      key={idx}
                    >
                      <div className="flex gap-3">
                        <img
                          className="h-auto w-14 md:w-20 object-contain mb-auto"
                          src={val.image}
                        />
                        <div className="flex flex-col gap-4 grow">
                          <div className="flex flex-col">
                            <span className="text-sm md:text-base font-bold">
                              {val.name}
                            </span>
                            <span className="text-xs md:text-sm">
                              {val.category}'s Shoe
                            </span>
                          </div>

                          <span className="text-xs md:text-sm flex gap-1 items-center">
                            {val.size} EU -{" "}
                            <span
                              className="flex h-3 w-3 md:h-4 md:w-4 rounded-full"
                              style={{
                                backgroundColor: val.color.toLowerCase(),
                              }}
                            ></span>
                          </span>
                        </div>
                        <div className="flex flex-col items-end gap-1 md:gap-2">
                          <span className="text-sm md:text-base font-black text-right text-soft-black">
                            ${val.price}
                          </span>
                          <span className="text-[0.65rem] md:text-xs">
                            Qty : {val.quantity}
                          </span>
                        </div>
                      </div>
                    </Card>
                  ))}
              </div>

              {/* Delivery Detail */}
              <div className="flex flex-col gap-2">
                <span className="text-base md:text-lg font-bold">
                  Delivery Detail
                </span>
                <Card className="flex flex-col px-3 md:px-4 py-3 gap-2 md:gap-3 text-sm md:text-base">
                  <div className="flex gap-2">
                    <span className="basis-3/12">Courier</span>
                    <span className="shirnk">:</span>
                    <span className="basis-9/12 font-bold">
                      {orderData.courier}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="basis-3/12">Receipt Number</span>
                    <span className="shirnk">:</span>
                    <span className="basis-9/12 font-bold">
                      {orderData.receipt_number !== null
                        ? orderData.receipt_number
                        : "-"}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <span className="basis-3/12">Address</span>
                    <span className="shirnk">:</span>
                    <span className="basis-9/12 flex flex-col gap-2 md:gap-1">
                      <span className="font-bold">{userData?.receiver}</span>
                      <span className="text-xs md:text-sm">
                        {userData?.detail_address}, {userData.city_name},{" "}
                        {userData.province}
                      </span>
                      <span className="italic text-xs md:text-sm">
                        {userData?.phone}
                      </span>

                      {userData.address_note !== "" && (
                        <div className="flex flex-col mt-3 gap-2">
                          <span className="text-xs md:text-sm">
                            Extra Note :
                          </span>
                          <span className="flex p-2 md:p-3 text-xs md:text-sm bg-blue-pallete text-white rounded-lg border-2 border-dark-blue-pallete">
                            {userData.address_note}
                          </span>
                        </div>
                      )}
                    </span>
                  </div>
                </Card>
              </div>

              {/* Payment Detail */}
              <div className="flex flex-col gap-2">
                <span className="text-base md:text-lg font-bold">
                  Payment Detail
                </span>
                <Card className="flex flex-col px-3 md:px-4 py-3 gap-2 text-sm md:text-base">
                  <div className="flex justify-between">
                    <span>Payment Method</span>
                    <span className="font-bold">
                      {orderData.payment_method}
                    </span>
                  </div>
                  <div className="border-2 border-dotted my-2" />
                  <div className="flex justify-between">
                    <span>Total Price ({orderData.totalItems} Items )</span>
                    <span className="font-bold">
                      ${orderData.totalItemsPrice}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Total Discoint</span>
                    <span className="font-bold">
                      ${orderData.total_discount}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping Cost</span>
                    <span className="font-bold">
                      ${orderData.shipping_cost}
                    </span>
                  </div>
                  <div className="border-2 border-dotted my-2" />
                  <div className="flex justify-between">
                    <span>Total Price</span>
                    <span className="font-bold">${orderData.total_price}</span>
                  </div>
                </Card>
              </div>
            </div>

            {/* Order Progress Large Screen Section */}
            <div className="hidden md:flex md:basis-1/3">
              <div className="flex flex-col gap-2">
                <span className="text-base md:text-lg font-bold">
                  Order Progress
                </span>
                <Card className="flex flex-col px-3 md:px-4 py-3 gap-2">
                  {orderProgress()}
                </Card>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <Skeleton
          containerClassName="flex flex-col container gap-4 py-3"
          wrapper={() => (
            <div className="flex flex-col gap-2 animate-pulse">
              <div className="flex h-10 w-64 bg-dark-gray rounded-md" />
              <div className="flex h-5 w-52 bg-dark-gray rounded-md" />

              <div className="flex gap-3 mt-4">
                <div className="basis-full md:basis-2/3 flex flex-col gap-3">
                  <div className="flex flex-col gap-2">
                    <div className="h-5 w-24 bg-dark-gray rounded-md"></div>
                    <div className="h-52 w-auto bg-dark-gray rounded-md"></div>
                  </div>
                  <div className="flex flex-col gap-2">
                    <div className="h-5 w-24 bg-dark-gray rounded-md"></div>
                    <div className="h-52 w-auto bg-dark-gray rounded-md"></div>
                  </div>
                </div>
                <div className="hidden md:flex flex-col md:basis-1/3">
                  <div className="flex flex-col gap-2">
                    <div className="h-5 w-24 bg-dark-gray rounded-md"></div>
                    <div className="h-52 w-auto bg-dark-gray rounded-md"></div>
                  </div>
                </div>
              </div>
            </div>
          )}
        />
      )}
    </>
  );
}

export default OrderListDetail;
