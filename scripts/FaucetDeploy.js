import hre from "hardhat";

async function main(){

    const HellFaucet = await hre.ethers.deployContract('tokenFaucet' , ['0xc8B1057EE8B657A22E206Ec89D343c393EB3b3A8']);

    await HellFaucet.waitForDeployment();

    console.log(`The address of the faucet contract i s${HellFaucet.target}`);



}

main().catch((error) => {

    console.error(error);

    process.exit(1);

})