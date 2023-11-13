// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;

import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./erc20Token.sol";

contract NFTMarketplace is ERC721URIStorage {

    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;
    Counters.Counter private _itemsSold;
    Counters.Counter private _itemsSellable;
    address owner;
    ERC20Token public tokenAddress;

    mapping(uint256 => MarketItem) private idToMarketItem;

    struct MarketItem {
      string name;
      string desc;
      uint256 tokenId;
      address owner;
      uint256 price;
      bool sellable;
    }

    event MarketItemCreated (
      uint256 indexed tokenId,
      address owner,
      uint256 price,
      bool sellable
    );

    constructor(address erc20TokenAddress) ERC721("MyNFT", "NNFT") {
      owner = msg.sender;
      tokenAddress = ERC20Token(erc20TokenAddress);
    }

        /* Mints a token and lists it in the marketplace */
    function createToken(string memory tokenURI, uint256 price, string memory name, string memory desc) public payable returns (uint) {
      _tokenIds.increment();
      uint256 newTokenId = _tokenIds.current();

      _mint(msg.sender, newTokenId);
      _setTokenURI(newTokenId, tokenURI);
      createMarketItem(newTokenId, price, name, desc);
      return newTokenId;
    }

    function createMarketItem( uint256 tokenId, uint256 price, string memory name, string memory desc) private {
      require(price > 0, "Price must be at least 1 wei");

      idToMarketItem[tokenId] =  MarketItem(
        name,
        desc,
        tokenId,
        msg.sender,
        price,
        true
      );

      emit MarketItemCreated(
        tokenId,
        msg.sender,
        price,
        true
      );
      _itemsSellable.increment();
    }
    
    function fetchMyItems() public view returns (MarketItem[] memory) {
      
      uint totalItemCount = _tokenIds.current();
      uint itemCount = 0;
      uint currentIndex = 0;

      for (uint i = 1; i <= totalItemCount; i++) {
        if (idToMarketItem[i].owner == msg.sender) {
          itemCount += 1;
        }
      }

      MarketItem[] memory items = new MarketItem[](itemCount);
      for (uint i = 1; i <= totalItemCount; i++) {
        if (idToMarketItem[i].owner == msg.sender) {
          MarketItem storage currentItem = idToMarketItem[i];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    function fetchMarketItems() public view returns (MarketItem[] memory) {
      uint itemCount = _tokenIds.current();
      uint currentIndex = 0;

      MarketItem[] memory items = new MarketItem[](_itemsSellable.current());
      for (uint i = 1; i <= itemCount; i++) {
        if (idToMarketItem[i].sellable) {
          MarketItem storage currentItem = idToMarketItem[i];
          items[currentIndex] = currentItem;
          currentIndex += 1;
        }
      }
      return items;
    }

    function createMarketSale(uint256 tokenId) public {
      uint price = idToMarketItem[tokenId].price;
      address payable itemOwner = payable(idToMarketItem[tokenId].owner);
      require(tokenAddress.balanceOf(msg.sender) >= price, 'User does not have sufficient balance to make the purchase.');
      tokenAddress.transferTo(msg.sender, itemOwner, price);

      _transfer(idToMarketItem[tokenId].owner, msg.sender, tokenId);
      idToMarketItem[tokenId].owner = msg.sender;
      idToMarketItem[tokenId].sellable = false;
      _itemsSold.increment();
      _itemsSellable.decrement();
    }

    function fetchItem(uint256 tokenId) public view returns (MarketItem memory) {
      return idToMarketItem[tokenId];
    }
}

// remove erc721 --> erc1151
// reference marketplace contract from asset tokenization
// if not importing, segregate marketplace and NFT contracts
// upgradability, pausability, sanctioning, etc


// fetchMarketItems + fetchItem need to be done by the GRAPH
// create events for every action/transaction that changes the state with all the critical info
// test scripts hardhat/truffle tests


// UI will interact (majority) with the GRAPH (graph captures the events)
// metamask + fireblocks for write functions --> if things work in metamask / integration should be ok with fireblocks
// have a look into NCW (non-custodial wallets)
// get everything working on metamask first


// LONG TERM - ROADMAP