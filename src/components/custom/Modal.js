import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Header({ modalHeader, modalTitle, modalDesc, showStatus, onClick }) {
  const [show, setShow] = useState(false);

  // const handleClose = () => {
  //   setShow(false);
  //   navigate(PageRoutePath.LOGIN)
  // };

  useEffect(() => {
    setShow(showStatus);
  }, [showStatus]);

  return (
    <>
      <Modal
        show={show}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          {modalTitle && (
            <Modal.Title id="contained-modal-title-vcenter">
              {modalHeader}
            </Modal.Title>
          )}
          <FontAwesomeIcon
            size="xl"
            className="ml-auto"
            onClick={onClick}
            icon={faClose}
          />
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col">
            <h1>{modalTitle}</h1>
            <span className="mt-3">{modalDesc}</span>
            <Button
              type="primary"
              value={"Redirect To Login"}
              onClick={onClick}
            />
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default Header;
