import { useEffect, useState } from "react";
import { api } from "../api/api";
import { FetchList } from "../components/FetchList";
import {
  Button,
  Card,
  CardImg,
  Col,
  Container,
  Row,
  Table,
} from "react-bootstrap";
import Sidebar from "../components/sidebar";
import { CategoryIcon } from "../components/CategoryIcon";
import { useFormik } from "formik";
import "../components/style.css";
import { ModalAddNewExpense } from "../components/ModalAddNewExpense";
import { useSearchParams } from "react-router-dom";

export const MainTables = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [expenseList, setExpenseList] = useState([]);
  const [totalExpense, setTotalExpense] = useState({});
  const [show, setShow] = useState("");
  const [showList, setShowList] = useState("");
  const [anyreq, setAnyreq] = useState("");
  const handleShowList = () => {
    setShowList("show");
  };
  const handleCloseList = () => {
    setShowList("");
  };

  const handleClose = () => {
    setShow("");
  };
  const handleShowAddExpense = () => {
    setShow("addexpense");
  };

  const handleShowEditExpense = (id) => {
    setShow(`editexpense-${id}`);
  };

  const fetch = async (string) => {
    await api
      .get(`${string}`)
      .then((res) => {
        setExpenseList(res.data.item);
        setTotalExpense(res.data.totalexpense);
      })
      .catch((err) => console.log(err));
  };

  const formikSideBar = useFormik({
    initialValues: {
      name: "",
      category: [],
      datefrom: "",
      dateto: "",
      nominalfrom: "",
      nominalto: "",
      selectallcategory: false,
    },
    onSubmit: async (values) => {
      let stringquery = "/expense";
      const valueskeys = Object.keys(values);
      for (let key of valueskeys) {
        if (key === "category" && values.category.length === 0) {
          continue;
        }
        if (values[key]) {
          stringquery += "?";
          break;
        }
      }
      for (let key of valueskeys) {
        if (key === "category" && values.category.length === 0) continue;
        else if (key === "category" && values.category.length > 0) {
          values[key].forEach((val) => {
            stringquery += `${key}=${val}&`;
          });
        } else if (values[key]) stringquery += `${key}=${values[key]}&`;
      }
      setAnyreq(stringquery);
      fetch(stringquery);
      console.log(stringquery);
    },
  });

  useEffect(() => {
    fetch(anyreq);
  }, []);

  useEffect(() => {
    const executeFilter = setTimeout(() => {
      formikSideBar.handleSubmit();
    }, 500);
    return () => clearTimeout(executeFilter);
  }, [formikSideBar.values]);

  return (
    <>
      <Button
        style={{
          position: "fixed",
          top: "50px",
          right: "0px",
          zIndex: "10",
        }}
        onClick={handleShowAddExpense}
      >
        Add data
      </Button>
      <Row>
        <Col lg={2} className="border-right p-0">
          <Sidebar
            formikSideBar={formikSideBar}
            {...{ buttonname: "Filter", scroll: true, backdrop: true }}
          />
        </Col>
        <Col>
          <Container>
            <Card>
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card
                    className="text-center mb-2 w-100"
                    style={{ margin: "0 auto" }}
                  >
                    <Card.Title>
                      <h3>Expense Dashboard</h3>
                    </Card.Title>
                    <Row className="d-flex flex-row justify-content-center w-100 m-0">
                      <Card className="d-flex flex-row align-items-center justify-content-center">
                        <CardImg
                          src="https://media.tenor.com/yQPfHp6AmGgAAAAC/money-with-wings-joypixels.gif"
                          alt="flying cash icon gif"
                          style={{
                            maxWidth: "calc(50px + 3vw)",
                            float: "left",
                          }}
                        />
                        <Card.Text className="d-flex flex-column justify-content-center align-item-center">
                          <span style={{ fontSize: "calc(15px + 2vw)" }}>
                            Total Expense:
                          </span>
                          <span style={{ fontSize: "calc(15px + 2vw)" }}>
                            IDR
                            {totalExpense.grandtotal &&
                              totalExpense?.grandtotal.toLocaleString(`id-ID`)}
                          </span>
                        </Card.Text>
                      </Card>
                    </Row>
                    <Row className="d-flex flex-row justify-content-start w-100 m-0">
                      {totalExpense?.grandtotal &&
                        Object.keys(totalExpense).map((key, idx) => {
                          if (key !== "grandtotal")
                            return (
                              <CategoryIcon
                                val={key}
                                totalExpense={totalExpense}
                                idx={idx}
                              />
                            );
                        })}
                    </Row>
                  </Card>
                  <Button
                    variant="primary"
                    className="mb-2"
                    onClick={
                      showList === "show" ? handleCloseList : handleShowList
                    }
                  >
                    Show item list
                  </Button>
                  <Container
                    className={
                      showList === "show" ? "d-flex flex-column" : "d-none"
                    }
                  >
                    <Table striped bordered hover>
                      <thead>
                        <tr className="text-center">
                          <th>No</th>
                          <th>Activity</th>
                          <th>Expense cost</th>
                          <th>Category</th>
                          <th>Date</th>
                        </tr>
                      </thead>
                      <tbody>
                        {expenseList.length &&
                          expenseList.map((exp, index) => (
                            <FetchList
                              val={exp}
                              index={index}
                              fetch={fetch}
                              show={show}
                              handleClose={handleClose}
                              handleShowEditExpense={handleShowEditExpense}
                              anyreq={anyreq}
                            />
                          ))}
                      </tbody>
                    </Table>
                  </Container>
                </Card.Body>
              </Card>
            </Card>
          </Container>
        </Col>
      </Row>
      <ModalAddNewExpense
        handleClose={handleClose}
        show={show}
        fetch={fetch}
        anyreq={anyreq}
      />
    </>
  );
};
