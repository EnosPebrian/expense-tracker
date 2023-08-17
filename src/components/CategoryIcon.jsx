import { Card, CardImg, Col } from "react-bootstrap";
import { Icon } from "../asset/Icon";
import "../components/style.css";

export const CategoryIcon = ({ val, totalExpense, idx }) => {
  return (
    <>
      <Col lg={4} md={6} xs={12} className="my-3" key={idx}>
        <Card
          className="d-flex flex-row align-items-center"
          style={{ flexBasis: "300px" }}
        >
          <CardImg
            src={Icon[val]}
            alt={`${val} gif`}
            style={{
              maxWidth: "200px",
              float: "left",
              aspectRatio: "1/1",
              objectFit: "fill",
            }}
          />
          <Card.Text className="h-100 d-flex flex-column justify-content-center align-item-center">
            <h4 style={{ textTransform: "capitalize" }}>{val}: </h4>
            <h4>IDR{totalExpense[val].toLocaleString(`id-ID`)}</h4>
          </Card.Text>
        </Card>
      </Col>
    </>
  );
};
