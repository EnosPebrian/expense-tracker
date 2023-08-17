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
import { Filter } from "../components/Filter";
import Sidebar from "../components/sidebar";
import { CategoryIcon } from "../components/CategoryIcon";
import { useFormik } from "formik";

export const MainTables = () => {
  const [expenseList, setExpenseList] = useState([]);
  const [totalExpense, setTotalExpense] = useState({});
  const [show, setShow] = useState("");
  const handleShowlist = () => {
    setShow("show");
  };
  const handleClose = () => {
    setShow("");
  };

  const fetch = async () => {
    await api
      .get(`/expense`)
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
      if (
        values.name ||
        values.category.length ||
        values.datefrom ||
        values.dateto ||
        values.nominalfrom ||
        values.nominalto
      )
        stringquery += "?";
      if (values.name) stringquery += `name=${values.name}&`;
      if (values.datefrom) stringquery += `datefrom=${values.datefrom}&`;
      if (values.dateto) stringquery += `dateto=${values.dateto}&`;
    },
  });

  useEffect(() => {
    fetch();
  }, []);
  useEffect(() => {
    const executeFilter = setTimeout(() => {
      formikSideBar.handleSubmit();
    }, 500);
    return () => clearTimeout(executeFilter);
  }, [formikSideBar.values]);

  return (
    <>
      <Row>
        <Col lg={2} className="border-right">
          <Sidebar
            formikSideBar={formikSideBar}
            {...{ buttonname: "Filter", scroll: true, backdrop: true }}
          />
        </Col>
        <Col>
          <Container className="vh-100">
            <Card>
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card
                    className="text-center mb-2 w-100"
                    style={{ margin: "0 auto" }}
                  >
                    <Card.Title>
                      <h1>Expense Dashboard</h1>
                    </Card.Title>
                    <Row className="d-flex flex-row justify-content-center w-100 m-0">
                      <Card className="d-flex flex-row align-items-center justify-content-center w-50">
                        <CardImg
                          src="https://media.tenor.com/yQPfHp6AmGgAAAAC/money-with-wings-joypixels.gif"
                          alt="flying cash icon gif"
                          style={{ maxWidth: "200px", float: "left" }}
                        />
                        <Card.Text className="h-100 d-flex flex-column justify-content-center align-item-center">
                          <h4>Total Expense:</h4>{" "}
                          <h4>
                            IDR
                            {totalExpense.grandtotal &&
                              totalExpense?.grandtotal.toLocaleString(`id-ID`)}
                          </h4>
                        </Card.Text>
                      </Card>
                    </Row>
                    <Row className="d-flex flex-row justify-content-start w-100 m-0">
                      {totalExpense?.grandtotal &&
                        Object.keys(totalExpense).map((key) => {
                          if (key !== "grandtotal")
                            return (
                              <CategoryIcon
                                val={key}
                                totalExpense={totalExpense}
                              />
                            );
                        })}
                    </Row>
                  </Card>
                  <Button
                    variant="primary"
                    className="mb-2"
                    onClick={show === "show" ? handleClose : handleShowlist}
                  >
                    Show item list
                  </Button>
                  <Container
                    className={
                      show === "show" ? "d-flex flex-column" : "d-none"
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
                            <FetchList val={exp} index={index} />
                          ))}
                      </tbody>
                    </Table>
                    <Filter />
                  </Container>
                </Card.Body>
              </Card>
            </Card>
          </Container>
        </Col>
      </Row>
    </>
  );
};
