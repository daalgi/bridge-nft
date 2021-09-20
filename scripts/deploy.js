const OPENSEA_URL = "https://testnets.opensea.io/assets/"
const ETHERSCAN_URL = "https://rinkeby.etherscan.io/address/"

async function main() {
    const [deployer] = await ethers.getSigners()
    console.log("Deploying contracts with the account:", deployer.address)
    console.log("Account balance:", (await deployer.getBalance() * 1e-18).toString(), "ETH")

    const Bridge = await ethers.getContractFactory("Bridge")
    console.log("Deploying Bridge...")
    const b = await Bridge.deploy()
    console.log(`Contract address: ${b.address}\n`)
    console.log(`Transaction in etherscan:\n${ETHERSCAN_URL}${b.address}\n`)

    await b.deployed()
    const uri = `https://ipfs.io/ipfs/QmdLaeQ2qTp4R2cwg6nZK8iaTQJofKN94F3zKZRV7evj8d/0.json`
    b.createCollectible(uri)
    // console.log('Token 0 URI:', (await b.tokenURI(0)))
    console.log(`Check out the NFT in OpenSea:\n${OPENSEA_URL}${b.address}/0\n`)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })