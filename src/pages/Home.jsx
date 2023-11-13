import React from "react";

import HeroSection from "../components/ui/HeroSection";
import LiveAuction from "../components/ui/Live-auction/LiveAuction";
import SellerSection from "../components/ui/Seller-section/SellerSection";
import Trending from "../components/ui/Trending-section/Trending";
import StepSection from "../components/ui/Step-section/StepSection";
import ProfileSection from "../components/ui/ProfileSection";
import Modal from 'react-modal';
import store from '../store';
import API from '../api';
import "../styles/wallet.css";

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


const Home = () => {
  const [modalIsOpen, setIsOpen] = React.useState(localStorage.getItem('userID') ? false : true);
  const [admin, setAdmin] = store.useState("admin");
  const [user, setUser] = store.useState("user");
  const [userId, setUserId] = store.useState("userId");
  const [walletId, setWalletId] = store.useState("walletId");
  const [loginName, setLoginName] = store.useState("loginName");
  const [fullName, setFullName] = store.useState("fullName");
  const [description, setDescription] = store.useState("description");
  const [badge, setBadge] = store.useState("badge");
  const [badgeUrl, setBadgeUrl] = store.useState("badgeUrl");
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [loginMessage, setLoginMessage] = React.useState('*');
  const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/"
  const [updatedKey, setUpdatedKey] = React.useState(0);

  React.useEffect(() => {
    window.onbeforeunload = function() {
      console.log("REFRESHING...")
      if(localStorage.getItem('loginName')) setLoginName(localStorage.getItem('loginName'));
      if(localStorage.getItem('userID')) setUserId(localStorage.getItem('userID'));
      if(localStorage.getItem('fullName')) setFullName(localStorage.getItem('fullName'));
      if(localStorage.getItem('desc')) setDescription(localStorage.getItem('desc'))
      if(localStorage.getItem('user')) setUser(localStorage.getItem('user'));
      if(localStorage.getItem('isOpen')) setIsOpen(localStorage.getItem('isOpen'));
      if(localStorage.getItem('loginMsg')) setLoginMessage(localStorage.getItem('loginMsg'));
      if(localStorage.getItem('admin')) setAdmin(localStorage.getItem('admin'));
      if(localStorage.getItem('walletId')) setWalletId(localStorage.getItem('walletId'));
      if(localStorage.getItem('badge')) setBadge(localStorage.getItem('badge'));
      if(localStorage.getItem('badgeUrl')) setBadgeUrl(localStorage.getItem('badgeUrl'));
      if(localStorage.getItem('updatedKey')) setUpdatedKey(localStorage.getItem('updatedKey'));
    };

    return () => {
        window.onbeforeunload = null;
    };

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

  async function login() {
    console.log(userName)
    console.log(password)
    const response = await API.get(`user/login?userName=${userName}&password=${password}`
    , {
      // headers: {
      //   "Access-Control-Allow-Credentials": "true",
      //   "Access-Control-Allow-Origin": "*"
      // }
     }
     );
    console.log(response);
    console.log(response.data);

    if(response.data === null){
      setLoginMessage("Wrong credintials");
      setAdmin(false);
      setUser(false);
    }else{
      setLoginName(userName);
      setUserId(response.data.id);
      setFullName(response.data.name);
      setDescription(response.data.comment)
      setUser(true);
      setIsOpen(false);
      setLoginMessage("*");

      localStorage.setItem('loginName', userName);
      localStorage.setItem('userID', response.data.id);
      localStorage.setItem('fullName', response.data.name);
      localStorage.setItem('desc', response.data.comment);
      localStorage.setItem('user', true);
      localStorage.setItem('isOpen', false);
      localStorage.setItem('loginMsg', "*");
      

      if(response.data.role === 2){
        setAdmin(true);
        localStorage.setItem('admin', true);
      } else{
        setAdmin(false);
        localStorage.setItem('admin', false);
      }
      
      const walRes = await API.get(`wallet/${response.data.id}`);
      console.log(walRes);
      setWalletId(walRes.data.walletId);
      localStorage.setItem('walletId', walRes.data.walletId);
      if(response.data.badge === true){
        setBadge(true);
        localStorage.setItem('badge', true);
        const res = await API.get(`nft/find/${response.data.nftId}`);
        console.log(res);
        const url = `${IPFS_GATEWAY}${res.data.image}`
        setBadgeUrl(url);
        localStorage.setItem('badgeUrl', url);
        let updatedKey = 2 + Math.random() * (10000 - 8);
        setUpdatedKey(updatedKey);
        localStorage.setItem('updatedKey', updatedKey);
      } else{
        setBadge(false);
        localStorage.setItem('badge', false);
        setBadgeUrl('');
        localStorage.setItem('badgeUrl', '');
        let updatedKey = 3 + Math.random() * (10000 - 7);
        setUpdatedKey(updatedKey);
        localStorage.setItem('updatedKey', updatedKey);
      }
    }
    console.log(userId);
  }

  function afterOpenModal() {

  }

  function onChangeUserName(event) {
    setUserName(event.target.value);
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  async function refreshBadge(nftId) {
        const res = await API.get(`nft/find/${nftId}`);
        console.log(res.data);
        if(res.data.image !== null){
        const url = `${IPFS_GATEWAY}${res.data.image}`
          setBadgeUrl(url);
          setBadge(true);
          setUpdatedKey(1 + Math.random() * (10000 - 9));
        }
  }

  async function refreshPage(nftId) {

    setUpdatedKey(4 + Math.random() * (10000 - 6));
    
  }


  return (
    <>
        {!user &&
        <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >
        <h2 style={{color:'#3A7CA5'}} >User Login</h2>

        <div style={{marginTop : '40px'}}>
        <label style={{marginRight: '10px'}}>Username :</label>
          <input className="input" placeholder="&nbsp;Enter Username" style={{width: '200px', color:'#3A7CA5', borderRadius:'10px', borderColor:'#E2E2E2' , backgroundColor: "#E2E2E2"}} onChange={onChangeUserName}/>
        </div>

          <div style={{marginTop : '20px'}}>
          <label style={{marginRight: '10px'}}>Password :</label>
          <input type="password" className="input"  placeholder="&nbsp;Enter Password" style={{width: '200px', marginLeft:'4px', color:'#3A7CA5', borderRadius:'10px', borderColor:'#E2E2E2' , backgroundColor: "#E2E2E2"}} onChange={onChangePassword}/>
          </div>
          <div style={{marginTop: '15px'}}>
          <text style={{ color:"red"}}>{loginMessage}</text>
          </div>
        <div style={{marginTop : '15px', display:'flex'}}>
        
          <button style={{margin: '10px', width: '100px', borderRadius:'10px', marginLeft:'auto', marginRight:'auto', backgroundColor:"#1fe2fe", borderColor:'#fff'}} onClick={cancel}>CANCEL</button>

          <button style={{margin: '10px', width: '100px', borderRadius:'10px', marginLeft:'auto',marginRight:'auto', backgroundColor:"#5bc7fe", borderColor:'#fff'}} onClick={login}>LOGIN</button>
        </div>
      </Modal>
}
<div style={{marginTop:'50px'}}>

</div>
<div>
      <ProfileSection badge={badge} badgeUrl={badgeUrl} key={updatedKey} refreshBadge={refreshBadge} refreshPage={refreshPage}/>
      {/* <LiveAuction /> */}
      {/* <SellerSection /> */}
      {/* <Trending /> */}
      {/* <StepSection /> */}
      </div>
    </>
  );
};

export default Home;
