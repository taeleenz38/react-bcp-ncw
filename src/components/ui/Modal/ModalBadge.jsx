import React from "react";

import "./modal.css";

const Modal = (props) => {
  const { title, id, price, image, currency } = props.item;

  function buyNft() {
    console.log("AAAA");
    props.buyNft();
  }

  return (
    <div className="modal__wrapper">
      <div className="single__create__modal">
        <span className="close__modal">
          <i class="ri-close-line" onClick={() => props.setShowModal(false)}></i>
        </span>
        <h6 className="text-center text-light">Set as Badge</h6>
        <p className="text-center text-light">
           <span className="title">{title}</span>
        </p>

        <div className="nft__img">
        <img src={image} alt="" className="w-100" />
      </div>

        <div className=" d-flex align-items-center justify-content-between">
          <p>Price</p>
          <span className="money">{price} {currency}</span>
        </div>

        <button className="badge__bid-btn" onClick={() => buyNft()}>Set as Badge</button>
      </div>
    </div>
  );
};

export default Modal;
