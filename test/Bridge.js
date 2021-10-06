const { expect } = require("chai");
const { ethers } = require("hardhat");

// describe("Greeter", function () {
//   it("Should return the new greeting once it's changed", async function () {
//     const Greeter = await ethers.getContractFactory("Greeter");
//     const greeter = await Greeter.deploy("Hello, world!");
//     await greeter.deployed();

//     expect(await greeter.greet()).to.equal("Hello, world!");

//     const setGreetingTx = await greeter.setGreeting("Hola, mundo!");

//     // wait until the transaction is mined
//     await setGreetingTx.wait();

//     expect(await greeter.greet()).to.equal("Hola, mundo!");
//   });
// });

describe("Bridge contract", async () => {
    let owner, user1, factory, contract, numTokens
    let baseTokenURI = ""

    const PRICE = 0.07
    const NFT_MAX = 10
    let nftCurrentMax = 5
    const USER_INITIAL_BALANCE = 1000

    beforeEach(async () => {
        [owner, user1, user2] = await ethers.getSigners()
        factory = await ethers.getContractFactory("BridgeNFT")
        contract = await factory.deploy(baseTokenURI, nftCurrentMax)
    })

    it("Correctly initializes the constructor variables", async () => {
        // expect(await contract._baseTokenURI()).to.equal(baseTokenURI)
        expect(await contract.nftCurrentMax()).to.equal(nftCurrentMax)
    })

    it("Deployed contract owned by creator", async () => {
        expect(owner.address).to.equal(contract.signer.address)
    })

    it("totalSupply equals 0 before minting", async () => {
        expect((await contract.tokenCounter()).toNumber()).to.equal(0)
    })

    describe("buy()", async() => {

        it("throws an error if the sale is closed", async() => {
            const instance = contract.connect(user1)
            
            await expect(instance.buy(1, {
                value: hre.ethers.utils.parseEther(PRICE.toString())
            })).to.be.revertedWith("Sale closed")

        })

        it("throws an error if the value sent is less than the set price", async() => {
            await contract.setSaleOpen(true);

            const instance = contract.connect(user1)
            
            numTokens = 1
            await expect(instance.buy(numTokens, {
                value: hre.ethers.utils.parseEther('0.05')
            })).to.be.revertedWith("Insufficient ETH")
            
            numTokens = 2
            await expect(instance.buy(numTokens, {
                value: hre.ethers.utils.parseEther('0.07')
            })).to.be.revertedWith("Insufficient ETH")
            
        })

        it("throws an error if the numTokens is greater than the limit", async() => {
            await contract.setSaleOpen(true);

            const instance = contract.connect(user1)
            
            numTokens = 6
            await expect(instance.buy(numTokens, {
                value: hre.ethers.utils.parseEther((PRICE * numTokens).toString())
            })).to.be.revertedWith("Exceeded maximum purchase")

        })

        it("throws an error if there are not enough available tokens", async() => {
            await contract.setSaleOpen(true);

            let instance = contract.connect(user1)
            
            numTokens = 5
            await instance.buy(numTokens, {
                value: hre.ethers.utils.parseEther((PRICE * numTokens).toString())
            })
            let currentSupply = await instance.tokenCounter() // BigNumber
            currentSupply = currentSupply.toNumber() // Javascript Number
            await expect(currentSupply).to.equal(numTokens)

            instance = contract.connect(user2)
            numTokens = 2
            await expect(instance.buy(numTokens, {
                value: hre.ethers.utils.parseEther((PRICE * numTokens).toString())
            })).to.be.revertedWith("Not enough tokens available")

        })

        it("contract balance updated when tokens successfully minted", async() => {
            await contract.setSaleOpen(true);

            const instance = contract.connect(user1)
            
            numTokens = 1
            await instance.buy(numTokens, {
                value: hre.ethers.utils.parseEther((PRICE * numTokens).toString())
            })

            let balance = await contract.provider.getBalance(contract.address)
            balance = ethers.utils.formatEther(balance)
            expect(balance).to.equal("0.07")

            numTokens = 3
            await instance.buy(numTokens, {
                value: hre.ethers.utils.parseEther((PRICE * numTokens).toString())
            })

            balance = await contract.provider.getBalance(contract.address)
            balance = ethers.utils.formatEther(balance)
            expect(parseFloat(balance)).to.closeTo(0.28, 1e-15)

        })
    })

})