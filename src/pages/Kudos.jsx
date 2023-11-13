import React from "react";

import HeroSection from "../components/ui/HeroSection";

import PostFilterSection from "../components/ui/Post-filter-section/PostFilterSection";
import PostViewSection from "../components/ui/Post-view-section/PostViewSection";
import PostCreateSection from "../components/ui/Post-create-section/PostCreateSection";
import PostCommunitySection from "../components/ui/Post-community-section/PostCommunitySection";
import Modal from 'react-modal';
import store from '../store';
import "../styles/wallet.css";
import ProfileSection from "../components/ui/ProfileSection";
import WallofFameProfile from "../components/ui/WallOfFameProfile";
import { Container, Row, Col, Label } from "reactstrap";
import "../styles/kudos.css";
import arrow1 from "../assets/images/arrow1.png"
import arrow2 from "../assets/images/arrow2.png"
import triangle1 from "../assets/images/triangle1.png"
import triangle2 from "../assets/images/triangle2.png"



const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '350px',
    height: '300px'
  },
};

store.setState("admin", false, { persist: false });
store.setState("user", false, { persist: false });
store.setState("loginName", false, { persist: false });

const Kudos = () => {
  const [modalIsOpen, setIsOpen] = React.useState(true);
  const [admin, setAdmin] = store.useState("admin");
  const [user, setUser] = store.useState("user");
  const [loginName, setLoginName] = store.useState("loginName");
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginMessage, setLoginMessage] = React.useState('*');
  const [userId, setUserId] = store.useState("userId");

  React.useEffect(() => {
    console.log(user)
    console.log(userId)
    console.log(loginName)
    console.log(admin)
  }, []);

  function closeModal() {
    setIsOpen(false);
  }

  function cancel() {
    setAdmin(false);
    setUser(false);
    setLoginName('')
    setIsOpen(false);
    setLoginMessage("");
  }

  function login() {

  }

  function afterOpenModal() {

  }

  function onChangeUserName(event) {
    setUserName(event.target.value);
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  return (
    <>
      <img src={arrow1} alt="arrow1" id="arrow1" />
      <img src={arrow2} alt="arrow2" id="arrow2" />
      <img src={triangle1} alt="triangle1" id="triangle1" />
      <img src={triangle2} alt="triangle2" id="triangle2" />
      <section style={{ padding: '0', height: '100%' }}>
        <div className="kudos_details" style={{ display: 'flex', alignItems: 'start', justifyContent: 'space-around', height: '100%' }}>
          {/* <div style={{borderColor:"#A94EE4"}}> */}
          <div>
            <WallofFameProfile />
            </div>
          <div className="postContainer">
            <PostCreateSection />
            <PostFilterSection />
            {/* <PostCommunitySection /> */}
            <PostViewSection />
          </div>
          {/* </div> */}
        </div>
      </section>
    </>
  );
};

export default Kudos;
