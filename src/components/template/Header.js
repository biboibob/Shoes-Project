import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { PageRoutePath } from "../../utils/config";

import { removeUser } from "../../service/redux/slice/user";

//component
import Modal from "../custom/Modal";

//asset
import Logo from "../../assets/PNG/Logo.png";

function Header() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(true)
  }

  const handleCloseModal = async () => {
    await dispatch(removeUser())
    setShowModal(false);
    navigate(PageRoutePath.LOGIN)
  }
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

      <div className="d-flex justify-between items-center bg-blue-pallete p-3">
        <img src={Logo} width={30} />
        <FontAwesomeIcon
          size="lg"
          onClick={handleShowModal}
          icon={faUser}
        />
      </div>
    </>
  );
}

export default Header;
