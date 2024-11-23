const { ethers } = require("hardhat");

async function main() {
    const WiseGuard = await ethers.getContractFactory("WiseGuard");
    const Crowdfunding = await ethers.getContractFactory("Crowdfunding");

    const wiseGuardInstance = await WiseGuard.deploy();
    await wiseGuardInstance.deployed();
    console.log("WiseGuard deployed to:", wiseGuardInstance.address);

    const crowdfundingInstance = await Crowdfunding.deploy(wiseGuardInstance.address);
    await crowdfundingInstance.deployed();
    console.log("Crowdfunding deployed to:", crowdfundingInstance.address);
}

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
