import React, { useRef, useState, useEffect } from "react";
import Web3 from 'web3';
import ERC20ABI from '../contracts/ERC20Token.json';
import NFTMarketplace from '../contracts/NFTMarketplace.json'
import store from '../store';
import { NFT__DATA } from "../assets/data/data";
import { marketplaceAddress, erc20Token } from '../config'
import API from '../api';
import Web3Modal from 'web3modal'
import { ethers } from 'ethers'
import '../styles/discover.css'
import '../styles/landing.css';
import arrow1 from "../assets/images/arrow1.png"
import arrow2 from "../assets/images/arrow2.png"
import triangle1 from "../assets/images/triangle1.png"
import triangle2 from "../assets/images/triangle2.png"
import airlineTicket from '../assets/images/airlineTicket.jpg';
import foodVoucher from "../assets/images/foodVoucher.jpg"
import hotelBooking from "../assets/images/hotelBooking.jpg"
import movieTicket from "../assets/images/movieTicket.jpg"
import shoppingDiscount from "../assets/images/shoppingDiscount.jpg"
import vip from "../assets/images/VIP.jpg"
import x from "../assets/images/x.png"

const Discover = () => {
    const [userId, setUserId] = store.useState("userId");
    const [items, setItems] = useState([]);


    useEffect(() => {
        async function fetchItems() {
            try {
                // Connect to Ganache
                const web3 = new Web3('http://localhost:7545');

                // Get the connected wallet's address
                const accounts = await web3.eth.getAccounts();
                console.log('Accounts:', accounts);

                let userAddress;
                if (userId === "3") {
                    userAddress = accounts[0];
                } else if (userId === "1") {
                    userAddress = accounts[1];
                } else {
                    userAddress = accounts[2];
                }


                // Replace this with your ERC-20 token contract address
                const ca = marketplaceAddress;
                console.log('Marketplace Address:', ca);


                // Load Marketplace contract ABI
                const abi = NFTMarketplace.abi;
                const Contract = new web3.eth.Contract(abi, ca);

                // Get the balance of the user
                const result = await Contract.methods.fetchMyItems(userAddress).call({ from: userAddress });
                console.log('My Items:', result);


                setItems(result);
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        }

        fetchItems();
    }, [userId]);


    console.log("items:", items);

    if ((items.length > 0) && (items[0][3] != "0x2fcF19054E33c60a2d5A182C17f29C63fdE1B6DD")) {
        return (
            <div className="discover-container">
                <img src={arrow1} alt="arrow1" id="arrow1" />
                <img src={arrow2} alt="arrow2" id="arrow2" />
                <img src={triangle1} alt="triangle1" id="triangle1" />
                <img src={triangle2} alt="triangle2" id="triangle2" />
                <div className="discover-flex1">
                    <div className="discover-item">
                        {items[0][0] === "Alpha Performer" ? <img src={airlineTicket} alt="airlineTicket" /> : <img src={x} alt="x" />}
                        <p>Flight Ticket</p>
                    </div>
                    <div className="discover-item">
                        {(items[0][0] === "Bright Beginner") || (items[0][0] === "Inspirer") || (items[0][0] === "Prime Player") || (items[0][0] === "Budding Star") ? <img src={foodVoucher} alt="foodVoucher" /> : <img src={x} alt="x" /> }
                        <p>Food Voucher</p>
                    </div>
                    <div className="discover-item">
                        {items[0][0] === "Alpha Performer" ? <img src={hotelBooking} alt="hotelBooking" /> : <img src={x} alt="x" /> }
                        <p>Hotel Booking</p>
                    </div>
                </div>
                <div className="discover-flex2">
                    <div className="discover-item">
                        {(items[0][0] === "Prime Player") || (items[0][0] === "Budding Star") ? <img src={movieTicket} alt="movieTicket" /> : <img src={x} alt="x" /> }
                        <p>Movie Ticket</p>
                    </div>
                    <div className="discover-item">
                        {(items[0][0] === "Inspirer") ? <img src={shoppingDiscount} alt="shoppingDiscount" /> : <img src={x} alt="x" /> }
                        <p>Discount Coupon</p>
                    </div>
                    <div className="discover-item">
                        {items[0][0] === "Alpha Performer" ? <img src={vip} alt="vip" /> : <img src={x} alt="x" /> }
                        <p>VIP Lounge Access</p>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="discover-container">
            <img src={arrow1} alt="arrow1" id="arrow1" />
            <img src={arrow2} alt="arrow2" id="arrow2" />
            <img src={triangle1} alt="triangle1" id="triangle1" />
            <img src={triangle2} alt="triangle2" id="triangle2" />
            <div className="discover-flex1">
                <div className="discover-item">
                    <img src={x} alt="x" />
                    <p>Flight Ticket</p>
                </div>
                <div className="discover-item">
                    <img src={x} alt="x" />
                    <p>Food Voucher</p>
                </div>
                <div className="discover-item">
                    <img src={x} alt="x" />
                    <p>Hotel Booking</p>
                </div>
            </div>
            <div className="discover-flex2">
                <div className="discover-item">
                    <img src={x} alt="x" />
                    <p>Movie Ticket</p>
                </div>
                <div className="discover-item">
                    <img src={x} alt="x" />
                    <p>Discount Coupon</p>
                </div>
                <div className="discover-item">
                    <img src={x} alt="x" />
                    <p>VIP Lounge Access</p>
                </div>
            </div>
        </div>
    );

}

export default Discover
