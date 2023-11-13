import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nft-card.css";
import Modal from "../Modal/ModalBadge";
import store from '../../../store';
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { marketplaceAddress } from '../../../config'
import NFTMarketplace from '../../../contracts/NFTMarketplace.json'
import API from '../../../api';

const NftCardMarket = (props) => {
  const [currency, setCurrency] = store.useState("currency");
  const { title, id, price, image, tokenId, userId } = props.item;
  const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/"
  const [showModal, setShowModal] = useState(false);
  const [loginName, setLoginName] = store.useState("loginName");
  const [badge, setBadge] = store.useState("badge");
  const [badgeUrl, setBadgeUrl] = store.useState("badgeUrl");

  async function updateBadge() {
    console.log("Call");
    let headers = {
      'Content-Type': 'application/json',
    }
    let dataSet = {
      "userId": userId,
      "nftId": id,
    }
    await API.put(`user/badge`, dataSet, {
      headers: headers
    });
    setShowModal(false);
    refreshUser();
  }

  async function refreshUser() {
    console.log(">>>> " + loginName);
    const response = await API.get(`user/${loginName}`);
    console.log(response.data);
    if (response.data !== null) {
      if (response.data.badge === true) {
        setBadge(true);
        const res = await API.get(`nft/find/${response.data.nftId}`);
        console.log(res);
        const url = `${IPFS_GATEWAY}${res.data.image}`
        setBadgeUrl(url);
      } else {
        setBadge(false);
        setBadgeUrl('');
      }
      props.refreshBadge(response.data.nftId);
    }

  }

  async function showDetails() {
    console.log("got to page");
  }

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={image} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <div className="d-flex justify-content-around" style={{ width: '100%' }}>
          <button
            className="bid__btn"
            style={{ marginRight: "5px", backgroundColor: "#E42575", fontWeight: "bold", width: '45%' }}
          >
            LIST
          </button>
          <button className="de__btn" style={{ marginRight: "5px", backgroundColor: "#00B7FA", fontWeight: "bold", width: '45%' }} onClick={() => showDetails()}>
            <Link style={{ color: "#fff", textDecoration: 'none' }} to={`/detail/${id}`} >{'INFO'} </Link>
          </button>
          {showModal && <Modal setShowModal={setShowModal} item={props.item} buyNft={updateBadge} />}

        </div>
        <h5 className="nft__title">
          <Link to={`/detail/${id}`}>{title}</Link> <p><b>{price} Points</b></p>
        </h5>
      </div>
    </div>
  );
};

export default NftCardMarket;
