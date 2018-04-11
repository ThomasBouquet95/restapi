const jsonFile = require('../node_modules/jsonfile');
var Web3 = require('web3');



NODE = 'http://54.36.61.13:8000'
HOSTNAME = '54.36.61.13'
ETH_ACCOUNT = '0xb2db3d04c7388da2d7023bb585d1b02459b34033'
PASSWORD = "pass"

/*
NODE = 'http://localhost:8545'
ETH_ACCOUNT = '0x3189484fb995895096b626021bf9a6348b94cba4'
HOSTNAME = 'localhost'
PASSWORD = "Password"*/
const provider = new Web3.providers.HttpProvider(NODE);
const web3 = new Web3( provider );

web3.personal.unlockAccount(ETH_ACCOUNT,PASSWORD);



var ConvertLib = artifacts.require("./ConvertLib.sol");
var MetaCoin = artifacts.require("./MetaCoin.sol");
var Asset = artifacts.require("./AMassets.sol");

module.exports = function(deployer) {
  deployer.deploy(ConvertLib);
  deployer.link(ConvertLib, MetaCoin);
  deployer.deploy(MetaCoin);
  deployer.deploy(Asset).then( () => {
    AssetAddress = { address: Asset.address, abi: Asset.abi };
    //console.log(PriceSheetAddress.address);
    jsonFile.writeFile( __dirname + '/../build/contracts/AMassets.meta.json', AssetAddress, {spaces: 2}, ( err ) => {
      if ( err ) {
        console.log( err );
      }
      console.log( 'Wrote AMassets.meta.json!' );
    });
})
};
