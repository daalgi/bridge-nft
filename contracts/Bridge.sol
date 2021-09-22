// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
// pragma solidity 0.6.6;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

// Last deployed contract to Rinkeby
//0x98472C7099675A82d9f8E65b67e5a0586FcCB284
//https://rinkeby.etherscan.io/address/0x98472c7099675a82d9f8e65b67e5a0586fccb284

contract Bridge is ERC721, Ownable {
    uint256 public _tokenIdTracker;
    uint256 private baseCost;
    uint16 private royalties;
    mapping(uint256 => uint256) public currentPrice;

    constructor(uint256 _baseCost, uint16 _royalties) ERC721("Bridge", "BRG") {
        Ownable(msg.sender);
        require(_baseCost >= 0);
        baseCost = _baseCost;
        require(_royalties >= 0);
        royalties = _royalties;
    }

    function createCollectible() public payable {
        require(msg.value >= baseCost);
        //owner.transfer(msg.value);
        createFreeCollectible();
    }

    function createFreeCollectible() public {
        _mint(msg.sender, _tokenIdTracker);
        // _setBaseTokenURI(_tokenIdTracker, tokenURI);
        _tokenIdTracker++;
    }

    function sellTransfer(
        address _from,
        address _to,
        uint256 _tokenId
    ) public payable {
        uint256 fee = (msg.value * royalties) / 100;
        uint256 remaining = msg.value - fee;
        //address(this).transfer(fee);
        safeTransferFrom(_from, _to, _tokenId);
    }
}
