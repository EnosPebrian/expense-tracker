import { Col, Row } from "react-bootstrap";

export const Filter = () => {
  return (
    <>
      <Row>
        Filter
        <Col>
          <input type="text" name="name" placeholder="activity" id="name" />
          <input type="text" name="category" placeholder="category" />
          <input
            type="number"
            name="nominal"
            id="nominal"
            placeholder="nominal IDR...."
          />
          <input type="date" name="date" id="date" />
          <input type="text" name="action" id="date" />
          <input type="number" name="id" id="id" placeholder="id" />
        </Col>
      </Row>
    </>
  );
};
