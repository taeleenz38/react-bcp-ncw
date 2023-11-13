var marketContract = artifacts.require("NFTMarketplace");
var erc20Contract = artifacts.require("erc20Token");

module.exports = async function(deployer) {
  await deployer.deploy(erc20Contract);
  const token = await erc20Contract.deployed();
  await deployer.deploy(marketContract, token.address);
};
