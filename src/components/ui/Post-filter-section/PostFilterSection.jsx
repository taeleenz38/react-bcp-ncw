import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import "./post-filter-section.css";

const STEP__DATA = [
  {
    title: "FILTER POST",
    desc: "",
    icon: "",
    message: "",
  },
];

const PostFilterSection = () => {
  return (
    <div className="PostFilterSec">
      <section style={{ marginTop: '0px', padding: "0", marginBottom: '20px' }}>
        <Container>

          <Row lg="1" key={1} className="mb-4, main__row__base" style={{ borderRadius: '15px' }}>
            <div style={{ height: '80px', display: 'flex', backgroundColor: '#120C18', borderRadius: '10px', justifyContent: 'space-between' }}>
              <div style={{ display: 'flex' }}>
                <Col lg="1" key={1} style={{ display: 'flex', height: '80px', width: '100px', marginLeft: '20px' }}>
                  <div style={{ height: '50px', width: '100px', display: 'flex', alignSelf: 'center' }}>
                    <span id="hot" style={{ display: 'flex', justifyContent:'space-evenly', alignContent: 'center', backgroundColor: "#120C18", borderRadius: '10px', alignSelf: 'center', width: '100px' }}>
                      <i class={"ri-fire-fill"} style={{ color: "#E42575", alignSelf: 'center', fontSize: '2rem' }}></i>
                      <text style={{ color: "#E42575", alignSelf: 'center', fontSize: '1.5rem' }}>Hot</text>
                    </span>
                  </div>
                </Col>
                <Col lg="1" key={1} style={{ display: 'flex', height: '80px', width: '100px', marginLeft: '20px' }}>
                  <div style={{ height: '50px', width: '100px', display: 'flex', alignSelf: 'center' }}>
                    <span style={{ display: 'flex', alignContent: 'center', borderRadius: '10px', alignSelf: 'center', width: '100px' }}>
                      <i class={"ri-refresh-line"} style={{ color: "grey", alignSelf: 'center', fontSize: '2rem' }}></i>
                      <text style={{ color: "grey", alignSelf: 'center', fontSize: '1.5rem' }}>&nbsp;New  </text>
                    </span>
                  </div>
                </Col>
                <Col lg="1" key={1} style={{ display: 'flex', height: '80px', width: '100px', marginLeft: '20px' }}>
                  <div style={{ height: '50px', width: '100px', display: 'flex', alignSelf: 'center' }}>
                    <span style={{ display: 'flex', alignContent: 'center', borderRadius: '10px', alignSelf: 'center', width: '100px' }}>
                      <i class={" ri-bar-chart-fill"} style={{ color: "grey", alignSelf: 'center', fontSize: '2rem' }}></i>
                      <text style={{ color: "grey", alignSelf: 'center', fontSize: '1.5rem' }}>&nbsp;Top  </text>
                    </span>
                  </div>
                </Col>
              </div>
              <Col lg="1" key={1} style={{ display: 'flex', height: '80px', width: '100px' }}>
                <div style={{ height: '50px', width: '100px', display: 'flex', alignSelf: 'center' }}>
                  <span style={{ display: 'flex', alignContent: 'center', borderRadius: '10px', alignSelf: 'center', width: '40px' }}>
                    <i class={"ri-inbox-line"} style={{ color: "grey", alignSelf: 'center', fontSize: '2rem' }}></i>
                  </span>
                  <span style={{ display: 'flex', alignContent: 'center', borderRadius: '10px', alignSelf: 'center', width: '40px' }}>
                    <i class={"ri-arrow-drop-down-line"} style={{ color: "grey", alignSelf: 'center', fontSize: '2rem' }}></i>
                  </span>
                </div>
              </Col>

            </div>
          </Row>

        </Container>
      </section>
    </div>
  );
};

export default PostFilterSection;
