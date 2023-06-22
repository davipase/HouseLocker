var accountVerification = artifacts.require("./accountVerification.sol");
var secp = artifacts.require("./Secp256k1.sol");
var zkp = artifacts.require("./zkp.sol")

module.exports = function(deployer){
    deployer.link(accountVerification, secp);
    deployer.link(accountVerification,zkp)
    deployer.deploy(accountVerification);
};