import React from 'react'

import '../styles/landing.css';
import bgimg from '../assets/images/bg-img.png';
import arrow1 from "../assets/images/arrow1.png"
import arrow2 from "../assets/images/arrow2.png"
import triangle1 from "../assets/images/triangle1.png"
import triangle2 from "../assets/images/triangle2.png"
import { Link } from 'react-router-dom';


const Landing = () => {
  return (
    <div className="box">
      <img src={arrow1} alt="arrow1" id="arrow1"/>
      <img src={arrow2} alt="arrow2" id="arrow2"/>
      <img src={triangle1} alt="triangle1" id="triangle1"/>
      <img src={triangle2} alt="triangle2" id="triangle2"/>
      <div className="flex-box">
        <div className="flex-box2">
          <h1><span id='span1'>R</span>EWARD<span id='span2'>Z</span></h1>
          <h2>EARN POINTS AND GET REWARDED</h2>
          <div className="flex-btn">
            <button>READ MORE!</button>
            {/* <Link to="/discover">DISCOVER</Link> */}
            <Link to="/play">PLAY NOW</Link>
          </div>
        </div>
        <img src={bgimg} alt="bgimg" />
      </div>  
    </div>
  )
}

export default Landing
