import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function ModalComp({ modalTitle, status, onHide, children, size = "md" }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(status);
  }, [status]);

  return (
    <>
      <Modal
        show={show}
        size={size}
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header className="border-b-0 px-5 py-4">
          {modalTitle && (
            <Modal.Title id="contained-modal-title-vcenter">
              <span className="text-lg font-semibold">{modalTitle}</span>
            </Modal.Title>
          )}
          <FontAwesomeIcon
            size="xl"
            className="ml-auto"
            onClick={onHide}
            icon={faClose}
          />
        </Modal.Header>
        <Modal.Body className="px-5 py-4">{children}</Modal.Body>
      </Modal>
    </>
  );
}

export default ModalComp;
