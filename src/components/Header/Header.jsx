import React, { useRef, useState, useEffect } from "react";
import "./header.css";
import { Container } from "reactstrap";
import store from "../../store";
import { useNavigate } from "react-router-dom";
import Web3 from "web3";

import { NavLink, Link } from "react-router-dom";

const NAV__LINKS = [
  {
    display: "HOME",
    url: "/",
  },
  {
    display: "DISCOVER",
    url: "/discover",
  },
  {
    display: "MARKETPLACE",
    url: "/marketplace",
  },
  {
    display: "WALL OF FAME",
    url: "/wallOfFame",
  },
  {
    display: "PLAY",
    url: "/play",
  },
];

const NAV__LINKS__ADMIN = [
  {
    display: "HOME",
    url: "/",
  },
  {
    display: "DISCOVER",
    url: "/discover",
  },
  {
    display: "MARKETPLACE",
    url: "/marketplace",
  },
  {
    display: "WALL OF FAME",
    url: "/wallOfFame",
  },
  {
    display: "PLAY",
    url: "/play",
  },
  {
    display: "CREATE",
    url: "/create",
  },
  {
    display: "ADMIN",
    url: "/admin",
  },
];

const Header = () => {
  const headerRef = useRef(null);

  const menuRef = useRef(null);
  const [modalIsOpen, setIsOpen] = React.useState(false);
  const [user, setUser] = store.useState("user");
  let [admin, setAdmin] = store.useState("admin");
  const [userId, setUserId] = store.useState("userId");
  const [walletId, setWalletId] = store.useState("walletId");
  const [loginName, setLoginName] = store.useState("loginName");
  const [fullName, setFullName] = store.useState("fullName");
  const [description, setDescription] = store.useState("description");
  const [badge, setBadge] = store.useState("badge");
  const [badgeUrl, setBadgeUrl] = store.useState("badgeUrl");
  const [userName, setUserName] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loginMessage, setLoginMessage] = React.useState("*");
  const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/";
  const [updatedKey, setUpdatedKey] = React.useState(0);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("Page loaded");
    if (localStorage.getItem("loginName"))
      setLoginName(localStorage.getItem("loginName"));
    if (localStorage.getItem("userID"))
      setUserId(localStorage.getItem("userID"));
    if (localStorage.getItem("fullName"))
      setFullName(localStorage.getItem("fullName"));
    if (localStorage.getItem("desc"))
      setDescription(localStorage.getItem("desc"));
    if (localStorage.getItem("user")) setUser(localStorage.getItem("user"));
    if (localStorage.getItem("isOpen"))
      setIsOpen(localStorage.getItem("isOpen"));
    if (localStorage.getItem("loginMsg"))
      setLoginMessage(localStorage.getItem("loginMsg"));
    if (localStorage.getItem("admin")) setAdmin(localStorage.getItem("admin"));
    if (localStorage.getItem("walletId"))
      setWalletId(localStorage.getItem("walletId"));
    if (localStorage.getItem("badge")) setBadge(localStorage.getItem("badge"));
    if (localStorage.getItem("badgeUrl"))
      setBadgeUrl(localStorage.getItem("badgeUrl"));
    if (localStorage.getItem("updatedKey"))
      setUpdatedKey(localStorage.getItem("updatedKey"));

    window.addEventListener("scroll", () => {
      if (
        document.body.scrollTop > 80 ||
        document.documentElement.scrollTop > 80
      ) {
        headerRef.current.classList.add("header__shrink");
      } else {
        headerRef.current.classList.remove("header__shrink");
      }
    });

    return () => {
      window.removeEventListener("scroll");
    };
  }, []);

  const toggleMenu = () => menuRef.current.classList.toggle("active__menu");
  const logoutUser = () => {
    console.log("logout");
    localStorage.removeItem("loginName");
    localStorage.removeItem("userID");
    localStorage.removeItem("fullName");
    localStorage.removeItem("desc");
    localStorage.removeItem("user");
    localStorage.removeItem("isOpen");
    localStorage.removeItem("loginMsg");
    localStorage.removeItem("admin");
    localStorage.removeItem("walletId");
    localStorage.removeItem("badge");
    localStorage.removeItem("badgeUrl");
    localStorage.removeItem("updatedKey");
    setIsOpen(true);
    // navigate('/home')
    navigate("/marketplace");
    clearData();
  };

  function clearData() {
    store.remove("admin", reinitializeDataState);
    store.remove("user", reinitializeDataState);
    store.remove("loginName", reinitializeDataState);
    store.remove("userId", reinitializeDataState);
    store.remove("fullName", reinitializeDataState);
  }

  const reinitializeDataState = () => {
    store.setState("admin", false);
    store.setState("user", false);
    store.setState("loginName", "");
    store.setState("userId", 0);
    store.setState("fullName", "");
  };

  const [address, setAddress] = useState("");

  useEffect(() => {
    async function fetchAddress() {
      try {
        // Connect to Ganache
        const web3 = new Web3("http://localhost:7545");

        // Get the connected wallet's address
        const accounts = await web3.eth.getAccounts();
        console.log("Accounts:", accounts);

        let address;
        if (userId === "3") {
          address = accounts[0];
        } else if (userId === "1") {
          address = accounts[1];
        } else {
          address = accounts[2];
        }

        setAddress(address);
      } catch (error) {
        console.log("Connected address:", address);
        console.error("Error fetching address:", error);
      }
    }

    fetchAddress();
  }, [userId]);

  return (
    <header className="header" ref={headerRef}>
      <div className="container-navbar">
        <div className="navigation">
          {/* <div className="logo">
            <h1>NFT Rewards Platform</h1>
          </div> */}

          <div className="nav__menu" ref={menuRef} onClick={toggleMenu}>
            <ul className="nav__list">
              {address === "0x2fcF19054E33c60a2d5A182C17f29C63fdE1B6DD"
                ? NAV__LINKS__ADMIN.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.url}
                        className={(navClass) =>
                          navClass.isActive ? "active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))
                : NAV__LINKS.map((item, index) => (
                    <li className="nav__item" key={index}>
                      <NavLink
                        to={item.url}
                        className={(navClass) =>
                          navClass.isActive ? "active" : ""
                        }
                      >
                        {item.display}
                      </NavLink>
                    </li>
                  ))}
            </ul>
          </div>

          <div className="button-container">
            <div className="nav__right d-flex align-items-center gap-5 ">
              <button className="btn d-flex gap-2 align-items-center">
                <span>
                  <i class="ri-wallet-line"></i>
                </span>
                <Link to="/wallet">Connect Wallet</Link>
              </button>

              <span className="mobile__menu">
                <i class="ri-menu-line" onClick={toggleMenu}></i>
              </span>
            </div>

            <div className="nav__right d-flex align-items-center gap-5 ">
              <button
                className="btn d-flex gap-2 align-items-center"
                onClick={logoutUser}
                disabled={!user}
              >
                <span>
                  <i class="ri-logout-circle-r-line"></i>
                </span>
              </button>

              <span className="mobile__menu">
                <i class="ri-menu-line" onClick={logoutUser}></i>
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
