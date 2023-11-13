import React from "react";

import { Container, Row, Col } from "reactstrap";
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCardCreate";
import prv from "../assets/images/nft.jpg";
import FileBase64 from 'react-file-base64';
import arrow1 from "../assets/images/arrow1.png"
import arrow2 from "../assets/images/arrow2.png"
import triangle1 from "../assets/images/triangle1.png"
import triangle2 from "../assets/images/triangle2.png"


import "../styles/create-item.css";


const Create = () => {

  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [imgUrl, setImgUrl] = React.useState(prv);
  const [img, setImg] = React.useState('');
  const [price, setPrice] = React.useState(0.00);
  const [currency, setCurrency] = React.useState('PBT');
  const [fileInput_ref, setFileInputRef] = React.useState({});

  function onChangeTitle(event) {
    setTitle(event.target.value);
  }

  function onChangeDesc(event) {
    setDesc(event.target.value);
  }

  function onChangeImgUrl(event) {
    // console.log(event.base64)
    // setImgUrl(event.base64);
    console.log(event.target.files[0])
    setImg(event.target.files[0])
    const objectUrl = URL.createObjectURL(event.target.files[0])
    setImgUrl(objectUrl)
  }

  function onChangePrice(event) {
    setPrice(event.target.value);
  }

  function createNft(flag) {
    console.log(flag);
    if (flag === true) {
      setTitle('');
      setDesc('');
      setImgUrl(prv);
      setPrice(0.00);
      setImg('');
    } else {
      alert("NFT create failed")
    }
  }


  return (
    <>
      <img src={arrow1} alt="arrow1" id="arrow1" />
      <img src={arrow2} alt="arrow2" id="arrow2" />
      <img src={triangle1} alt="triangle1" id="triangle1" />
      <img src={triangle2} alt="triangle2" id="triangle2" />
      <CommonSection title="Create NFT" />

      <section>
        <Container>
          <div className="NFT-card-flex">
            <div className="NFT-preview">
              <h5 style={{ color: "#00B7FA" }} className="mb-3"><b>Preview Item</b></h5>
              <NftCard item={{ "title": title, "desc": desc, "imgUrl": imgUrl, "price": price, "currency": currency, "image": img }} createNft={createNft} />
            </div>

            <div className="NFT-details">
              <div className="create__item">
                <form>
                  <div className="form__input">
                    <label style={{ color: "#00B7FA" }} htmlFor="">Upload File</label>
                    <input type="file" className="upload__input input" style={{ color: "grey", backgroundColor: "#120C18" }} onChange={onChangeImgUrl} />
                    {/* <FileBase64
                      multiple={ false }
                      onDone={onChangeImgUrl} 
                      onClick={e => (e.target.value = null)}
                      /> */}

                  </div>

                  <div className="form__input">
                    <label style={{ color: "#00B7FA" }} htmlFor="">Price</label>
                    <input
                      type="number"
                      placeholder={"Enter price for one item - points"}
                      onChange={onChangePrice}
                      value={price}
                      className="input"
                      style={{ color: "#FFF", backgroundColor: "#120C18" }}
                    />


                  </div>

                  {/* <div className="form__input">
                    <label htmlFor="">Minimum Bid</label>
                    <input type="number" placeholder="Enter minimum bid" />
                  </div>

                  <div className=" d-flex align-items-center gap-4">
                    <div className="form__input w-50">
                      <label htmlFor="">Starting Date</label>
                      <input type="date" />
                    </div>

                    <div className="form__input w-50">
                      <label htmlFor="">Expiration Date</label>
                      <input type="date" />
                    </div>
                  </div> */}

                  <div className="form__input">
                    <label style={{ color: "#00B7FA" }} htmlFor="">Title</label>
                    <input type="text" placeholder="Enter title" className="input" style={{ color: "#FFF", backgroundColor: "#120C18" }} onChange={onChangeTitle} value={title} />
                  </div>

                  <div className="form__input">
                    <label style={{ color: "#00B7FA" }} htmlFor="">Description</label>
                    <textarea
                      name=""
                      id=""
                      rows="7"
                      placeholder="Enter description"
                      className="w-100 input"
                      onChange={onChangeDesc}
                      value={desc}
                      style={{ color: "#FFF", backgroundColor: "#120C18" }}
                    ></textarea>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Create;
