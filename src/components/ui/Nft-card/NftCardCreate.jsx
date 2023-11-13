import React, { useState } from "react";
import { Link } from "react-router-dom";

import "./nft-card.css";
import API from '../../../api';
import Modal from "../Modal/ModalCreate";
import img from "../../../assets/images/img-01.jpg";
import store from '../../../store';
import axios from 'axios'
import NFTMarketplace from '../../../contracts/NFTMarketplace.json'
import { marketplaceAddress } from '../../../config'
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'

const item = {
  id: "01",
  title: "Guard",
  desc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veniam adipisci cupiditate officia, nostrum et deleniti vero corrupti facilis minima laborum nesciunt nulla error natus saepe illum quasi ratione suscipit tempore dolores. Recusandae, similique modi voluptates dolore repellat eum earum sint.",
  creator: "Trista Francis",
  currentBid: 7.89,
  imgUrl: img,
};

const NftCard = (props) => {
  const { title, desc, price, imgUrl, currency } = props.item;
  const [formInput, updateFormInput] = useState({ price: '', name: '', description: '' })
  const [userId, setUserId] = store.useState("userId");
  const [showModal, setShowModal] = useState(false);
  const [walletId, setWalletId] = store.useState("walletId");

  async function createNft() {
    const ifpsData = await uploadToIPFS(props)
    if (ifpsData !== undefined && ifpsData !== null) {
      console.log("Logging ipfs data......")
      console.log(ifpsData)
      setShowModal(false);
      await mintNtf(props, ifpsData);
      props.createNft(ifpsData.imgHash === null ? false : true);
    }

  }

  async function uploadToIPFS(props) {
    const { title, desc, price, imgUrl, currency, image } = props.item;
    console.log("Uploading data to Pinata IPFS .....")
    try {
      const formData = new FormData()
      formData.append("name", title)
      formData.append("description", desc)
      formData.append("file", image)

      const response = await API.post('ipfs/uploadToIpfs', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      console.log("Img hash : " + response.data.imgHash)
      console.log("Data Url : " + response.data.url)
      return { url: response.data.url, imgHash: response.data.imgHash };
    } catch (error) {
      console.log('Error uploading file: ', error)
      setShowModal(false);
      props.createNft(false);
    }
  }

  async function mintNtf(props, ifpsData) {
    const { title, desc, imgUrl, currency, image, price } = props.item;
    console.log(ifpsData)

    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    // const signer = provider.getSigner() //can try to set the account for the user here
    console.log(">>>>>>   " + walletId)
    const signer = provider.getSigner(walletId);
    const nftPrice = ethers.utils.parseUnits(price, 'ether')
    let contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    let response = await contract.createToken(ifpsData.url, nftPrice, title, desc).catch((x) => {
      setShowModal(false);
      props.createNft(false);
      alert(x.message);
      return;
    });
    console.log("Token created ....", response);
    const trxReceipt = await response.wait();

    let headers = {
      'Content-Type': 'application/json',
    }
    let dataSet = {
      "title": title,
      "desc": desc,
      "creatorId": userId,
      "ownerId": userId,
      "price": price,
      "currency": currency,
      "tokenId": parseInt(parseInt(trxReceipt.events[1].args.tokenId, 16)),
      "image": ifpsData.imgHash
    }
    const res = await API.post(`nft/create`, dataSet, {
      headers: headers
    }).catch((e) => {
      setShowModal(false);
      props.createNft(false);
      //alert(e.message);
    });


  }

  return (
    <div className="single__nft__card">
      <div className="nft__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div>

      <div className="nft__content">
        <h5 className="nft__title" style={{ color: "#003171" }}>
          <b>{title}</b>
        </h5>

        <div className="creator__info-wrapper d-flex gap-3">

          <div className="creator__info w-100 d-flex align-items-center justify-content-between">
            <div>
              <h6 style={{fontWeight: '700'}}><b>Current Price</b></h6>
              <p>{price} Points</p>
            </div>
          </div>
        </div>

        <div className="mt-3 d-flex align-items-center justify-content-between">
          <button
            className="bid__btn d-flex align-items-center gap-1"
            id="create-btn-nft"
            onClick={() => setShowModal(true)}
          >
            <i class="ri-camera-3-line"></i>Create NFT
          </button>

          {showModal && <Modal setShowModal={setShowModal} item={props.item} createNft={createNft} />}

        </div>
      </div>
    </div>
  );
};

export default NftCard;
