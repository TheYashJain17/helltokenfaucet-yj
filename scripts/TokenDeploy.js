import hre from 'hardhat';

import { configDotenv } from 'dotenv';

configDotenv();

async function main(){

  const helltoken = await hre.ethers.deployContract("HellToken" , [100]);

  await helltoken.waitForDeployment();

  console.log(`The address of the token contract is ${helltoken.target}`);

}

main().catch((error) => {

  console.error(error);

  process.exit(1);

})

//The address of the token contract is 0xc8B1057EE8B657A22E206Ec89D343c393EB3b3A8