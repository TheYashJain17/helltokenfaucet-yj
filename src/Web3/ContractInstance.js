import { ethers } from "ethers";

import ABI from "../Artifacts/contracts/HellTokenFaucet.sol/tokenFaucet.json";

const contractAddress = '0xF99325f33090419759713a37Faf5C3e83fc12Aa3';

const abi = ABI.abi;

const ContractInstance = (signer) => {

    return new ethers.Contract(

        contractAddress,
        abi,
        signer

    );

}

export default ContractInstance

