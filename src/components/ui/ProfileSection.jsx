import React, { useRef, useState, useEffect } from "react";
import Web3 from 'web3';
import ERC20ABI from '../../contracts/ERC20Token.json';
import { Container, Row, Col, Label } from "reactstrap";
import { Link } from "react-router-dom";
import "./profile-section.css";
import PostFilterSection from "../../components/ui/Post-filter-section/PostFilterSection";
import moment from "moment";
import { marketplaceAddress, erc20Token } from '../../config'
import store from '../../store';
import API from '../../api';
import user0 from '../../assets/images/user0.png'
import user1 from '../../assets/images/user1.jpg'
import user2 from '../../assets/images/user2.jpg'
import user3 from '../../assets/images/user3.jpg'
import badgeDefault from '../../assets/images/badge.png'
import HomeMarket from "../../components/ui/HomeMarket-section/HomeMarket";
import HomeItem from "../../components/ui/HomeItem-section/HomeItem";
import arrow1 from "../../assets/images/arrow1.png"
import arrow2 from "../../assets/images/arrow2.png"
import triangle1 from "../../assets/images/triangle1.png"
import triangle2 from "../../assets/images/triangle2.png"

import heroImg from "../../assets/images/hero.jpg";

const ProfileSection = (props) => {
  const image = { "user0": user0, "1": user1, "2": user2, "3": user3 };
  const [loginName, setLoginName] = store.useState("loginName");
  const [description, setDescription] = store.useState("description");
  const [user, setUser] = store.useState("user");
  const [fullName, setFullName] = store.useState("fullName");
  const [data, setData, updateData] = store.useState("data");
  const [userId, setUserId] = store.useState("userId");
  const [posts, setPosts] = React.useState([]);
  const [badgeImage, setBadgeImage] = React.useState('');
  const [badge, setBadge] = store.useState("badge");
  const [badgeUrl, setBadgeUrl] = store.useState("badgeUrl");
  let name = loginName.toString().toLowerCase();
  const marketBox = useRef();
  const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/"
  const descRef = useRef("");
  const profileData = {
    "0": {},
    "1": {
      "designation": "Manager at ABC pvt Ltd",
      "live": "Melbourne",
      "join": "Joined March 2022"
    },
    "2": {
      "designation": "Developer at ABC pvt Ltd",
      "live": "Sydney",
      "join": "Joined September 2022"
    },
    "3": {
      "designation": "HR at ABC pvt Ltd",
      "live": "Melbourne",
      "join": "Joined May 2022"
    }
  };

  React.useEffect(() => {
    name = loginName.toString().toLowerCase();
    console.log(badge)
    console.log(badgeUrl)
    if (badge === true) {
      setBadgeImage(badgeUrl)
    } else {
      setBadgeImage(badgeDefault)
    }

  }, []);

  React.useEffect(() => {
    async function fetchData() {
      const response = await API.get(`post/get`);
      console.log(response)
      setPosts(response.data);
    }

    fetchData();

  }, []);



  async function likePost(i) {
    console.log(i)
    const response = await API.get(`post/get`);
    response.data[i].like = true;
    response.data[i].unlike = false;
    console.log(response)
    setPosts(response.data);

  }

  async function unlikePost(i) {
    console.log(i)
    const response = await API.get(`post/get`);
    response.data[i].like = false;
    response.data[i].unlike = true;
    console.log(response)
    setPosts(response.data);
  }

  async function goToMarket() {
    marketBox.current.scrollIntoView()
  }

  async function updateDetails() {
    console.log(descRef.current.value)
    if (descRef.current.value !== null && descRef.current.value !== '') {
      let headers = {
        'Content-Type': 'application/json',
      }
      let dataSet = {
        "userId": userId,
        "description": descRef.current.value,
      }
      await API.put(`user/update`, dataSet, {
        headers: headers
      });

      setDescription(descRef.current.value)
      props.refreshPage();
    }
  }

  async function refreshBadge(nftId) {
    console.log("#######  " + nftId);
    props.refreshBadge(nftId);
  }

  const [balance, setBalance] = useState(0);


  useEffect(() => {
    async function fetchBalance() {
      try {
        // Connect to Ganache
        const web3 = new Web3('http://localhost:7545');

        // Get the connected wallet's address
        const accounts = await web3.eth.getAccounts();
        console.log('Accounts:', accounts);

        let userAddress;
        if (userId === "3") {
          userAddress = accounts[0];
        } else if (userId === "1") {
          userAddress = accounts[1];
        } else {
          userAddress = accounts[2];
        }


        // Replace this with your ERC-20 token contract address
        const ca = erc20Token;
        console.log('Token Address:', ca);


        // Load ERC-20 Token contract ABI
        const abi = ERC20ABI.abi;


        const tokenContract = new web3.eth.Contract(abi, ca);

        // Get the balance of the user
        const result = await tokenContract.methods.balanceOf(userAddress).call();
        console.log('Balance Result:', result);


        setBalance(result.toString().slice(0, -18));
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }

    fetchBalance();
  }, [userId]);

  return (
    <section className="wrapper-market">
      <img src={arrow1} alt="arrow1" id="arrow1" />
      <img src={arrow2} alt="arrow2" id="arrow2" />
      <img src={triangle1} alt="triangle1" id="triangle1" />
      <img src={triangle2} alt="triangle2" id="triangle2" />
      <div className="hero__section__details">
        {/* <Container style={{backgroundColor:"red", width:"100%"}}> */}
        <div style={{ borderColor: "#A94EE4" }}>

          {/* <div className="aboutProfile-subsection"> */}
          <div className="Colcolor" style={{ height: 'auto', backgroundColor: '#08050A', borderRadius: '20px', border: '1px solid #00B7FA' }}>
            <div className="aboutProfile-subsection1">
              <div style={{ height: '80px', position: 'relative', backgroundColor: '#3A7CA5', overflow: 'hidden', borderTopLeftRadius: '10px', borderTopRightRadius: '10px' }}></div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ width: "150px", marginTop: '20px', position: 'absolute' }}>
                  <img src={!user ? user0 : image[userId]} alt="" style={{ borderRadius: '10px', width: '150px', height: '160px' }} />
                  {user &&
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'left' }}>
                      <div style={{ width: "80px", marginTop: '0px', position: 'absolute' }}>
                        <img src={badgeImage} alt="" className="w-100" style={{ borderRadius: '40px' }} />
                      </div>
                    </div>
                  }
                </div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px', marginTop: '150px' }}>
                <text style={{ color: "goldenrod", fontSize: '24px', fontWeight: '700' }}>{fullName}</text>
              </div>
              <p style={{ marginLeft: "16px" }}><b>Balance:</b> {balance} points</p>

              {/* <div style={{display: 'flex', alignItems:'center', justifyContent:'center', marginTop: '20px'}}>
              <button style={{background: 'linear-gradient(#22A7F0, #4B77BE)', width:'240px', height: '40px', borderRadius: '20px', borderColor:'#fff'}}  disabled={!user} onClick={() => goToMarket()}>
                <text style={{color:"#fff", textDecoration: 'none'}}>{'       Market       '}</text>
                      </button>
            </div>
            <div style={{display: 'flex', alignItems:'center', justifyContent:'center', marginTop: '10px'}}>
            <button onclick="location.href='kudos'" style={{background: 'linear-gradient(#22A7F0, #4B77BE)', width:'240px', height: '40px', borderRadius: '20px', borderColor:'#fff'}}  disabled={!user}>
            <Link style={{color:"#fff", textDecoration: 'none'}} to="/kudos">{'       New Post       '} </Link>
                      </button>
            </div> */}
            </div>
            <div className="aboutProfile-subsection">
              {user &&
                <div style={{ marginTop: "0px" }}>
                  {/* <div style={{display:"flex", alignItems:"center", alignContent:"center"}}>
                  <Label style={{margin:"10px", color:"#003171", textAlign:"center"}}>{description}</Label>
                </div> */}
                  <b style={{ color: "#fff", textDecoration: 'none', display: "flex", alignItems: "center" }}>{'About Me:'}</b>
                  <div>
                    {/* <i class="ri-book-open-line" style={{color:"#FDFEFE"}}></i> */}
                    <text style={{ color: "#FDFEFE" }}>{profileData[userId].designation} </text>
                  </div>
                  <b className="aboutProfile-subsection-text2" style={{ color: "#fff", textDecoration: 'none', display: "flex", alignItems: "center" }}>{'Lives in:'}</b>
                  <div>
                    {/* <i class="ri-home-wifi-line" style={{color:"#FDFEFE"}}></i> */}
                    <text style={{ color: "#FDFEFE" }}> {profileData[userId].live}</text>
                  </div>
                  {/* <text style={{color:"#fff", textDecoration: 'none', marginLeft:"15px", display:"flex", alignItems:"center"}}>{'Lives in:'}</text>
                <div style={{margin: "5px", marginLeft:"15px", display:"flex", alignItems:"center", alignContent:"center"}}>
                  <i class="ri-calendar-2-line" style={{color:"#FDFEFE"}}></i>
                  <text style={{marginLeft:"5px", color:"#FDFEFE"}}> {profileData[userId].join}</text>
                </div> */}

                  {/* <div>
                <div style={{margin:"5px", marginTop:"20px"}}>
                    <textarea
                      className="textarea"
                      ref={descRef}
                      rows="5"
                      placeholder="  Enter Description"
                      style={{color:"#59ABE3", borderRadius:'10px', borderColor:'#C0C9CC' , backgroundColor: "#F2F1F0", width:"100%"}}
                    ></textarea>
                </div>
                </div> */}

                  {/* <div style={{display: 'flex', alignItems:'center', justifyContent:'center', marginTop: '30px'}}>
                  <button style={{background: descRef.current.value !== null && descRef.current.value !== '' ? 'linear-gradient(#22A7F0, #4B77BE)' : 'linear-gradient(#A39D92, #C0C9CC)', width:'140px', height: '40px', borderRadius: '20px', borderColor:'#fff'}}  disabled={!user} onClick={() => updateDetails()}>
                    <text style={{color:"#fff", textDecoration: 'none'}}>{'       Update Profile       '}</text>
                  </button>
                </div> */}
                </div>
              }
            </div>
          </div>
        </div>
        <div className="postSection">
          <div className="postView" style={{ borderRadius: '20px', border: '1px solid #00B7FA', height: '100%' }}>
            <HomeItem refreshBadge={refreshBadge} />
            <div ref={marketBox}></div>
            <HomeMarket />
          </div>
        </div>
      </div>
      {/* </Container> */}
    </section>
  );
};

export default ProfileSection;
