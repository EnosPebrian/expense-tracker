import { useEffect, useState } from "react";
import { api } from "../api/api";
import { FetchList } from "../components/FetchList";
import { Container, Table } from "react-bootstrap";
import { Filter } from "../components/Filter";

export const MainTables = () => {
  const [expenseList, setExpenseList] = useState([]);
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
      .then((res) => setExpenseList(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <button onClick={show === "show" ? handleClose : handleShowlist}>
        Get all expense list
      </button>
      <Container className={show === "show" ? "d-flex flex-column" : "d-none"}>
        <Table>
          <thead>
            <tr>
              <th>No</th>
              <th>Activity</th>
              <th className="text-end">Expense cost</th>
              <th>Category</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {expenseList &&
              expenseList.map((exp, index) => (
                <FetchList val={exp} index={index} />
              ))}
          </tbody>
        </Table>
        <Filter />
      </Container>
    </>
  );
};
