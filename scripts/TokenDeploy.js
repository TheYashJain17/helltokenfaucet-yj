import hre from 'hardhat';

import { configDotenv } from 'dotenv';

configDotenv();

async function main(){

  const helltoken = await hre.ethers.deployContract("HellToken" , [7200]);

  await helltoken.waitForDeployment();

  console.log(`The address of the token contract is ${helltoken.target}`);

}

main().catch((error) => {

  console.error(error);

  process.exit(1);

})


//The address of the token contract is 0xc8B1057EE8B657A22E206Ec89D343c393EB3b3A8

//The Final address of the token contract is 0x98bA388693D38c856d822BDcC26FA8a3C87b19a2

//The Full and final address of the token contract is 0x137a611E0a689aBD5d5cc6D660A054fe8fe6975d