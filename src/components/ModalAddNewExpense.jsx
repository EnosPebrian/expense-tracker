import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { api } from "../api/api";
import { Modal } from "react-bootstrap";

export const ModalAddNewExpense = ({ handleClose, show, fetch, anyreq }) => {
  const [categoryList, setCategoryList] = useState([]);
  const fetchCategory = async () => {
    await api
      .get(`/category`)
      .then((res) => setCategoryList(res.data))
      .catch((err) => console.log(err));
  };

  const formikAdd = useFormik({
    initialValues: {
      name: "",
      nominal: 0,
      category: "",
      date: "",
      time: "",
    },
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      nominal: Yup.number().required().min(1),
      category: Yup.string().required(),
      date: Yup.date(),
    }),
    onSubmit: async (values) => {
      console.log(values);
      await api.post(`/expense`, values);
      fetch(anyreq);
      handleClose();
    },
  });

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <>
      <Modal show={show === "addexpense"} onHide={handleClose}>
        <Modal.Header closeButton onClick={formikAdd.resetForm}>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="name-addform">
              <Form.Label>Expense Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                placeholder="Any expense name"
                onChange={formikAdd.handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="nominal-addform">
              <Form.Label>Nominal</Form.Label>
              <Form.Control
                type="number"
                name="nominal"
                placeholder="10000"
                onChange={formikAdd.handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category-addform">
              <Form.Label style={{ marginRight: "5px" }}>Category</Form.Label>
              <select
                name="category"
                id="category-addform"
                onChange={formikAdd.handleChange}
                onBlur={formikAdd.handleBlur}
              >
                <option></option>
                {categoryList.length
                  ? categoryList.map((val, idx) => (
                      <SelectCategory val={val} idx={idx} />
                    ))
                  : null}
                <option>Add New Category</option>
              </select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="date-addform">
              <Form.Label>Date</Form.Label>
              <Form.Control
                type="date"
                name="date"
                placeholder="YYYY-MM-DD"
                onChange={formikAdd.handleChange}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="time-addform">
              <Form.Label>Time</Form.Label>
              <Form.Control
                type="time"
                name="time"
                placeholder="HH:mm:ss"
                onChange={formikAdd.handleChange}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              formikAdd.resetForm();
              handleClose();
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={formikAdd.handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

function SelectCategory({ val, idx }) {
  return <option key={idx}>{val.category}</option>;
}
