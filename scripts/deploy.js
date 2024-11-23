const { ethers } = require("hardhat");

async function main() {
    // Dirección del contrato WiseGuard ya desplegado
    const WISEGUARD_ADDRESS = "0xe8CCa6A504EBC4CCB1Bd40ACB9d9082299421343";

    console.log("Using existing WiseGuard contract at address:", WISEGUARD_ADDRESS);

    // Usa ethers.getContractAt para obtener una instancia del contrato desplegado
    const WiseGuard = await ethers.getContractAt("WiseGuard", WISEGUARD_ADDRESS);
    console.log("WiseGuard initialized at:", WiseGuard.address);

    // Despliega el contrato Crowdfunding usando la dirección del contrato WiseGuard
    console.log("Deploying Crowdfunding...");
    const Crowdfunding = await ethers.getContractFactory("Crowdfunding");
    const crowdfundingInstance = await Crowdfunding.deploy(WISEGUARD_ADDRESS);

    // Registra la dirección del contrato desplegado
    console.log("Crowdfunding deployed to:", crowdfundingInstance.target);
}

// Manejo de errores
main().catch((error) => {
    console.error("Error during deployment:", error);
    process.exitCode = 1;
});
