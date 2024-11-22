const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

const contractModule = buildModule("contractModule", (m) => {
    const contract = m.contract("SimpleContract");
    
    return { contract };
});

module.exports = contractModule;