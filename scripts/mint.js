const { ethers } = require("hardhat");

async function main() {
    // Dirección de tu contrato desplegado
    const CONTRACT_ADDRESS = "0xe8CCa6A504EBC4CCB1Bd40ACB9d9082299421343";
    
    // Obtener el contrato
    const WiseGuard = await ethers.getContractFactory("WiseGuard");
    const wiseGuard = await WiseGuard.attach(CONTRACT_ADDRESS);
    
    try {
        console.log("Obteniendo la dirección del propietario...");
        const owner = await wiseGuard.owner();
        console.log("Propietario del contrato:", owner);
        
        console.log("\nMinteando nuevo NFT...");
        const tx = await wiseGuard.safeMint();
        console.log("Esperando confirmación de la transacción...");
        const receipt = await tx.wait();
        
        console.log("\nNFT minteado exitosamente!");
        console.log("Hash de la transacción:", receipt.hash);
        
        // Obtener el último token minteado usando un filtro de eventos
        const filter = wiseGuard.filters.Transfer(null, owner, null);
        const events = await wiseGuard.queryFilter(filter, receipt.blockNumber, receipt.blockNumber);
        
        if (events.length > 0) {
            const tokenId = events[events.length - 1].args.tokenId;
            console.log(`\nToken ID: ${tokenId}`);
            console.log(`\nPuedes ver tu NFT en:`);
            console.log(`https://testnets.opensea.io/assets/sepolia/${CONTRACT_ADDRESS}/${tokenId}`);
        }
        
    } catch (error) {
        if (error.message.includes("Ownable: caller is not the owner")) {
            console.error("\nError: Solo el propietario puede mintear NFTs.");
            console.error("Asegúrate de estar usando la wallet correcta.");
        } else {
            console.error("\nError durante el minteo:", error.message);
            console.error("Error completo:", error);
        }
    }
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });