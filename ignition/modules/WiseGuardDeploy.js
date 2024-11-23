const { ethers, deployments, getNamedAccounts } = require("hardhat");

module.exports = async ({ getNamedAccounts, deployments }) => {
  const { deploy } = deployments;
  const { deployer } = await getNamedAccounts(); // Obtener el 'deployer' desde los accounts nombrados

  console.log("Deploying contracts with the account:", deployer);

  // Desplegar el contrato WiseGuard
  const wiseGuard = await deploy("WiseGuard", {
    from: deployer, // Desde la cuenta del deployer
    args: [], // Aquí puedes pasar los argumentos para el constructor del contrato si los tienes
    log: true, // Esto imprimirá información en la consola de Hardhat
  });

  console.log("WiseGuard contract deployed to:", wiseGuard.address);
};

module.exports.tags = ["WiseGuard"];
