import hre from "hardhat";

async function main(){

    const HellFaucet = await hre.ethers.deployContract('tokenFaucet' , ['0xc8B1057EE8B657A22E206Ec89D343c393EB3b3A8']);

    await HellFaucet.waitForDeployment();

    console.log(`The address of the faucet contract is ${HellFaucet.target}`);



}

main().catch((error) => {

    console.error(error);

    process.exit(1);

})


//The address of the faucet contract is 0xC1a1aCD85557CeC872a388Ed80E18bd67e3D0b8A.