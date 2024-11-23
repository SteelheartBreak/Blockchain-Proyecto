const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("WiseGuardDeployment", (m) => {
    const wiseGuard = m.contract("WiseGuard");
    return { wiseGuard };
});