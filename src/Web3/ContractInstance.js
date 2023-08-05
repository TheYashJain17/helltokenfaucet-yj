import { ethers } from "ethers";

import ABI from "../Artifacts/contracts/HellTokenFaucet.sol/tokenFaucet.json";

const contractAddress = '0x12E9215e14d0bAB1ce3C40eEA2798B7777AE06f5';

const abi = ABI.abi;

const ContractInstance = (signer) => {

    return new ethers.Contract(

        contractAddress,
        abi,
        signer

    );

}

export default ContractInstance

