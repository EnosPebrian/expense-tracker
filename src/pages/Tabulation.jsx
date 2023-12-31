import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { MainTables } from "./maintables";
import { Container } from "react-bootstrap";

export const Tabulation = () => {
  return (
    <>
      <Container
        className="m-0 p-0 justify-content-center align-items-center"
        style={{
          display: "flex !important",
          width: "100%",
          maxWidth: "2000px",
        }}
      >
        <Container className="mw-100">
          <Tabs
            defaultActiveKey="Summary"
            id="uncontrolled-tab"
            className="mb-3"
          >
            <Tab eventKey="Summary" title="Summary">
              <MainTables />
            </Tab>
            <Tab eventKey="MonthlyReport" title="Monthly Report">
              <div className="vh-100 d-flex align-items-center justify-content-center">
                <h1>Monthly Report is under construction</h1>
              </div>
            </Tab>
            <Tab eventKey="contact" title="Contact" disabled>
              Tab content for Contact
            </Tab>
          </Tabs>
        </Container>
      </Container>
    </>
  );
};
