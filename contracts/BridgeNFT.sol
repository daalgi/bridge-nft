// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "hardhat/console.sol";
// Last deployed contract to Rinkeby
//0x98472C7099675A82d9f8E65b67e5a0586FcCB284
//https://rinkeby.etherscan.io/address/0x98472c7099675a82d9f8e65b67e5a0586fccb284

contract BridgeNFT is ERC721Enumerable, Ownable {

    string _baseTokenURI;
    uint256 public tokenCounter;
    uint256 NFT_MAX = 10;
    uint256 public nftCurrentMax;
    uint256 maxPurchase = 5;
    uint256 private _reserved = 100;
    uint256 private PRICE = 0.07 ether;
    // uint16 private _royalties;
    bool public saleOpen = false;
    uint256 public SALE_START;

    event NewNFTMinted(address sender, uint256 numTokens, uint256 lastTokenId);

    constructor(string memory baseURI, uint256 _nftCurrentMax) ERC721("BridgeNFT", "BRG") {
        Ownable(msg.sender);
        setBaseURI(baseURI);
        if (_nftCurrentMax > NFT_MAX) {
            _nftCurrentMax = NFT_MAX;
        }
        nftCurrentMax = _nftCurrentMax;
        // _royalties = royalties;
    }

    function _baseURI() internal view virtual override returns (string memory) {
        return _baseTokenURI;
    }

    function setBaseURI(string memory baseURI) public onlyOwner {
        _baseTokenURI = baseURI;
    }

    function setSaleOpen(bool _saleOpen) public onlyOwner {
        saleOpen = _saleOpen;
    }

    function buy(uint numTokens) public payable {
        require(saleOpen, "Sale closed");
        require(msg.value >= PRICE * numTokens, "Insufficient ETH");
        require(numTokens <= maxPurchase, "Exceeded maximum purchase");
        require(tokenCounter + numTokens <= nftCurrentMax, "Not enough tokens available");

        for(uint256 i; i < numTokens; i++){
            _safeMint(msg.sender, tokenCounter + i);
        }

        tokenCounter += numTokens;
        
        emit NewNFTMinted(msg.sender, numTokens, tokenCounter-1);
        // emit NewNFTMinted(msg.sender, numTokens, newItemId);
    }

    // function createFreeCollectible() public {
    //     _mint(msg.sender, _tokenId);
    //     // _setBaseTokenURI(_tokenIdTracker, tokenURI);
    //     _tokenIdTracker++;
    // }

    // function sellTransfer(
    //     address _from,
    //     address _to,
    //     uint256 _tokenId
    // ) public payable {
    //     uint256 fee = (msg.value * royalties) / 100;
    //     uint256 remaining = msg.value - fee;
    //     //address(this).transfer(fee);
    //     safeTransferFrom(_from, _to, _tokenId);
    // }
}
