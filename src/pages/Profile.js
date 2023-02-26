import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import { MESSAGE } from "../utils/Constant";

//Component
import {
  Button,
  InputWithLabel,
  TextAreaWithLabel,
  InputComboBoxWithLabel,
} from "../components/custom/index";

//Redux Action
import { loadingToggle, skeletonToggle } from "../service/redux/slice/ui";

/* Skeleton Library */
import Skeleton from "react-loading-skeleton";

/* End Point */
import API from "../helper/api";

//Asset
import { AddressNeed, Appreciation } from "../assets/PNG/Profile";

//Service
import { MandatoryCheck, Toast } from "../utils";

function Profile() {
  const api = new API();
  const dispatch = useDispatch();

  const uiSelector = useSelector((state) => state.userInterface);

  const [form, setForm] = useState({
    username: {
      value: "",
      message: "",
      statusErr: false,
    },
    role: {
      value: "",
      message: "",
      statusErr: false,
    },
    email: {
      value: "",
      message: "",
      statusErr: false,
    },
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
      option: [],
    },
  });

  useEffect(() => {
    dispatch(skeletonToggle(true));
    Promise.all([api.getProvince(), api.getDetailUser()])
      .then(([res1, res2]) => {
        if (res1.status === 200 && res2.status === 200) {
          const provinceData = res1.data.data;
          const userDetail = res2.data.data.dataValues;

          let updatedForm = form;

          const updatedValue = {
            username: userDetail.username,
            role: userDetail.role,
            email: userDetail.email,
            receiver: userDetail.receiver,
            addressDetail: userDetail.detail_address,
            addressNote: userDetail.address_note,
            phone: userDetail.phone,
            city: userDetail.city,
            province: userDetail.province,
            postalCode: userDetail.postal_code,
          };

          for (const property in updatedValue) {
            updatedForm = {
              ...updatedForm,
              [property]: {
                ...updatedForm[property],
                value:
                  updatedValue[property] === null ? "" : updatedValue[property],
              },
            };
          }

          updatedForm.province.option = provinceData.province.results.map(
            (val) => {
              return {
                value: val.province_id,
                label: val.province,
              };
            }
          );

          setForm(updatedForm);
        }
      })
      .finally(() => {
        dispatch(skeletonToggle(false));
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (form.province.value !== "") {
      getCity();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.province.value]);

  const onHandleChange = (event) => {
    const { name, value } = event.target;
    setForm({
      ...form,
      [name]: {
        ...form[name],
        value: value,
        statusErr: false,
      },
    });
  };

  const getCity = () => {
    dispatch(loadingToggle(true));
    return api
      .getCity({ province: `${form.province.value}` })
      .then((res) => {
        if (res.status === 200 && res.data.data.status) {
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
        }
      })
      .finally(() => {
        dispatch(loadingToggle(false));
      });
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
        text: MESSAGE.SAVE_CONFIRMATION,
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
      province_name: form.province.option.find(
        (val) => form.province.value === val.value
      ).label,
      city: form.city.value,
      city_name: form.city.option.find((val) => form.city.value === val.value)
        .label,
      postal_code: form.postalCode.value,
      address_note: form.addressNote.value,
    };

    api.editUser(requestBody).then((res) => {
      if (res.status === 200 && res.data.data.status) {
        Toast.fire({
          icon: "success",
          title: MESSAGE.SUCCESS_SAVE,
        });
      }
    });
  };

  const featureUnavailable = () => {
    Toast.fire({
      icon: "warning",
      title: MESSAGE.FEATURE_UNABLE,
    });
  };

  return !uiSelector.skeleton ? (
    <div className="flex container gap-4 py-3">
      <div className="flex flex-col basis-full lg:basis-7/12 gap-5">
        <div className="flex flex-col gap-2">
          <span className="text-2xl md:text-3xl font-black">Profile</span>
          <span className="text-sm md:text-base text-dark-gray-4">
            Manage Your Profile Setting
          </span>
        </div>

        <div className="flex flex-col gap-3">
          {/* Profile Picture */}
          <div className="flex flex-col gap-2">
            <span className="text-lg lg:text-xl font-black">
              Profile Picture
            </span>
            <div className="flex flex-col gap-3 p-3">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <i className="fa-solid fa-circle-user text-dark-gray-4 text-[8rem] text-center w-fit" />
                <div className="flex flex-col gap-2.5 grow">
                  <Button
                    value={"Change Photo"}
                    className={
                      "w-max py-2.5 px-[1.7rem] !bg-soft-black !text-white  shadow-md opacity-100 !text-sm"
                    }
                    onClick={featureUnavailable}
                  />
                  <Button
                    value={
                      <div className="flex items-center gap-2">
                        <i className="fa-solid fa-trash-can text-red-600" />
                        Remove Photo
                      </div>
                    }
                    className={
                      "w-fit py-2.5 px-3 !bg-white !text-soft-black shadow-md opacity-100 !text-sm"
                    }
                    onClick={featureUnavailable}
                  />
                </div>
              </div>
              <span className="text-soft-black text-sm text-center md:!text-left">
                We highly recommended to use profile picture with 256 x 256
                dimension
              </span>
            </div>
          </div>

          {/* Appear Only in Mobile View */}
          {form.receiver.value === "" ? (
            <div className="flex flex-col border-2 border-red-pallete text-white rounded-md md:hidden p-3 gap-2">
              <span className="font-bold text-red-pallete">
                We Can't Do Delivery!
              </span>
              <span className="text-sm text-soft-black">
                Whoops we think your address form still not filled yet. Please
                fill entire information for our shipping requirement.
              </span>
            </div>
          ) : (
            <div className="flex flex-col border-2 border-soft-green text-white rounded-md md:hidden p-3 gap-2">
              <span className="font-bold text-soft-green">You Good to Go!</span>
              <span className="text-sm text-soft-black">
                All information has been filled. Let's hunt your favorite shoe,
                and bring it home.
              </span>
            </div>
          )}

          {/* User Detail */}
          <form onSubmit={onHandleSubmit}>
            <div className="flex flex-col gap-4">
              <span className="text-lg lg:text-xl font-black">User Detail</span>
              <div className="flex flex-col gap-2">
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="basis-1/2">
                    <InputWithLabel
                      value={form.username.value}
                      onChange={onHandleChange}
                      label={"Username"}
                      disabled={true}
                    />
                  </div>
                  <div className="basis-1/2">
                    <InputWithLabel
                      value={form.role.value}
                      onChange={onHandleChange}
                      label={"Role"}
                      disabled={true}
                    />
                  </div>
                </div>

                <InputWithLabel
                  label={"Email"}
                  value={form.email.value}
                  onChange={onHandleChange}
                  disabled={true}
                />
                <div className="flex flex-col md:flex-row gap-2">
                  <div className="basis-1/2">
                    <InputWithLabel
                      onChange={onHandleChange}
                      value={form.receiver.value}
                      error={form.receiver.statusErr}
                      message={form.receiver.message}
                      label={"Receiver"}
                      name={"receiver"}
                      mandatory={true}
                    />
                  </div>
                  <div className="basis-1/2">
                    <InputWithLabel
                      onChange={onHandleChange}
                      value={form.phone.value}
                      error={form.phone.statusErr}
                      message={form.phone.message}
                      label={"Phone"}
                      name={"phone"}
                      type={"number"}
                      mandatory={true}
                    />
                  </div>
                </div>
                <InputWithLabel
                  onChange={onHandleChange}
                  label={"Detail Address"}
                  name={"addressDetail"}
                  value={form.addressDetail.value}
                  error={form.addressDetail.statusErr}
                  message={form.addressDetail.message}
                  mandatory={true}
                />
                <TextAreaWithLabel
                  onChange={onHandleChange}
                  label={"Address Note"}
                  name={"addressNote"}
                  value={form.addressNote.value}
                  error={form.addressNote.statusErr}
                  message={form.addressNote.message}
                  mandatory={true}
                />
                <div className="flex  gap-2">
                  <div className="basis-1/2">
                    <InputComboBoxWithLabel
                      onChange={onHandleChange}
                      label={"Province"}
                      name={"province"}
                      mandatory={true}
                      value={form.province.value}
                      error={form.province.statusErr}
                      message={form.province.message}
                      option={form.province.option}
                    />
                  </div>
                  <div className="basis-1/2">
                    <InputComboBoxWithLabel
                      onChange={onHandleChange}
                      label={"City"}
                      name={"city"}
                      mandatory={true}
                      value={form.city.value}
                      error={form.city.statusErr}
                      message={form.city.message}
                      option={form.city.option}
                      disabled={form.province.value === ""}
                    />
                  </div>
                </div>
                <div className="flex  gap-2">
                  <div className="basis-1/2">
                    <InputComboBoxWithLabel
                      onChange={onHandleChange}
                      label={"Postal Code"}
                      name={"postalCode"}
                      mandatory={true}
                      value={form.postalCode.value}
                      error={form.postalCode.statusErr}
                      message={form.postalCode.message}
                      option={form.postalCode.option}
                      disabled={form.province.value === ""}
                    />
                  </div>
                </div>
              </div>
              <Button
                type="submit"
                value={"Save"}
                className="w-full md:w-fit py-2 px-3 ml-auto !text-sm md:text-base"
              />
            </div>
          </form>
        </div>
      </div>
      <div className="hidden lg:basis-5/12 lg:flex flex-col grow">
        {form.receiver.value === "" ? (
          <div className="flex items-center bg-white border-2 border-soft-black sticky top-[8rem] p-4 rounded-md shadow-md w-4/5">
            <div className="flex flex-col gap-3 w-fit">
              <span className="text-lg font-black text-soft-black">
                We Can't Do Delivery!
              </span>
              <span className="text-sm text-dark-gray-4 w-4/6 2xl:w-5/6 leading-relaxed tracking-wide">
                Whoops we think your address form still not filled yet. Please
                fill entire information for our shipping requirement.
              </span>
            </div>
            <img
              src={AddressNeed}
              className="h-auto object-contain w-48 absolute top-1 xl:top-[-1rem] right-[-6rem]"
              alt="courier-img"
            />
          </div>
        ) : (
          <div className="flex items-center bg-white border-2 border-soft-black sticky top-[8rem] p-4 rounded-md shadow-md w-4/5">
            <div className="flex flex-col gap-3 w-fit">
              <span className="text-lg font-black text-soft-black">
                You Good to Go!
              </span>
              <span className="text-sm text-dark-gray-4 w-3/6 xl:w-4/6 2xl:w-5/6 leading-relaxed tracking-wide">
                All information has been filled. Let's hunt your favorite shoe,
                and bring it home.
              </span>
            </div>
            <img
              src={Appreciation}
              className="h-auto object-contain w-48 absolute top-[-2rem] xl:top-[-2.5rem] right-[-3.5rem] 2xl:right-[-5rem]"
              alt="courier-img"
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <Skeleton
      containerClassName="flex flex-col container gap-4 py-3"
      wrapper={() => (
        <div className="flex flex-col md:flex-row gap-2 animate-pulse">
          <div className="flex flex-col basis-7/12 gap-5">
            <div className="flex flex-col gap-2">
              <div className="h-10 w-32 rounded-md bg-dark-gray" />
              <div className="h-5 w-24 rounded-md bg-dark-gray" />
            </div>

            <div className="flex flex-col grow gap-4 mt-5">
              <div className="h-8 w-32 rounded-md bg-dark-gray" />
              <div className="flex items-center gap-4">
                <div className="h-32 w-32 rounded-full bg-dark-gray" />

                <div className="flex flex-col gap-2">
                  <div className="h-10 w-20 rounded-md bg-dark-gray" />
                  <div className="h-10 w-20 rounded-md bg-dark-gray" />
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <div className="h-10 w-32 rounded-md bg-dark-gray" />
              <div className="h-10 w-auto rounded-md bg-dark-gray" />
              <div className="h-10 w-auto rounded-md bg-dark-gray" />
              <div className="flex gap-3">
                <div className="basis-1/2">
                  <div className="h-10 w-auto rounded-md bg-dark-gray" />
                </div>
                <div className="basis-1/2">
                  <div className="h-10 w-auto rounded-md bg-dark-gray" />
                </div>
              </div>
              <div className="h-10 w-auto rounded-md bg-dark-gray" />
            </div>
          </div>
          <div className="hidden md:basis-5/12">
            <div className="w-auto h-52 rounded-lg bg-dark-gray" />
          </div>
        </div>
      )}
    />
  );
}

export default Profile;
