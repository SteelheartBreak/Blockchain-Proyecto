const { ethers } = require("hardhat");

async function main() {
    try {
        // Dirección de los contratos desplegados
        const WISEGUARD_ADDRESS = "0xe8CCa6A504EBC4CCB1Bd40ACB9d9082299421343"; // Dirección del contrato WiseGuard
        const CROWDFUNDING_ADDRESS = "0x6b032b9816BBc6d79CeC408405692eA8a182e2Fb"; // Reemplaza con la dirección del contrato Crowdfunding

        // Conectar al contrato WiseGuard
        console.log("Connecting to WiseGuard contract...");
        const wiseGuardContract = await ethers.getContractAt("WiseGuard", WISEGUARD_ADDRESS);

        if (!WISEGUARD_ADDRESS || !wiseGuardContract.address) {
            throw new Error(`Failed to connect to WiseGuard at ${WISEGUARD_ADDRESS}`);
        }
        console.log("Connected to WiseGuard at:", wiseGuardContract.address);

        // Conectar al contrato Crowdfunding
        console.log("Connecting to Crowdfunding contract...");
        const crowdfundingContract = await ethers.getContractAt("Crowdfunding", CROWDFUNDING_ADDRESS);

        if (!CROWDFUNDING_ADDRESS || !crowdfundingContract.address) {
            throw new Error(`Failed to connect to Crowdfunding at ${CROWDFUNDING_ADDRESS}`);
        }
        console.log("Connected to Crowdfunding at:", crowdfundingContract.address);

        // Registrar un inversor tipo 1 o tipo 2
        const investorType = 2; // Cambiar a 1 o 2 según el tipo de inversor
        const investAmount = ethers.utils.parseEther("0.002"); // Monto en ETH

        console.log(`Registering an investor of type ${investorType}...`);
        let investTx;

        if (investorType === 1) {
            // Inversor tipo 1
            investTx = await crowdfundingContract.invest(investAmount, { value: investAmount });
        } else if (investorType === 2) {
            // Inversor tipo 2
            investTx = await crowdfundingContract.invest(investAmount, { value: investAmount });
        } else {
            throw new Error("Invalid investor type. Must be 1 or 2.");
        }

        // Confirmar la transacción de inversión
        console.log("Investment transaction sent:", investTx.hash);
        await investTx.wait();
        console.log("Investor registered successfully!");

        // Reclamar recompensas si es tipo 2
        if (investorType === 2) {
            console.log("Claiming rewards...");
            const claimTx = await crowdfundingContract.claimRewards();
            await claimTx.wait();
            console.log("Rewards claimed successfully!");
        }
    } catch (error) {
        console.error("Error during interaction:", error);
        process.exit(1);
    }
}

main().catch((error) => {
    console.error("Script failed:", error);
    process.exitCode = 1;
});
