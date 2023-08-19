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

  function toggle(e) {
    const checkboxes = document.getElementsByName("category");
    checkboxes.forEach((val) => {
      if (val.checked !== e.target.checked) setTimeout(() => val.click(), 50);
    });
  }

  useEffect(() => {
    fetchCategory();
    setTimeout(() => {
      if (document.getElementById("selectallcategory").checked == false)
        document.getElementById("selectallcategory").click();
      document.getElementById("button-MTD").click();
    }, 1000);
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
          zIndex: "109999999999",
          float: "left",
          left: "0",
        }}
      >
        {buttonname}
      </Button>
      <Offcanvas
        show={show}
        onHide={handleClose}
        {...props}
        responsive="lg"
        style={{ zIndex: "10" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Detailed Search</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Card>
            <Card.Body>
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
                  className="my-3 d-flex flex-column"
                  controlId="category"
                >
                  <h6 className="m-0">Category</h6>
                  <Form.Label className="m-0 p-0">
                    <input
                      type="checkbox"
                      name="selectallcategory"
                      id="selectallcategory"
                      className="d-none"
                      onClick={(e) => toggle(e)}
                    />
                    <Button
                      className="m-0 px-1 py-0 bg-secondary border-secondary"
                      onClick={() =>
                        document.getElementById("selectallcategory").click()
                      }
                    >
                      Select All
                    </Button>
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
              <Button
                id="button-YTD"
                className="m-0 px-1 py-0 bg-secondary border-secondary"
                onClick={() => {
                  document.getElementById("datefrom").value =
                    new Date().toISOString().slice(0, 4) + "-01-01";
                  formikSideBar.values.datefrom =
                    new Date().toISOString().slice(0, 4) + "-01-01";
                  formikSideBar.handleSubmit();
                }}
              >
                YTD
              </Button>
              <Button
                id="button-MTD"
                className="mx-2 px-1 py-0 bg-secondary border-secondary"
                onClick={() => {
                  document.getElementById("datefrom").value =
                    new Date().toISOString().slice(0, 7) + "-01";
                  formikSideBar.values.datefrom =
                    new Date().toISOString().slice(0, 7) + "-01";
                  formikSideBar.handleSubmit();
                }}
              >
                MTD
              </Button>
            </Card.Body>
          </Card>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
