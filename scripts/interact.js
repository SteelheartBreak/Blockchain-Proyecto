const hre = require("hardhat");

async function main() {
    try {
        const SimpleContractFactory = await hre.ethers.getContractFactory("SimpleContract");
        const contractAddress = "0xEC45869d1aFCC59ADBde3a4D63E23e4B7f78490b";
        const contractJS = await SimpleContractFactory.attach(contractAddress);
        
        const data = await contractJS.getData();
        console.log("The data of the contract is:", data);
        
        const operand=13;
        
        const dataOperated = await contractJS.accumulateData(operand);
        dataOperated.wait(1);
        
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
}

main()