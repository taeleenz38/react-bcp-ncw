import React, { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import { NFT__DATA } from "../../../assets/data/data";
import "./homeitem.css";
import NftCardMyItems from "../Nft-card/NftCardMyItems";
import store from '../../../store';
import API from '../../../api';
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import { marketplaceAddress, erc20Token } from '../../../config'
import NFTMarketplace from '../../../contracts/NFTMarketplace.json'
import ERC20Token from '../../../contracts/ERC20Token.json'

const HomeItem = (props) => {
  const curuserid =  localStorage.getItem('userID');
  const [showMyItems, setmyItems] = useState(false);
  const [admin, setAdmin] = store.useState("admin");

  const [data, setData] = useState([]);
  const [user, setUser] = store.useState("user");
  const [userId, setUserId] = store.useState("userId");
  const IPFS_GATEWAY = "https://gateway.pinata.cloud/ipfs/"
  React.useEffect(() => {
    fetchNftData();
}, []);


function timeout(delay) {
  return new Promise( res => setTimeout(res, delay) );
}

  async function fetchNftData() {
    //await timeout(1000);
    const web3Modal = new Web3Modal()
    const connection = await web3Modal.connect()
    const provider = new ethers.providers.Web3Provider(connection)
    const signer = provider.getSigner();
    console.log(marketplaceAddress)
    const contract = new ethers.Contract(marketplaceAddress, NFTMarketplace.abi, signer)
    console.log("Fetching market items..... > "+ userId);

    const response = await API.get(`nft/${userId}`);
      if(curuserid == 3){
        setmyItems(true);
      }
      else {
        setmyItems(false);
      }
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

  async function refreshBadge(nftId) {
    props.refreshBadge(nftId);
  }

  return (
    <section>
      <Container>
       { !showMyItems && <Row >
          <Col lg="12" className="mb-2">
            <h3 className="trending__title" style={{color: "#00B7FA"}}>My Items</h3>
          </Col>

          {data.length === 0 &&
            <h6 className="no_data"> You don't have any items yet</h6>
          }
          {user && data?.map((item) => (
              <Col lg="3" md="3" sm="6" className="mb-4" key={item.id}>
                <NftCardMyItems item={item} refreshBadge={refreshBadge} />
              </Col>
            ))}
        </Row>
}
      </Container>
    </section>
  );
};

export default HomeItem;
