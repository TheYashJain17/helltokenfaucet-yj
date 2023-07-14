require("@nomicfoundation/hardhat-toolbox");

require('dotenv').config();

const polygonUrl = process.env.POLYGON_URL;

const account = process.env.PRIVATE_KEY;


module.exports = {
  
  solidity: "0.8.17",

  networks : {

    mumbai : {

      url : `${polygonUrl}`,
      accounts : [account]

    }

  },

  paths : {

    artifacts : "./src/FaucetArtifacts"

  }

};
