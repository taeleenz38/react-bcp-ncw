import React from "react";
import arrow1 from "../assets/images/arrow1.png"
import arrow2 from "../assets/images/arrow2.png"
import triangle1 from "../assets/images/triangle1.png"
import triangle2 from "../assets/images/triangle2.png"
import "../styles/play.css";


const Play = () => {
    return (
        <>
            <img src={arrow1} alt="arrow1" id="arrow1" />
            <img src={arrow2} alt="arrow2" id="arrow2" />
            <img src={triangle1} alt="triangle1" id="triangle1" />
            <img src={triangle2} alt="triangle2" id="triangle2" />
        </>
    );
};
export default Play;