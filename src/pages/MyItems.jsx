import React, { useState } from "react";

import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCardMyItems";
import { NFT__DATA } from "../assets/data/data";
import { Container, Row, Col } from "reactstrap";
import "../styles/market.css";
import store from '../store';
import API from '../api';
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { marketplaceAddress, erc20Token } from '../config'
import NFTMarketplace from '../contracts/NFTMarketplace.json'
import ERC20Token from '../contracts/ERC20Token.json'

const MyItems = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = store.useState("user");
  const [userId, setUserId] = store.useState("userId");
  const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/"
  React.useEffect(() => {
    fetchNftData();
}, []);


  const handleCategory = () => {};

  const handleItems = () => {};

  function handleTransfer(item) {
    console.log(item);

  }

  async function fetchNftData() {
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner()
    console.log(marketplaceAddress)
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
     console.log("Fetching market items.....")
  
    const response = await API.get(`nft/${userId}`);
    console.log(response)
    const nfts = await Promise.all(response.data.map(async i => {
        const tokenUri = await contract.tokenURI(i.tokenId)
        const imgUrl = `${IPFS_GATEWAY}${i.image}`
        console.log(imgUrl)
        let item = {
        id: i.id,
        price: i.price,
        tokenId: i.tokenId,
        owner: i.ownerId,
        image: imgUrl,
        title: i.title,
        description: i.desc,
        userId: userId,
        }
      return item
    }))
    console.log(nfts)
    setData(nfts);
  }

  // ====== SORTING DATA BY HIGH, MID, LOW RATE =========
  const handleSort = (e) => {
    const filterValue = e.target.value;

    if (filterValue === "high") {
      const filterData = NFT__DATA.filter((item) => item.currentBid >= 6);

      setData(filterData);
    }

    if (filterValue === "mid") {
      const filterData = NFT__DATA.filter(
        (item) => item.currentBid >= 5.5 && item.currentBid < 6
      );

      setData(filterData);
    }

    if (filterValue === "low") {
      const filterData = NFT__DATA.filter(
        (item) => item.currentBid >= 4.89 && item.currentBid < 5.5
      );

      setData(filterData);
    }
  };

  return (
    <>
      <CommonSection title={"My Items"} />

      <section>
        <Container>
          <Row>
            <Col lg="12" className="mb-5">
              <div className="market__product__filter d-flex align-items-center justify-content-between">
                <div className="filter__left d-flex align-items-center gap-5">
                  <div className="all__category__filter">
                    <select onChange={handleCategory}>
                      <option>All Categories</option>
                      <option value="art">Art</option>
                      <option value="music">Music</option>
                      <option value="domain-name">Domain Name</option>
                      <option value="virtual-world">Virtual World</option>
                      <option value="trending-card">Trending Cards</option>
                    </select>
                  </div>

                  {/* <div className="all__items__filter">
                    <select onChange={handleItems}>
                      <option>All Items</option>
                      <option value="single-item">Single Item</option>
                      <option value="bundle">Bundle</option>
                    </select>
                  </div> */}
                </div>

                <div className="filter__right">
                  <select onChange={handleSort}>
                    <option>Sort By</option>
                    <option value="high">High Rate</option>
                    <option value="mid">Mid Rate</option>
                    <option value="low">Low Rate</option>
                  </select>
                </div>
              </div>
            </Col>

            {user && data?.map((item) => (
              <Col lg="3" md="4" sm="6" className="mb-4" key={item.id}>
                <NftCard item={item} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </>
  );
};

export default MyItems;
