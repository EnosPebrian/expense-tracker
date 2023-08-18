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
          xxs={12}
          className="my-3"
          key={idx}
          style={{ maxHeight: "100px" }}
        >
          <Card
            className="d-flex flex-row align-items-center"
            style={{ flexBasis: "300px", height: "100%" }}
          >
            <CardImg
              src={Icon[val]}
              alt={`${val} gif`}
              style={{
                maxWidth: "7vw",
                float: "left",
                aspectRatio: "1/1",
                objectFit: "fill",
              }}
            />
            <Card.Text className="h-100 d-flex flex-column justify-content-center align-item-center">
              <h4
                style={{
                  textTransform: "capitalize",
                  fontSize: "calc(12px + 1.5vw)",
                }}
              >
                {val}
              </h4>
              <h4 style={{ fontSize: "calc(12px + 1.5vw)" }}>
                IDR{totalExpense[val].toLocaleString(`id-ID`)}
              </h4>
            </Card.Text>
          </Card>
        </Col>
      ) : null}
    </>
  );
};
