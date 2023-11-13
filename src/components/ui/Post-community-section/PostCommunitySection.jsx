import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";

import "./post-community-section.css";

const STEP__DATA = [
  {
    title: "COMMUNITY POST",
    desc: "",
    icon: "",
    message: "",
  },
];

const PostCommunitySection = () => {
  return (
    <section style={{marginTop: '0px', height: "150px"}}>
      <Container>
      
            <Row lg="1"  key={1} className="mb-4, main__row__base">
            {/* <div style={{height: '80px', display:'flex', backgroundColor:'#FDFEFE', borderRadius:'10px'}}>

              <Col lg="1" key={1} style={{display:'flex', height:'80px' ,width: '100px', marginLeft: '10px'}}>
              <div style={{height: '50px', width:'300px', display:'flex', alignSelf:'center'}}>
                  <span style={{ display:'flex', alignContent:'center', borderRadius: '10px', alignSelf:'center', width:'300px'}}>

                  <text style={{color:"black", alignSelf:'center', fontSize: '1.5rem'}}>&nbsp;Grow your community  </text>
                </span>
                </div>
              </Col>

              <Col lg="1" key={1} style={{display:'flex', height:'80px' ,width: '100px', marginLeft: '1150px'}}>
              <div style={{height: '50px', width:'100px', display:'flex', alignSelf:'center'}}>
                <span style={{ display:'flex', alignContent:'center', borderRadius: '10px', alignSelf:'center', width:'100px'}}>
                  <i class={"ri-arrow-drop-down-line"} style={{color:"grey", alignSelf:'center', fontSize: '2rem'}}></i>
                </span>
                </div>
              </Col>

              </div> */}
            </Row>

      </Container>
    </section>
  );
};

export default PostCommunitySection;
