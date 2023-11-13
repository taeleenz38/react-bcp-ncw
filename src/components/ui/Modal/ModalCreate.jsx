import React from "react";

import "./modal.css";

const Modal = (props) => {
  const { title, id, price, creatorImg, imgUrl, creator, currency } = props.item;

  function createNft() {
    console.log("AAAA");
    props.createNft();
  }

  return (
    <div className="modal__wrapper">
      <div className="single__create__modal">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => props.setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">New NFT</h6>
        <p className="text-center text-light">
           <span className="title">{title}</span>
        </p>

        <div className="nft__img">
        <img src={imgUrl} alt="" className="w-100" />
      </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p>Price</p>
          <span className="money">{price} Points</span>
        </div>

        <button className="place__bid-btn" onClick={() => createNft()}>Create NFT</button>
      </div>
    </div>
  );
};

export default Modal;
