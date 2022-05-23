import React, { useState } from 'react'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose } from "@fortawesome/free-solid-svg-icons";
import { Modal, Button } from "react-bootstrap";
//import { useNavigate } from 'react-router-dom';
//import { PageRoutePath } from '../../utils/config';


function ModalToken(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    //navigate(PageRoutePath.LOGIN)
  };

  return (
    <Modal
    show={show}
    onHide={handleClose}
    size="lg"
    aria-labelledby="contained-modal-title-vcenter"
    centered
  >
    <Modal.Header>
      <Modal.Title id="contained-modal-title-vcenter">
        Token Unauthorized
      </Modal.Title>
      <FontAwesomeIcon
        size="xl"
        className="ml-auto"
        onClick={handleClose}
        icon={faClose}
      />
    </Modal.Header>
    <Modal.Body>
      <div className="flex flex-col">
        <h1>Your Token Not Valid or Unauthorized!</h1>
        <span className='mt-3'>You'll be redirect to Login Page</span>
        <Button type='primary' value={"Redirect To Login"} onClick={handleClose}/>
      </div>
    </Modal.Body>
  </Modal>
  )
}

export default ModalToken