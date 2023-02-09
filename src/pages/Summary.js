import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { PageRoutePath } from "../utils/config";
import * as Constants from "../utils/Constant";
import Swal from "sweetalert2";

/* Redux */
import { useSelector, useDispatch } from "react-redux";

/* redux Action */
import { onAllowSummaryReducer } from "../service/redux/slice/cart";

/* Component */
import {
  Card,
  Button,
  Checkbox,
  ModalComp,
  Input,
  ComboBox,
  TextArea,
} from "../components/custom/index";

/* Asset */
import { JNE, Paxel, POS, TIKI } from "../assets/PNG/Courier/Index";

/* End Point */
import API from "../helper/api";

/* Service */
import { MandatoryCheck, Toast, Capitalize, IDRToUSD } from "../utils";

function Summary() {
  const api = new API();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Redux State
  const cartSelector = useSelector((state) => state.cart);
  const loginInfoSelector = useSelector((state) => state.userInfo.loginData);

  let location = useLocation();

  /*Dummy Cour Section*/
  const [courOpt, setCourOpt] = useState([
    {
      code: "JNE",
      name: "Jalur Nugraha Ekakurir (JNE)",
      logo: JNE,
      costs: [
        {
          description: "JNE City Courier",
          service: "CTC",
          costs: {},
        },
        {
          description: "JNE City Courier",
          service: "CTCYES",
          costs: {},
        },
      ],
      price: "-",
    },
    {
      code: "pos",
      name: "POS Indonesia (POS)",
      logo: Paxel,
      costs: [
        {
          description: "JNE City Courier",
          service: "CTC",
          costs: {},
        },
        {
          description: "JNE City Courier",
          service: "CTCYES",
          costs: {},
        },
      ],
      price: "-",
    },
    {
      code: "tiki",
      name: "Citra Van Titipan Kilat (TIKI)",
      logo: Paxel,
      costs: [
        {
          description: "JNE City Courier",
          service: "CTC",
          costs: {},
        },
        {
          description: "JNE City Courier",
          service: "CTCYES",
          costs: {},
        },
      ],
      price: "-",
    },
  ]);

  //State Handle Total Price
  const [totalPrice, setTotalPrice] = useState({
    totalPrice: 0,
    quantity: 0,
    discount: 0,
  });

  // selected Cour
  const [selectedCour, setSelectedCour] = useState({
    code: "",
    name: "",
    type: {
      name: "",
      description: "",
      ETA: "",
      price: "",
    },
  });

  // selected Address
  const [selectedAddress, setSelectedAddress] = useState({
    receiver: {
      value: "",
      message: "",
      statusErr: false,
    },
    addressDetail: {
      value: "",
      message: "",
      statusErr: false,
    },
    addressNote: {
      value: "",
      message: "",
      statusErr: false,
    },
    phone: {
      value: "",
      message: "",
      statusErr: false,
    },
    city: {
      value: "",
      message: "",
      statusErr: false,
      option: [],
    },
    province: {
      value: "",
      message: "",
      statusErr: false,
      option: [],
    },
    city_name: {
      value: "",
      message: "",
      statusErr: false,
    },
    province_name: {
      value: "",
      message: "",
      statusErr: false,
    },
    postalCode: {
      value: "",
      message: "",
      statusErr: false,
    },
  });

  const [form, setForm] = useState({
    receiver: {
      value: "",
      message: "",
      statusErr: false,
    },
    addressDetail: {
      value: "",
      message: "",
      statusErr: false,
    },
    addressNote: {
      value: "",
      message: "",
      statusErr: false,
    },
    phone: {
      value: "",
      message: "",
      statusErr: false,
    },
    city: {
      value: "",
      message: "",
      statusErr: false,
      option: [],
    },
    province: {
      value: "",
      message: "",
      statusErr: false,
      option: [],
    },
    postalCode: {
      value: "",
      message: "",
      statusErr: false,
      option: [],
    },
  });

  const [formCourDeliveryType, setFormCourDeliveryType] = useState({
    code: "",
    name: "",
    type: {
      name: "",
      description: "",
      ETA: "",
      price: "",
    },
  });

  // Toggle Modal
  const [toggleModalAddress, setToggleModalAddress] = useState(false);
  const [toggleModalShipping, setToggleModalShipping] = useState(false);

  useEffect(() => {
    if (!cartSelector.onAllowSummary) {
      //   handleNavigate(PageRoutePath.CART);
    } else {
      setTotalPrice(location.state);
      getDetailUser();
      getCourierOption();
    }
    return () => {
      dispatch(onAllowSummaryReducer(false));
    };
  }, []);

  //Handle City Option
  useEffect(() => {
    if (form.province.value !== "") {
      api.getCity({ province: `${form.province.value}` }).then((res) => {
        if (res.status === 200 && res.data.status) {
          const data = res.data.data;
          setForm({
            ...form,
            city: {
              ...form.city,
              option: data.city.results.map((res) => {
                return {
                  value: res.city_id,
                  label: res.city_name,
                };
              }),
            },
            postalCode: {
              ...form.postalCode,
              option: data.city.results.map((res) => {
                return {
                  value: res.postal_code,
                  label: res.postal_code,
                };
              }),
            },
          });
        } else {
        }
      });
    }
  }, [form.province.value]);

  const getCourierOption = () => {
    // Get Total Shoes
    let curr = 0;

    cartSelector.data.map((val) => {
      curr += val.addToCart;
    });

    return api
      .getCourierOption({
        // We Assume All Shoes has same Weight as 276g
        totalWeight: 276 * curr,
      })
      .then((res) => {
        const data = res.data;
        if (data.status === 200) {
          setCourOpt(
            data.data.data.map((val) => {
              if (val.code === "jne") {
                val.logo = JNE;
              } else if (val.code === "tiki") {
                val.logo = TIKI;
              } else if (val.code === "pos") {
                val.logo = POS;
              }
              val.price = IDRToUSD(val.costs[0].cost[0].value);
              return val;
            })
          );
        }
      });
  };

  const getDetailUser = () => {
    return api.getDetailUser().then((res) => {
      if (res.status === 200) {
        const dataResponse = res.data.data.dataValues;

        let updatedForm = selectedAddress;

        const updatedValue = {
          receiver: dataResponse.receiver === null ? "" : dataResponse.receiver,
          addressDetail:
            dataResponse.detail_address === null
              ? ""
              : dataResponse.detail_address,
          addressNote:
            dataResponse.address_note === null ? "" : dataResponse.address_note,
          city: dataResponse.city === null ? "" : dataResponse.city,
          city_name:
            dataResponse.city_name === null ? "" : dataResponse.city_name,
          province: dataResponse.province === null ? "" : dataResponse.province,
          province_name:
            dataResponse.province_name === null
              ? ""
              : dataResponse.province_name,
          phone: dataResponse.phone === null ? "" : dataResponse.phone,
          postalCode:
            dataResponse.postal_code === null ? "" : dataResponse.postal_code,
        };

        for (const property in updatedValue) {
          updatedForm = {
            ...updatedForm,
            [property]: {
              ...updatedForm[property],
              value: updatedValue[property],
            },
          };
        }

        setSelectedAddress(updatedForm);
      } else {
      }
    });
  };

  const handleNavigate = (Route) => {
    navigate(`${Route}`);
  };

  const onHandleChangeCour = (value) => {
    setSelectedCour({
      code: value.code,
      name: value.name,
      type: {
        name: value.costs[0].service,
        description: value.costs[0].description,
        ETA: value.costs[0].cost[0].etd,
        price: IDRToUSD(value.costs[0].cost[0].value),
      },
    });
  };

  const onHandleChangeDeliveryType = (val) => {
    setFormCourDeliveryType({
      ...selectedCour,
      type: {
        name: val.service,
        description: val.description,
        ETA: val.cost[0].etd,
        price: IDRToUSD(val.cost[0].value),
      },
    });
  };

  const onHandleSubmitDeliveryType = (e) => {
    e.preventDefault();
    if (formCourDeliveryType.code === "") {
      Toast.fire({
        icon: "warning",
        title: Constants.MESSAGE.SELECT_ONE,
      });
    } else {
      setSelectedCour({
        ...formCourDeliveryType,
        price: formCourDeliveryType.type.price,
      });
      setFormCourDeliveryType({
        code: "",
        name: "",
        type: {
          name: "",
          description: "",
          ETA: "",
          price: "",
        },
      });
      onHandleModalToggleShipping(e);
    }
  };

  const onHandleChange = (event) => {
    const { name, value } = event.target;

    if (name === "province") {
      setForm({
        ...form,
        [name]: {
          ...form[name],
          value: value,
          statusErr: false,
        },
        city: {
          ...form.city,
          value: "",
        },
        postalCode: {
          ...form.postalCode,
          value: "",
        },
      });
    } else if (name === "city") {
      setForm({
        ...form,
        [name]: {
          ...form[name],
          value: value,
          statusErr: false,
        },
        postalCode: {
          ...form.postalCode,
          value: "",
        },
      });
    } else {
      setForm({
        ...form,
        [name]: {
          ...form[name],
          value: value,
          statusErr: false,
        },
      });
    }
  };

  const onHandleModalToggle = () => {
    setToggleModalAddress(toggleModalAddress ? false : true);

    if (
      !toggleModalAddress &&
      form.province.option.length === 0 &&
      selectedAddress.receiver.value.length === 0
    ) {
      api.getProvince().then((res) => {
        const data = res.data.data;
        setForm({
          ...form,
          province: {
            ...form.province,
            option: data.province.results.map((res) => {
              return {
                value: res.province_id,
                label: res.province,
              };
            }),
          },
        });
      });
    } else if (selectedAddress.receiver.value.length > 0) {
      api.getProvince().then((res) => {
        const data = res.data.data;
        setForm({
          receiver: {
            ...form.receiver,
            value: selectedAddress.receiver.value,
          },
          addressDetail: {
            ...form.addressDetail,
            value: selectedAddress.addressDetail.value,
          },
          addressNote: {
            ...form.addressNote,
            value: selectedAddress.addressNote.value,
          },
          phone: {
            ...form.phone,
            value: selectedAddress.phone.value,
          },
          city: {
            ...form.city,
            value: selectedAddress.city.value,
          },
          postalCode: {
            ...form.postalCode,
            value: selectedAddress.postalCode.value,
          },
          province: {
            ...form.province,
            value: selectedAddress.province.value,
            option: data.province.results.map((res) => {
              return {
                value: res.province_id,
                label: res.province,
              };
            }),
          },
        });
      });
    }
  };

  const onHandleModalToggleShipping = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setToggleModalShipping(toggleModalShipping ? false : true);

    if (!toggleModalShipping) {
      setFormCourDeliveryType({
        code: "",
        name: "",
        type: {
          name: "",
          description: "",
          ETA: "",
          price: "",
        },
      });
    }
  };

  const onHandleSubmit = (e) => {
    e.preventDefault();

    const validateResult = MandatoryCheck(e, form);
    if (validateResult.flag) {
      setForm(validateResult.state);
      Toast.fire({
        icon: "warning",
        title: validateResult.message,
      });
    } else {
      Swal.fire({
        title: "Confirmation",
        text: Constants.MESSAGE.SAVE_CONFIRMATION,
        icon: "info",
        showCancelButton: true,
        confirmButtonText: "Yes",
      }).then((result) => {
        if (result.isConfirmed) {
          onSubmit();
        }
      });
    }
  };

  const onSubmit = () => {
    const requestBody = {
      receiver: form.receiver.value,
      detail_address: form.addressDetail.value,
      phone: form.phone.value,
      province: form.province.value,
      city: form.city.value,
      postal_code: form.postalCode.value,
      address_note: form.addressNote.value,
    };

    api.editUser(requestBody).then((res) => {
      const data = res.data;
      if (data.status === 200) {
        Toast.fire({
          icon: "success",
          title: data.content,
        });
        onHandleModalToggle();
        getDetailUser();
        getCourierOption();
      }
    });
  };

  return (
    <>
      <ModalComp
        status={toggleModalAddress}
        onHide={onHandleModalToggle}
        size={"lg"}
        modalTitle={
          <div className="flex text-soft-black items-baseline gap-3">
            <div className="relative grow mr-5">
              <i className="fa-regular fa-flag fa-lg absolute top-0" />
            </div>

            <div className="flex flex-col">
              <span className="font-semibold">Add Address</span>
              <span className="text-dark-gray-3 font-light text-sm">
                Add Your Personal Address Below For Our Shipping Requirement
              </span>
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          <form onSubmit={onHandleSubmit} className="flex flex-col gap-3">
            <div className="flex gap-3">
              <div className="basis-1/2">
                <Input
                  label={"Receiver"}
                  name={"receiver"}
                  size={"sm"}
                  mandatory={true}
                  value={form.receiver.value}
                  error={form.receiver.statusErr}
                  message={form.receiver.message}
                  onChange={onHandleChange}
                />
              </div>
              <div className="basis-1/2">
                <Input
                  label={"Address Detail"}
                  name={"addressDetail"}
                  size={"sm"}
                  mandatory={true}
                  value={form.addressDetail.value}
                  error={form.addressDetail.statusErr}
                  message={form.addressDetail.message}
                  onChange={onHandleChange}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="basis-1/2">
                <Input
                  label={"Phone"}
                  name={"phone"}
                  type="tel"
                  size={"sm"}
                  mandatory={true}
                  value={form.phone.value}
                  error={form.phone.statusErr}
                  message={form.phone.message}
                  onChange={onHandleChange}
                />
              </div>
              <div className="basis-1/2">
                <ComboBox
                  label={"Province"}
                  name={"province"}
                  size={"sm"}
                  mandatory={true}
                  option={form.province.option}
                  value={form.province.value}
                  error={form.province.statusErr}
                  message={form.province.message}
                  onChange={onHandleChange}
                />
              </div>
            </div>
            <div className="flex gap-3">
              <div className="basis-1/2">
                <ComboBox
                  label={"City"}
                  name={"city"}
                  size={"sm"}
                  mandatory={true}
                  option={form.city.option}
                  value={form.city.value}
                  error={form.city.statusErr}
                  message={form.city.message}
                  onChange={onHandleChange}
                  disabled={form.province.value === ""}
                />
              </div>

              <div className="basis-1/2">
                <ComboBox
                  label={"Postal Code"}
                  name={"postalCode"}
                  size={"sm"}
                  mandatory={true}
                  option={form.postalCode.option}
                  value={form.postalCode.value}
                  error={form.postalCode.statusErr}
                  message={form.postalCode.message}
                  onChange={onHandleChange}
                  disabled={form.city.value === ""}
                />
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="font-semibold text-sm">
                Address Note (Optional)
              </span>
              <TextArea
                label={"Address Note"}
                name={"addressNote"}
                size={"sm"}
                noLabel={true}
                value={form.addressNote.value}
                onChange={onHandleChange}
              />
            </div>
            <Button
              type={"submit"}
              value={"Save"}
              className={"w-fit ml-auto !bg-soft-black !text-sm py-2 px-3"}
            />
          </form>
        </div>
      </ModalComp>

      <ModalComp
        status={toggleModalShipping}
        onHide={onHandleModalToggleShipping}
        size={"md"}
        modalTitle={
          <div className="flex text-soft-black items-baseline gap-3">
            <div className="relative grow mr-5">
              <i className="fa-solid fa-truck fa-lg absolute top-0" />
            </div>
            <div className="flex flex-col">
              <span className="font-semibold">Delivery Type</span>
              <span className="text-dark-gray-3 font-light text-sm">
                Choose the delivery suit for you
              </span>
            </div>
          </div>
        }
      >
        <div className="flex flex-col gap-3">
          <form
            onSubmit={onHandleSubmitDeliveryType}
            className="flex flex-col gap-2"
          >
            {courOpt
              .find((val) => val.code === selectedCour.code)
              ?.costs.map((val, idx) => (
                <div
                  className={`${
                    val.service === formCourDeliveryType.type.name &&
                    "bg-soft-yellow border-2 !border-yellow"
                  } flex justify-between items-center px-3 py-2 rounded-lg border-2`}
                  key={idx}
                  onClick={() => onHandleChangeDeliveryType(val)}
                >
                  <div className="flex flex-col">
                    <span className="font-bold text-base">{val.service}</span>
                    <span className="text-xs">
                      Estimation Arrival :{" "}
                      {val.cost[0].etd.replace(/HARI/g, "")} Days
                    </span>
                  </div>

                  <span className="font-black">
                    ${IDRToUSD(val.cost[0].value)}
                  </span>
                </div>
              ))}

            <Button
              value="Choose"
              type="submit"
              className={"!text-base py-2 mt-3"}
            />
          </form>
        </div>
      </ModalComp>

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
              {cartSelector.data
                .filter((val) => val.onSelected)
                .map((val, idx, arr) => (
                  <React.Fragment key={idx}>
                    <div className="flex gap-3">
                      <img className="h-auto w-24 " />
                      <div className="flex flex-col grow">
                        <span>{val.name}</span>
                        <span className="text-gray-400 text-sm">
                          {val.category}
                        </span>
                        <span className="flex items-center h-fit gap-2 mt-4 ">
                          {val.size} EU -
                          <span
                            className="flex h-5 w-5 rounded-full"
                            style={{ backgroundColor: val.color.toLowerCase() }}
                          ></span>
                        </span>
                      </div>
                      <div className="flex flex-col gap-1 items-end">
                      <span className=" text-lg font-black">${val.price}</span>
                      <span className=" text-sm text-gray-400">Qty : {val.addToCart}</span>
                      </div>
                    </div>
                    <div
                      className={`${
                        idx === arr.length - 1 ? "hidden" : "flex"
                      } border-b border-soft-gray-3`}
                    />
                  </React.Fragment>
                ))}
            </Card>
          </div>

          {/* Address Section */}
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold">Address Detail</span>
            {selectedAddress.receiver.value !== "" ? (
              <>
                <Card className="flex flex-col px-4 py-3 gap-3">
                  <span className="font-bold">
                    {selectedAddress.receiver.value}
                  </span>
                  <div className="flex flex-col gap-2">
                    <span className="text-sm text-gray-400">
                      {selectedAddress.addressDetail.value},
                      {selectedAddress.city_name.value},
                      {selectedAddress.province_name.value},
                      {selectedAddress.postalCode.value}
                    </span>
                    <span className="italic text-sm text-gray-400">
                      {selectedAddress.phone.value}
                    </span>
                  </div>
                  {selectedAddress.addressNote.value.length > 0 && (
                    <div className="flex flex-col gap-2">
                      <span className="text-sm">Extra Note :</span>
                      <span className="flex p-3 text-sm bg-blue-pallete text-white rounded-lg border-2 border-dark-blue-pallete">
                        {selectedAddress.addressNote.value}
                      </span>
                    </div>
                  )}
                </Card>
                <Button
                  onClick={onHandleModalToggle}
                  value={"Change Address"}
                  className={"w-fit ml-auto !bg-soft-black !text-xs py-2 px-3"}
                />
              </>
            ) : (
              <Card className="flex flex-col p-5 gap-3 items-center">
                <span className="font-base text-xl text-dark-gray-3">
                  Where Should We Send Your Shoe?
                </span>
                <Button
                  value={
                    <div className="flex  items-center justify-center gap-2 text-sm text-white">
                      <i className="fa-solid fa-house"></i>
                      <span>Add Address</span>
                    </div>
                  }
                  className="w-fit py-2 px-3"
                  onClick={onHandleModalToggle}
                />
              </Card>
            )}
          </div>

          {/* Available Shipping */}
          <div className="flex flex-col gap-2">
            <span className="text-lg font-bold">
              Available Shipping - Domestic
            </span>

            {courOpt.map((val, idx) => (
              <Card
                className="flex px-4 py-3 gap-4 items-center cursor-pointer"
                onClick={() => onHandleChangeCour(val)}
                key={idx}
              >
                <div className="flex basis-1/6 justify-center">
                  <img src={val?.logo} className="w-auto h-7" />
                </div>
                <div className="flex flex-col grow gap-2">
                  <span className="text-base font-black">
                    {val?.code.toUpperCase()}
                  </span>
                  {val.name === selectedCour.name && (
                    <div className="flex flex-col gap-1">
                      <span className="text-gray-400 text-sm">
                        Choose Delivery Type :
                      </span>
                      <div className="flex bg-soft-yellow border-2 border-yellow rounded-lg px-3 py-2 justify-between items-center gap-5 w-fit">
                        <div className="flex flex-col text-xs gap-1">
                          <span>{selectedCour.type.name}</span>
                          <span className="font-light">
                            Estimation Arrival :{" "}
                            {selectedCour.type.ETA.replace(/HARI/g, "")} Days
                          </span>
                        </div>
                        <span
                          className="font-bold text-xs"
                          onClick={onHandleModalToggleShipping}
                        >
                          Change
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <Checkbox
                  value={val?.name === selectedCour.name}
                  swapPlacement={true}
                  label={`$${
                    val?.name === selectedCour.name
                      ? selectedCour.type.price
                      : val.price
                  }`}
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
            {selectedCour.type.price !== "" && (
              <div className="flex justify-between">
                <span>Shipping Cost</span>
                <span>${selectedCour.type.price}</span>
              </div>
            )}
            <hr className="mt-4"></hr>
            <div className="flex justify-between text-base my-2 !font-bold">
              <span className="font-bold">Total Price</span>
              <span className="font-bold">
                $
                {selectedCour.type.price !== ""
                  ? totalPrice.totalPrice + selectedCour.type.price
                  : totalPrice.totalPrice}{" "}
              </span>
            </div>
            <Button value={"Buy"} className="!bg-soft-green p-2 mt-2" />
          </Card>
        </div>
      </div>
    </>
  );
}

export default Summary;
