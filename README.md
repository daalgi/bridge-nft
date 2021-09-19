# BRIDGE-NFT
Demo project to play around with smart contracts and nfts.

What's needed:
- node
- npm
- hardhat (compile, test, and deploy smart contracts)
- Open Zeppelin (smart contracts)
- ethers (A complete Ethereum wallet implementation and utilities in JavaScript)
- hardhat-ethers plugin

```
mkdir nft-bridge
cd nft-bridge
npm init -y
npm install @openzeppelin/contracts
npm install --save-dev hardhat @nomiclabs/hardhat-ethers ethers
```

Configuring the compiler `hardhat.config.js`:
```
require('@nomiclabs/hardhat-ethers');
module.exports = {
  solidity: "0.7.1",
};
```

Compile:
```
npx hardhat compile
```

Hardhat comes with a local blockchain built-in, which can be started:
```
npx hardhat node
```

Deploy contracts to the local blockchain:
```
npx hardhat run --network localhost scripts/deploy.js
```

Interacting from the console:
```
npx hardhat console --network localhost
```