const { expect } = require("chai")

describe("Bridge contract", async () => {
    let owner, user1, factory, contract
    let abi = [
        'function createCollectible(string memory _tokenURI public) returns (uint256)'
    ]

    beforeEach(async () => {
        [owner, user1] = await ethers.getSigners()
        factory = await ethers.getContractFactory("Bridge")
        contract = await factory.deploy()
    })

    it("Deployed contract owned by creator", async () => {
        expect(owner.address).to.equal(contract.signer.address)
    })

    it("tokenCounter updates after collectible created", async () => {
        // Connect to the contract with a different `signer`
        const contractInstace = contract.connect(user1)

        // Create a collectible (=mint an NFT)
        let uri = `https://ipfs.io/ipfs/Qm1`
        let collectible = await contractInstace.createCollectible(uri)
        let numTokens = parseInt((await contract.tokenCounter()).toString())
        expect(numTokens).to.equal(1)

        uri = `https://ipfs.io/ipfs/Qm2`
        collectible = await contractInstace.createCollectible(uri)
        numTokens = parseInt((await contract.tokenCounter()).toString())
        expect(numTokens).to.equal(2)

    })
})