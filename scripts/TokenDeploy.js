const hre = require('hardhat');

async function main(){

  const helltoken = await hre.ethers.deployContract('HellToken');

  await helltoken.waitForDeployment();

  console.log(`The address of the token contract is ${helltoken.target}`);

}

main().catch((error) => {

  console.error(error);

  process.exit(1);

})