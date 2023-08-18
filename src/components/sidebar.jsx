import { useEffect, useState } from "react";
import { Card, Form } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Offcanvas from "react-bootstrap/Offcanvas";
import { api } from "../api/api";
import CategoryFilterForm from "./Category-filter-form";
import "../components/style.css";

export default function Sidebar({ formikSideBar, buttonname, ...props }) {
  const [show, setShow] = useState(false);
  const [category, setCategory] = useState([]);
  async function fetchCategory() {
    await api.get(`/category`).then((res) => setCategory(res.data));
  }
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  function selectAll() {}

  useEffect(() => {
    fetchCategory();
  }, []);

  return (
    <>
      <Button
        variant="primary"
        onClick={toggleShow}
        className="d-lg-none"
        style={{
          position: "fixed",
          top: "50px",
          zIndex: "100",
          float: "left",
          left: "0",
        }}
      >
        {buttonname}
      </Button>
      <Offcanvas show={show} onHide={handleClose} {...props} responsive="lg">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Detailed Search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Card>
            <Card.Body className="p-0">
              <h5>Filter</h5>
              <Form>
                <Form.Group className="mb-1" controlId="nameform">
                  <Form.Label className="m-0">
                    <h6 className="m-0">Expense name</h6>
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Expense name"
                    onChange={formikSideBar.handleChange}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-1" controlId="datefrom">
                  <Form.Label className="m-0">
                    <h6 className="m-0">Date from</h6>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="datefrom"
                    placeholder="datefrom"
                    onChange={formikSideBar.handleChange}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-1" controlId="dateto">
                  <Form.Label className="m-0">
                    <h6 className="m-0">Date to</h6>
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="dateto"
                    placeholder="dateto"
                    onChange={formikSideBar.handleChange}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-1" controlId="nominalfrom">
                  <Form.Label className="m-0">
                    <h6 className="m-0">Min Expense Nominal</h6>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="nominalfrom"
                    placeholder="Nominal e.g., 20000"
                    onChange={formikSideBar.handleChange}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-1" controlId="nominalto">
                  <Form.Label className="m-0">
                    <h6 className="m-0">Max Expense Nominal</h6>
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="nominalto"
                    placeholder="Nominal e.g., 20000"
                    onChange={formikSideBar.handleChange}
                    autoFocus
                  />
                </Form.Group>
                <Form.Group
                  className="mb-1 d-flex flex-column"
                  controlId="category"
                >
                  <h6 className="m-0">Category</h6>
                  <Form.Label className="m-0 p-0">
                    <input
                      type="checkbox"
                      name="selectallcategory"
                      onClick={selectAll}
                      id="selectallcategory"
                    />
                    <span className="mx-2">Select All</span>
                  </Form.Label>
                  {category.length &&
                    category.map((cat, idx) => (
                      <CategoryFilterForm
                        cat={cat}
                        idx={idx}
                        formikSideBar={formikSideBar}
                      />
                    ))}
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
