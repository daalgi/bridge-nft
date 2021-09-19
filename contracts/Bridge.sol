// SPDX-License-Identifier: MIT
pragma solidity 0.8.7;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

//ipfs/QmVsDwgPwfGTMA9wv4F79soqyk6DnGfJ6ADgpefsyktRDs/000.gif
contract Bridge is ERC721 {
    uint256 public tokenCounter;

    constructor() ERC721("Bridge", "BRG") {
        tokenCounter = 0;
    }

    function createCollectible() public returns (uint256) {
        uint256 newTokenId = tokenCounter;
        _mint(msg.sender, newTokenId);
        tokenURI(newTokenId);
        tokenCounter = tokenCounter + 1;
        return newTokenId;
    }
}
