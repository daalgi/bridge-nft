async function main() {
    const Bridge = await ethers.getContractFactory("Bridge")
    console.log("Deploying Bridge...")
    const b = await Bridge.deploy()
    await b.deployed()
    console.log('Bridge deployed to:', b.address)
    const uri = `https://ipfs.io/ipfs/${QmUb5EGaUr5rq6pdK7foQSH988BMzB8miNLh7PXNJUhRT5}`
    // b.createCollectible(uri)
}

main()
    .then(() => process.exit(0))
    .catch(error => {
        console.error(error)
        process.exit(1)
    })