import { Card, CardImg, Col } from "react-bootstrap";
import { Icon } from "../asset/Icon";
import "../components/style.css";

export const CategoryIcon = ({ val, totalExpense, idx }) => {
  return (
    <>
      {totalExpense[val] ? (
        <Col
          lg={4}
          md={6}
          sm={6}
          xs={12}
          xxs={12}
          className="my-3"
          key={idx}
          style={{ maxHeight: "100px" }}
        >
          <Card
            className="d-flex flex-row align-items-center justify-content-center"
            style={{ height: "100%" }}
          >
            <CardImg
              src={Icon[val]}
              alt={`${val} gif`}
              style={{
                width: "calc(50px + 1vw)",
                float: "left",
                aspectRatio: "1/1",
                objectFit: "fill",
              }}
            />
            <Card.Text className="h-100 d-flex flex-column justify-content-center align-item-center">
              <span
                style={{
                  textTransform: "capitalize",
                  fontSize: "calc(14px )",
                  // + 1vw)",
                }}
              >
                {val}
              </span>
              <span style={{ fontSize: "calc(14px + 1vw)" }}>
                IDR{totalExpense[val].toLocaleString(`id-ID`)}
              </span>
            </Card.Text>
          </Card>
        </Col>
      ) : null}
    </>
  );
};
