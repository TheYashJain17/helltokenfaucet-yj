import hre from "hardhat";

async function main(){

    const HellFaucet = await hre.ethers.deployContract('tokenFaucet' , ['0x137a611E0a689aBD5d5cc6D660A054fe8fe6975d']);

    await HellFaucet.waitForDeployment();

    console.log(`The address of the faucet contract is ${HellFaucet.target}`);



}

main().catch((error) => {

    console.error(error);

    process.exit(1);

})


//The address of the faucet contract is 0xC1a1aCD85557CeC872a388Ed80E18bd67e3D0b8A.

//The Final address of the faucet contract is 0xF99325f33090419759713a37Faf5C3e83fc12Aa3

//The Full And Final address of the faucet contract is 0x2AA4Ee02c3e58AdAF6228610188Ff3f1585589ce

//The Last Full And Final address of the faucet contract is 0x12E9215e14d0bAB1ce3C40eEA2798B7777AE06f5

//The Last Full And Final address of the faucet contract is 0x4244F698B4e0Aa2273279292f8Fd5373eAd894D3
