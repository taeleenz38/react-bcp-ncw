import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { NFT__DATA } from "../../../assets/data/data";
import "./homemarket.css";
import NftCardMarket from "../Nft-card/NftCardMarket";
import store from '../../../store';
import API from '../../../api';
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { marketplaceAddress, erc20Token } from '../../../config'
import NFTMarketplace from '../../../contracts/NFTMarketplace.json'
import ERC20Token from '../../../contracts/ERC20Token.json'



const HomeMarket = () => {
  const [data, setData] = useState([]);
  const [user, setUser] = store.useState("user");
  const [userId, setUserId] = store.useState("userId");
  const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/"
  React.useEffect(() => {
    fetchNftData();
  }, []);

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
    console.log("NFTS:", nfts)
    setData(nfts);
  }

  return (
    <section>
      <Container >
        <Row >
          <Col lg="12" className="mb-2">
            <h3 className="trending__title" style={{ color: "#00B7FA" }}>Market</h3>
          </Col>

          {data.length === 0 &&
            <h6 className="no_data"> No market data available yet</h6>
          }
          <div className="home-market-flex">
            {user && data?.map((item) => (
              <NftCardMarket item={item} />
            ))}
          </div>
        </Row>
      </Container>
    </section>
  );
};

export default HomeMarket;
