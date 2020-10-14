var contract = artifacts.require("Election.sol")

module.exports = function(deployer){
    deployer.deploy(contract);
}