import React from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import { Container, Row, Col } from "reactstrap";
import "../styles/wallet.css";
import Modal from 'react-modal';
import store from '../store';
import API from '../api';

store.setState("walletConnected", false, { persist: false });

const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    width: '400px',
    height: '350px'
  },
};

const Wallet = () => {
  const [connected, setConnected] = React.useState(false);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [loginmodalIsOpen, setLoginIsOpen] = React.useState(true);
  const [loginMessage, setLoginMessage] = React.useState('*');
  const [userName, setUserName] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [token, setToken] = React.useState('');
  const [admin, setAdmin] = store.useState("admin");
  const [user, setUser] = store.useState("user");
  const [userId, setUserId] = store.useState("userId");
  const [loginName, setLoginName] = store.useState("loginName");
  const [walletConnected, setWalletConnected] = store.useState("walletConnected");
  const [myWalletId, setMyWalletId] = React.useState('');
  const [walletId, setWalletId] = store.useState("walletId");
  const [selection, setSelection] = React.useState(false);

  React.useEffect(() => {
    console.log(userId)
  }, []);

  function afterOpenModal() {

  }

  function closeModal() {
    setIsOpen(false);
    setLoginIsOpen(false)
  }

  function onChangeUserName(event) {
    setUserName(event.target.value);
  }

  function onChangePassword(event) {
    setPassword(event.target.value);
  }

  function onChangeToken(event) {
    setToken(event.target.value);
  }

  async function connectAZ() {
    console.log("Connect to CA wallet");

    if (window.ethereum) {
      window.ethereum
        .request({ method: "eth_requestAccounts" })
        .then((res) => {
          //   console.log(res)
          //   res.map(async w => {
          //     console.log(w)
          //  })
          if (res[0].toUpperCase() === walletId.toUpperCase()) {
            setLoginMessage("Wallet : " + res[0]);
            setConnected(true)
          } else {
            setMyWalletId(res[0])
            setSelection(true)
          }
        }).catch((e) => {
          setConnected(false)
          alert(e.message);
        });
    } else {
      setConnected(false)
      alert("install metamask extension!!");
    }
  }

  async function setDefaultWallet() {
    setWalletId(walletId)
    setConnected(true)
    setSelection(false)
    setLoginMessage("Default : " + walletId);
  }

  async function setMyWallet() {
    setWalletId(myWalletId)
    setConnected(true)
    setSelection(false)
    setLoginMessage("Wallet : " + myWalletId);
  }

  function connectNFT() {
    console.log("Connect to NFT wallet");

  }

  function cancel() {
    setIsOpen(false);
    setLoginMessage("");
    setConnected(false)
    //window.location.reload(false);
  }

  function cancelLogin() {
    setLoginIsOpen(false);
    setLoginMessage("");
  }

  function connect() {
    console.log(userName)
    console.log(password)
    console.log(token)

  }

  function login() {

  }

  return (
    <>

      {!connected && user &&
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
          contentLabel="Example Modal"
        >
          <h2 style={{ color: '#3A7CA5' }} >Wallet Login</h2>

          <div style={{ marginTop: '30px' }}>
            <label style={{ marginRight: '10px' }}>Username :</label>
            <input className="input" placeholder="&nbsp;Enter Username" style={{ width: '250px', color: '#3A7CA5', borderRadius: '10px', borderColor: '#E2E2E2', backgroundColor: "#E2E2E2" }} onChange={onChangeUserName} />
          </div>

          <div style={{ marginTop: '20px' }}>
            <label style={{ marginRight: '10px' }}>Password :</label>
            <input className="input" placeholder="&nbsp;Enter Password" style={{ width: '250px', marginLeft: '4px', color: '#3A7CA5', borderRadius: '10px', borderColor: '#E2E2E2', backgroundColor: "#E2E2E2" }} onChange={onChangePassword} />
          </div>
          <div style={{ marginTop: '20px' }}>
            <label style={{ marginRight: '10px' }}>Wallet Id :</label>
            <input className="input" placeholder="&nbsp;Enter Token" style={{ width: '250px', marginLeft: '12px', color: '#3A7CA5', borderRadius: '10px', borderColor: '#E2E2E2', backgroundColor: "#E2E2E2" }} onChange={onChangeToken} />
          </div>
          <div style={{ marginTop: '20px' }}>
            <text style={{ color: "red" }}>{loginMessage}</text>
          </div>
          <div style={{ marginTop: '20px', display: 'flex' }}>

            <button style={{ margin: '10px', width: '100px', borderRadius: '10px', marginLeft: 'auto', marginRight: 'auto', backgroundColor: "#1fe2fe", borderColor: '#fff' }} onClick={cancel}>CANCEL</button>

            <button style={{ margin: '10px', width: '100px', borderRadius: '10px', marginLeft: 'auto', marginRight: 'auto', backgroundColor: "#5bc7fe", borderColor: '#fff' }} onClick={connect}>Connect</button>
          </div>
        </Modal>
      }
      <CommonSection title={user ? "Connect Wallet" : "Wallet Details Not Available"} />
      {!connected && !selection && user &&
        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-5 text-center">
                <div className="w-50 m-auto">
                  <h3 style={{ color: "#003171" }} >Connect your wallet</h3>
                  <p style={{ color: "#003171" }}>
                    Select a coin to connect to your wallet!
                  </p>
                </div>
              </Col>

              <Col lg="12" md="4" sm="4" className="mb-4" style={{ cursor: "progress" }}>
                <div className="wallet__item" onClick={() => connectAZ()}>
                  <span>
                    <i style={{ color: "#003171" }} class="ri-coin-fill"></i>
                  </span>
                  <h5 style={{ color: "#003171" }}>{"CA Coin"}</h5>
                  <p style={{ color: "#003171" }}>{"These coins don't have any financial value and cannot be converted into fiat."}</p>
                </div>
              </Col>

            </Row>
          </Container>
        </section>
      }

      {selection && user &&
        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-5 text-center">
                <div className="w-50 m-auto">
                  <h3 style={{ color: "#003171" }} className="text-light">Connect your wallet</h3>
                  <p style={{ color: "#003171" }}>
                    Select the wallet Id
                  </p>
                </div>
              </Col>

              <Col lg="6" md="4" sm="4" className="mb-4" style={{ cursor: "progress" }}>
                <div className="wallet__item" onClick={() => setDefaultWallet()}>
                  <span>
                    <i style={{ color: "#003171" }} class="ri-coin-fill"></i>
                  </span>
                  <h5 style={{ color: "#003171" }}>{"Default Wallet"}</h5>
                  <p style={{ color: "#003171" }}>{"Select " + walletId}</p>
                </div>
              </Col>
              <Col lg="6" md="4" sm="4" className="mb-4" style={{ cursor: "progress" }}>
                <div className="wallet__item" onClick={() => setMyWallet()}>
                  <span>
                    <i style={{ color: "#003171" }} class="ri-coin-fill"></i>
                  </span>
                  <h5 style={{ color: "#003171" }}>{"New Wallet"}</h5>
                  <p style={{ color: "#003171" }}>{"Select " + myWalletId}</p>
                </div>
              </Col>

            </Row>
          </Container>
        </section>
      }

      {connected && user &&
        <section>
          <Container>
            <Row>
              <Col lg="12" className="mb-5 text-center">
                <div className="w-50 m-auto">
                  <h3 style={{ color: "#003171" }} >Connected to Wallet Account</h3>
                  <p style={{ color: "goldenrod" }}>
                    {loginMessage}
                  </p>
                </div>
              </Col>

            </Row>
          </Container>
        </section>
      }
    </>
  );
};

export default Wallet;
