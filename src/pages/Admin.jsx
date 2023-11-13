import React, { useState } from 'react'
import { Container, Row, Col } from "reactstrap";
import store from '../store';
import { ethers } from 'ethers' //Using ethers lib to make the blockchain commands
import API from '../api';
import { erc20Token } from '../config'
import ERC20Token from '../contracts/ERC20Token.json'
import Web3Modal from 'web3modal'
import moment from "moment";
import arrow1 from "../assets/images/arrow1.png"
import arrow2 from "../assets/images/arrow2.png"
import triangle1 from "../assets/images/triangle1.png"
import triangle2 from "../assets/images/triangle2.png"
import '../styles/admin.css';


const Admin = () => {
  let [data, setData, updateData] = store.useState("data");
  let [admin, setAdmin] = store.useState("admin");
  const [userId, setUserId] = store.useState("userId");
  const [user, setUser] = store.useState("user");
  const [loginName, setLoginName] = store.useState("loginName");
  const [walletConnected] = store.useState("walletConnected");
  const [fullName, setFullName] = store.useState("fullName");
  const [creatorWalletId, setCreatorWalletId] = React.useState('');
  const [referanceWalletId, setReferanceWalletId] = React.useState('');
  const [posts, setPosts] = React.useState([]);

  //Meta mask connection consts
  const [errorMessage, setErrorMessage] = useState(null);
  const [defaultAccount, setDefaultAccount] = useState(null);
  const [userBalance, setUserBalance] = useState(null);
  const [connButtonText, setConnButtonText] = useState('Transfer Funds');
  const [walletId, setWalletId] = store.useState("walletId");


  const connectWalletHandler = () => {
    if (window.ethereum && window.ethereum.isMetaMask) {
      console.log('MetaMask Here!');

      window.ethereum.request({ method: 'eth_requestAccounts' })
        .then(result => {
          accountChangedHandler(result[0]);
          setConnButtonText('Transfer');
          getAccountBalance(result[0]);

          // network: using the ganache localhost dev network
          let network = 'HTTP://127.0.0.1:7541'
          // let provider = ethers.getDefaultProvider(network)
          let provider = new ethers.providers.JsonRpcProvider(network);
          // Sender private key: 
          // correspondence address 0xb985d345c4bb8121cE2d18583b2a28e98D56d04b
          let privateKey = '327a2b5ed2207dabec5636587b00244ade8a3c5960eacf9a02459db948ae9d64'
          // Create a wallet instance
          let wallet = new ethers.Wallet(privateKey, provider)
          // Receiver Address which receives Ether
          let receiverAddress = '0x2430F5c1bD9643b6dD2dd10f875E6098f0d6544f'
          // Ether amount to send
          let amountInEther = '0.01'
          // Create a transaction object
          let tx = {
            to: receiverAddress,
            // Convert currency unit from ether to wei
            value: ethers.utils.parseEther(amountInEther)
          }
          // Send a transaction
          wallet.sendTransaction(tx)
            .then((txObj) => {
              console.log('txHash', txObj.hash)
              // => 0x9c172314a693b94853b49dc057cf1cb8e529f29ce0272f451eea8f5741aa9b58
              // A transaction result can be checked in a etherscan with a transaction hash which can be obtained here.
            })

        })
        .catch(error => {
          setErrorMessage(error.message);

        });

    } else {
      console.log('Need to install MetaMask');
      setErrorMessage('Please install MetaMask browser extension to interact');
    }
  }

  // update account, will cause component re-render
  const accountChangedHandler = (newAccount) => {
    setDefaultAccount(newAccount);
    getAccountBalance(newAccount.toString());
  }

  const getAccountBalance = (account) => {
    window.ethereum.request({ method: 'eth_getBalance', params: [account, 'latest'] })
      .then(balance => {
        setUserBalance(ethers.utils.formatEther(balance));
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };


  React.useEffect(() => {
    async function fetchData() {
      const creatorResponse = await API.get(`wallet/1`);
      const referanceResponse = await API.get(`wallet/2`);
      console.log(creatorResponse)
      console.log(referanceResponse)
      setCreatorWalletId(creatorResponse.data.walletId);
      setReferanceWalletId(referanceResponse.data.walletId);
    }
    fetchData();

  }, []);

  React.useEffect(() => {
    fetchPostData();
  }, []);



  async function fetchPostData() {
    const response = await API.get(`post/get`);
    console.log(response)
    setPosts(response.data);

  }

  async function approvePost(i) {
    console.log(i)

    let headers = {
      'Content-Type': 'application/json',
    }
    let dataSet = {
      "postId": posts[i].id,
      "approver": fullName,
    }
    await API.put(`post/update`, dataSet, {
      headers: headers
    });

    await fetchPostData();

    handleTransfer();
  }

  async function rejectPost(i) {
    console.log(i)
    let headers = {
      'Content-Type': 'application/json',
    }
    let dataSet = {
      "postId": posts[i].id
    }
    await API.delete(`post/delete`, { data: dataSet }, {
      headers: headers
    });

    await fetchPostData();
  }

  async function handleTransfer() {
    console.log(creatorWalletId);
    console.log(referanceWalletId);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner(walletId);
    const contract = new ethers.Contract(erc20Token, ERC20Token.abi, signer);
    await contract.transfer(creatorWalletId, ethers.BigNumber.from(10 + '000000000000000000'));
    await contract.transfer(referanceWalletId, ethers.BigNumber.from(100 + '000000000000000000'));
    console.log("Transfer complete");
  }

  async function refreshData() {

  }

  function clearData() {
    store.remove("data", reinitializeDataState)
  }

  const reinitializeDataState = () => {
    store.setState("data", []);
  }

  return (
    <>
      <img src={arrow1} alt="arrow1" id="arrow1" />
      <img src={arrow2} alt="arrow2" id="arrow2" />
      <img src={triangle1} alt="triangle1" id="triangle1" />
      <img src={triangle2} alt="triangle2" id="triangle2" />
      <section>
        <Container>
          <div style={{ marginBottom: 600 }}>
            {!admin &&
              <h2 style={{ color: "red", marginTop: 50 }}>Restricted access </h2>
            }
            {admin && <div>
              <h2 style={{ color: "#00B7FA", fontWeight: "700", marginTop: 50, marginBottom: "30px" }}>{posts.length > 0 ? "Pending Posts To Approve" : "No Pending Posts To Approve"}  </h2>
              {/* <button style={{ width: '120px', borderRadius:'10px', backgroundColor:"red", borderColor:'#fff'}} onClick={clearData}>CLEAR ALL</button> */}

            </div>}

            {admin && user && posts.map((item, index) => (
              item.approved ?
                <div></div>
                :
                <div className="main__row" style={{ marginTop: "20px", backgroundColor: "rgb(18,12,24)" }}>

                  <Row lg="2" key={index} className="main__row__base ">
                    <Col lg="10" key={index} className="single__post__side__item__right" >
                      <div className="single__post__item" style={{ backgroundColor: '#FDFEFE' }}>
                        <div>
                          <Row>
                            {/* <h6><br></br> {"Metamask Integration"} </h6>
                                <button style={{ width: '120px', marginLeft:'10px', backgroundColor:'#3A7CA5', borderRadius:'10px', borderColor:'#fff' }}onClick={connectWalletHandler}><text style={{color:'#fff'}}/>{connButtonText}</button> */}
                            <Col lg="2" style={{ display: "flex", alignSelf: "center" }}>
                              <button className='admin-btns' style={{ paddingTop: '5px', paddingBottom: '5px', width: '150px', fontWeight: '700', marginLeft: '10px', backgroundColor: '#00B7FA', borderRadius: '10px', borderColor: '#fff' }} onClick={() => approvePost(index)}><text style={{ color: '#fff' }}>Approve </text></button>
                            </Col>
                            <Col lg="6" style={{ display: "flex", alignSelf: "center" }}>
                              <button className='admin-btns' style={{ paddingTop: '5px', paddingBottom: '5px', width: '150px', fontWeight: '700', marginLeft: '10px', backgroundColor: '#E42575', borderRadius: '10px', borderColor: '#fff' }} onClick={() => rejectPost(index)}><text style={{ color: '#fff' }}>Reject </text></button>
                            </Col>
                          </Row>

                        </div>
                        <div className="post__item__content" style={{ marginLeft: "15px" }}>
                          <p style={{ color: "#BBC0CC" }} className="mb-0">Posted by <span style={{ color: "#E42575" }}><b>{item.creator}</b></span> at {moment(item.createdAt).format("DD-MM-YYYY hh:mm:ss")}</p>
                        </div>
                        <div className="post__item__message" style={{ marginLeft: "15px" }}>
                          <div>
                            {item.referance !== undefined &&
                              <text style={{ color: "#00B7FA" }}><b>{item.referance}</b> </text>
                            }
                            <text style={{ color: "white" }}>{item.content}</text>
                          </div>
                          {/* {item.hasOwnProperty('image') && typeof(item.image) !== 'string' &&
                                    <div style={{marginTop:"10px"}}>
                                    <img style={{width: '200px', height: '200px'}} src={URL.createObjectURL(item.image)} />
                                    </div>
                 } */}
                        </div>
                      </div>
                    </Col>

                  </Row>
                </div>
            ))}
          </div>
        </Container>
      </section>

    </>
  );
};

export default Admin;
