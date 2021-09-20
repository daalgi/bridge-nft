require('@nomiclabs/hardhat-ethers')
const dotenv = require('dotenv')
dotenv.config()

module.exports = {
  // solidity: "0.8.7",
  solidity: "0.6.6",
  networks: {
    rinkeby: {
      url: `https://rinkeby.infura.io/v3/${process.env.WEB3_INFURA_PROJECT_ID}`,
      accounts: [`0x${process.env.PRIVATE_KEY}`]
    }
  }
};
