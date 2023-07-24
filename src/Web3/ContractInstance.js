import { ethers } from "ethers";

import ABI from "../Artifacts/contracts/HellTokenFaucet.sol/tokenFaucet.json";

const contractAddress = '0xC1a1aCD85557CeC872a388Ed80E18bd67e3D0b8A';

const abi = ABI.abi;

const ContractInstance = (signer) => {

    return new ethers.Contract(

        contractAddress,
        abi,
        signer

    );

}

export default ContractInstance

