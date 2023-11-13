import React, { useState } from "react";
import axios from 'axios'
import CommonSection from "../components/ui/Common-section/CommonSection";
import NftCard from "../components/ui/Nft-card/NftCardMarket";
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




const Market = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = store.useState("user");
  const [userId, setUserId] = store.useState("userId");
  const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/"
  React.useEffect(() => {
    fetchNftData();
}, []);


async function buyNft(nft) {

  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  const nftMarketPlaceContract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer);

  const erc20TokenContract = new ethers.Contract(erc20Token, ERC20Token.abi, signer)

  const walletAddress = await signer.getAddress();
  const availableBalance = await erc20TokenContract.balanceOf(walletAddress)

  const price = ethers.utils.parseUnits(nft.price.toString())

  if (availableBalance.toNumber >= price.toNumber) {

    const approvalResponse = await erc20TokenContract.approve(marketplaceAddress, price.toString())

    const nftTransfer = await nftMarketPlaceContract.createMarketSale(nft.tokenId)
    const trxReceipt = await nftTransfer.wait()

    const erc20LogData = {
      from: trxReceipt.events[3].args.to.toString(),
      to: trxReceipt.events[3].args.from.toString(),
      amount: parseInt(ethers.utils.formatUnits(price, 'ether')),
      reason: "Fee for NFT purchase"
    }
    const erc20LogResponse = await fetch('api/dao/ERC20TokenTransfer',
      { method: 'POST', body: JSON.stringify(erc20LogData), })

    const erc721LogData = {
      tokenId: parseInt(ethers.utils.formatUnits(trxReceipt.events[3].args.tokenId, 0)),
      from: trxReceipt.events[3].args.from.toString(),
      to: trxReceipt.events[3].args.to.toString(),
    }

    const erc721LogResponse = await fetch('api/dao/ERC721TokenTransfer',
      { method: 'POST', body: JSON.stringify(erc721LogData), })

  } else {
    console.log("No enough balance to buy this nft")
  }

}

async function fetchNftData() {
  const web3Modal = new Web3Modal()
  const connection = await web3Modal.connect()
  const provider = new ethers.providers.Web3Provider(connection)
  const signer = provider.getSigner()
  console.log(marketplaceAddress)
  const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
   console.log("Fetching market items.....")

  const response = await API.get(`nft/get`);
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

  const handleCategory = () => {};

  const handleItems = () => {};

  function handleTransfer(item) {
    console.log(item);

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
      <CommonSection title={"Market Place"} />

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

export default Market;
