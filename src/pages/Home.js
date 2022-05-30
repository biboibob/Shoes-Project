import React, { useEffect, useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { faTrash, faEdit, faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { useSelector } from "react-redux";

//component
import FormField from "../components/custom/FormField";

import API from "../helper/api";
import "../styles/Home.sass";

function Home() {
  const api = new API();
  const [users, setUsers] = useState([]);

  //redux 
  // const ReduxVal = useSelector((state) => state.userInfoStore);

  const [form, setForm] = useState({
    Username: "",
    Role: "",
    Email: "",
  });

  const [show, setShow] = useState(false);

  const handleClose = () => {
    setShow(false);
    setForm({
      Username: "",
      Role: "",
      Email: "",
    });
  };

  const handleShow = (val) => {
    setShow(true);
    setForm({
      Username: val.username,
      Role: val.role,
      Email: val.email,
    });
  };

  const onChangeForm = (event) => {
    const { name, value } = event.target;

    const updatedForm = {
      ...form,
      [name]: value,
    };

    //console.log("Form Change", updatedForm);

    setForm(updatedForm);
  };

  const onSave = () => {
    const params = {
      username: form.Username,
      role: form.Role,
      email: form.Email
    }
    api
      .editUser(params)
      .then((res) => {
        console.log("input success");
      })
      .catch((res) => {
        console.log(res);
      });
  };

  useEffect(() => {
    api
      .getAllUser()
      .then((res) => {
        const { status, data } = res.data;
        if (status === 200) {
          setUsers(data);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      <Modal
        show={show}
        onHide={handleClose}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Editing {form.Username}
          </Modal.Title>
          <FontAwesomeIcon
            size="xl"
            className="ml-auto"
            onClick={handleClose}
            icon={faClose}
          />
        </Modal.Header>
        <Modal.Body>
          <div className="flex flex-col gap-3">
            <FormField
              label={"Username"}
              name={"Username"}
              value={form.Username}
              onChange={onChangeForm}
              vertical={true}
            />
            <FormField
              label={"Role"}
              name={"Role"}
              value={form.Role}
              onChange={onChangeForm}
              vertical={true}
            />
            <FormField
              label={"Email"}
              name={"Email"}
              value={form.Email}
              onChange={onChangeForm}
              vertical={true}
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="outline-primary" onClick={onSave}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="flex flex-col">
        <span>Home</span>
        <div className="flex flex-col max-w-screen-md mx-auto">
          <span>test</span>
          <table className="tableConfig table-fixed">
            <thead>
              <tr>
                <th>Name</th>
                <th>Role</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((val) => (
                <tr key={val.id}>
                  <td>{val.username}</td>
                  <td>{val.role}</td>
                  <td>{val.email}</td>
                  <td className="flex justify-center gap-3">
                    <FontAwesomeIcon
                      className="text-red-pallete"
                      icon={faTrash}
                    />{" "}
                    <FontAwesomeIcon
                      onClick={() => handleShow(val)}
                      className="text-blue-pallete"
                      icon={faEdit}
                    />{" "}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Home;
