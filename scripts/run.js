const dotevn = require("dotenv")
dotevn.config()

const main = async () => {
    const nftContractFactory = await hre.ethers.getContractFactory("BridgeNFT")
    // const nftContractFactory = await hre.ethers.getContractFactory("NotMyEpicNFT")
    const baseTokenURI = ""
    const nftContract = await nftContractFactory.deploy(baseTokenURI)
    await nftContract.deployed()
    console.log("Contract deployed to:", nftContract.address)

    // console.log(await nftContract._NEXT_SALE_START())
    let txn = await nftContract.buy(2, { 
        value: hre.ethers.utils.parseEther('0.07')
    })
    await txn.wait()

    // let txn = await nftContract.makeAnEpicNFT({
    //     value: hre.ethers.utils.parseEther('0.07')
    // })
    // await txn.wait()
    // console.log("NFT minted")

    // txn = await nftContract.makeAnEpicNFT()
    // await txn.wait()
    // console.log("NFT minted")
    
    // txn = await nftContract.makeAnEpicNFT()
    // await txn.wait()
    // console.log("NFT minted")

}

const runMain = async () => {
    try {
        await main()
        process.exit(0)
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

runMain()