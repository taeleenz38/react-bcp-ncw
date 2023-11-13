import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./nft-card.css";
import Modal from "../Modal/ModalBuy";
import store from '../../../store';
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { marketplaceAddress } from '../../../config'
import NFTMarketplace from '../../../contracts/NFTMarketplace.json'
import API from '../../../api';

const NftCardMarket = (props) => {
  const [currency, setCurrency] = store.useState("currency");
  const { title, id, price, image, tokenId } = props.item;
  const [userId, setUserId] = store.useState("userId");
  const [showModal, setShowModal] = useState(false);


  async function buyNft() {
    console.log("Attempting to buy NFT");
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    console.log(marketplaceAddress);
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
    await contract.createMarketSale(tokenId);
    await updateNft();
    console.log("Buy complete");
  }


  async function updateNft() {
    let headers = {
      'Content-Type': 'application/json',
    }
    let dataSet = {
      "nftId": id,
      "ownerId": userId
    }
    const res = await API.put(`nft/buy`, dataSet, {
      headers: headers
    }).catch((e) => {
      alert(e.message);
    });
    setShowModal(false);
  }

  async function showDetails() {
    console.log("trying to fetch details for ", tokenId);
    const web3Modal = new Web3Modal();
    const connection = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(connection);
    const signer = provider.getSigner();
    console.log(marketplaceAddress);
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);
    const data = await contract.fetchItem(tokenId);
    console.log("fetched item for tokenId:", tokenId, data);
  }

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={image} alt="" crossorigin="anonymous" className="w-100" />
      </div>

      <div className="nft__content">
        <div className="d-flex justify-content-around" style={{ width: '100%' }}>
          <button
            className="bid__btn" style={{ backgroundColor: "#E42575", fontWeight: "bold", width: '45%' }}
            onClick={() => setShowModal(true)}
          >BUY
          </button>
          {/* <button className="bid__btn d-flex align-items-cen  ter gap-1" onClick={() => showDetails()}>Details</button> */}
          <button className="de__btn" style={{ backgroundColor: "#00B7FA", fontWeight: "bold", width: '45%' }} onClick={() => showDetails()}>
            <Link style={{ color: "#fff", textDecoration: 'none' }} to={`/detail/${id}`} >{'INFO'} </Link>
          </button>
          {showModal && <Modal setShowModal={setShowModal} item={props.item} buyNft={buyNft} />}
        </div>
        <h5 className="nft__title"><Link to={`/market/${id}`}>{title}</Link> <p><b>{price} Points</b></p></h5>
      </div>
    </div >
  );
};

export default NftCardMarket;
