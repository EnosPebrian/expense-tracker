import { useEffect, useState } from "react";
import { api } from "../api/api";
import { FetchList } from "../components/FetchList";
import { Button, Card, Col, Container, Row, Table } from "react-bootstrap";
import { Filter } from "../components/Filter";
import Sidebar from "../components/sidebar";

export const MainTables = () => {
  const [expenseList, setExpenseList] = useState([]);
  const [totalExpense, setTotalExpense] = useState(0);
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

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <Row>
        <Col lg={2} className="border-right">
          <Sidebar
            {...{ buttonname: "Filter", scroll: true, backdrop: true }}
          />
        </Col>
        <Col>
          <Container className="vh-100">
            <Card>
              <Card style={{ width: "100%" }}>
                <Card.Body>
                  <Card
                    className="text-center mb-2 w-50"
                    style={{ margin: "0 auto" }}
                  >
                    <Card.Title>
                      <h1>Expense Dashboard</h1>
                    </Card.Title>
                    <Card.Text>
                      <h2>
                        Subtotal or Total Expense: IDR
                        {totalExpense.toLocaleString(`id-ID`)}
                      </h2>
                    </Card.Text>
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
