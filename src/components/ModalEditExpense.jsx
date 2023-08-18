import { useFormik } from "formik";
import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as Yup from "yup";
import { api } from "../api/api";
import { Modal } from "react-bootstrap";

export const ModalEditExpense = ({ handleClose, show, fetch, val, anyreq }) => {
  const [categoryList, setCategoryList] = useState([]);
  const fetchCategory = async () => {
    await api
      .get(`/category`)
      .then((res) => setCategoryList(res.data))
      .catch((err) => console.log(err));
  };

  const formikEdit = useFormik({
    initialValues: {
      name: val.name,
      nominal: val.nominal,
      category: val.category,
      date: val.date,
      time: val.time,
    },
    enableReinitialize: true,
    validationSchema: Yup.object().shape({
      name: Yup.string().required(),
      nominal: Yup.number().required().min(1),
      category: Yup.string().required(),
      date: Yup.date(),
    }),
    onSubmit: async (values) => {
      await api
        .patch(`/expense/${val.id}`, values)
        .catch((err) => console.log(err));
      fetch(anyreq);
      handleClose();
    },
  });

  useEffect(() => {
    fetchCategory();
  }, []);
  return (
    <>
      <Modal show={show === `editexpense-${val.id}`} onHide={handleClose}>
        <Modal.Header closeButton onClick={formikEdit.resetForm}>
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
                onChange={formikEdit.handleChange}
                value={formikEdit.values.name}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="nominal-addform">
              <Form.Label>Nominal</Form.Label>
              <Form.Control
                type="number"
                name="nominal"
                placeholder="10000"
                onChange={formikEdit.handleChange}
                value={formikEdit.values.nominal}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="category-addform">
              <Form.Label style={{ marginRight: "5px" }}>Category</Form.Label>
              <select
                name="category"
                id="category-addform"
                onChange={formikEdit.handleChange}
                onBlur={formikEdit.handleBlur}
                value={formikEdit.values.category}
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
              <Form.Label>Nominal</Form.Label>
              <Form.Control
                type="date"
                name="date"
                placeholder="YYYY-MM-DD"
                onChange={formikEdit.handleChange}
                value={formikEdit.values.date}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="time-addform">
              <Form.Label>Nominal</Form.Label>
              <Form.Control
                type="time"
                name="time"
                placeholder="HH:mm:ss"
                onChange={formikEdit.handleChange}
                value={formikEdit.values.time}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              formikEdit.resetForm();
              handleClose();
            }}
          >
            Close
          </Button>
          <Button variant="primary" onClick={formikEdit.handleSubmit}>
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
