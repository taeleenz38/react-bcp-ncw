import React from "react";
import { Container, Row, Col } from "reactstrap";
import { Link } from "react-router-dom";
import "./detail-section.css";
import { useParams } from "react-router-dom";
import heroImg from "../../assets/images/hero.jpg";
import API from '../../api';
import store from '../../store';

const DetailSection = () => {
  const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/"
  const { id } = useParams();
  const [currency, setCurrency] = store.useState("currency");
  const [image, setImage] = React.useState('');
  const [title, setTitle] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const [available, setAvailable] = React.useState('');
  const [category, setCategory] = React.useState('');
  const [rate, setRate] = React.useState('');
  const [creator, setCreator] = React.useState('');
  const [owner, setOwner] = React.useState('');

  React.useEffect(() => {
    fetchData(id);

  }, []);

  async function fetchData(nftId) {
    const res = await API.get(`nft/find/${nftId}`);
    console.log(res.data);
    const url = `${IPFS_GATEWAY}${res.data.image}`
    setImage(url)
    setTitle(res.data.title)
    setPrice(res.data.price)
    setDesc(res.data.desc)
    setCategory(res.data.category)
    setRate(res.data.rate)
    setAvailable(res.data.available)
    const crRes = await API.get(`user/find/${res.data.creatorId}`);
    setCreator(crRes.data.name)
    const owRes = await API.get(`user/find/${res.data.ownerId}`);
    setOwner(owRes.data.name)
}

  return (
    <section className="hero__section">
      <Container>
        <Row>
          <Col lg="6" md="6">
            <div className="hero__content">
              <h2 style={{color: "#00B7FA", fontSize: '3rem', fontWeight: '700'}}>
                {title}
              </h2>
              <p style={{color: 'white', fontSize: '1.5rem', fontStyle:'italic', marginTop: '20px'}}>
                {desc}
              </p>

              <div style={{marginTop: "40px"}}>
                <label style={{color:"#00B7FA", fontWeight:'700', fontSize:'1.25rem'}}>Price : </label> <text style={{color:"white", fontSize:'1.25rem'}}>{price} points</text>
              </div>
              <div style={{marginTop: "10px"}}>
                <label style={{color:"#00B7FA", fontWeight:'700', fontSize:'1.25rem'}}>Category : </label> <text style={{color:"white", fontSize:'1.25rem'}}>{category}</text>
              </div>
              <div style={{marginTop: "10px"}}>
                <label style={{color:"#00B7FA", fontWeight:'700', fontSize:'1.25rem'}}>Rate : </label> <text style={{color:"white", fontSize:'1.25rem'}}>{rate}</text>
              </div>
              <div style={{marginTop: "10px"}}>
                <label style={{color:"#00B7FA", fontWeight:'700', fontSize:'1.25rem'}}>Creator : </label> <text style={{color:"white", fontSize:'1.25rem'}}>{creator}</text>
              </div>
              <div style={{marginTop: "10px"}}>
                <label style={{color:"#00B7FA", fontWeight:'700', fontSize:'1.25rem'}}>Owner : </label> <text style={{color:"white", fontSize:'1.25rem'}}>{owner}</text>
              </div>
              <div style={{marginTop: "10px"}}>
                <label style={{color:"#00B7FA", fontWeight:'700', fontSize:'1.25rem'}}>Available : </label> <text style={{color:"white", fontSize:'1.25rem'}}>{available? "Yes" : "No"}</text>
              </div>
              <div className="hero__btns d-flex align-items-center gap-4" style={{marginTop: '50  px'}}>
                <button className="explore__btn d-flex align-items-center gap-2">
                  <i class="ri-arrow-left-circle-line"></i>{" "}
                  <Link to="/marketplace"><b>Return to Marketplace</b></Link>
                  {/* <Link to="/discover">Back</Link> */}
                </button>
              </div>
            </div>
          </Col>

          <Col lg="6" md="6" >
            <div className="hero__img" >
              <img src={image} alt="" className="w-100" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default DetailSection;
