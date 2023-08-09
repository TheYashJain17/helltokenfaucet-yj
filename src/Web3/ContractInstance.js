import { ethers } from "ethers";

import ABI from "../Artifacts/contracts/HellTokenFaucet.sol/tokenFaucet.json";

const contractAddress = '0x4244F698B4e0Aa2273279292f8Fd5373eAd894D3';

const abi = ABI.abi;

const ContractInstance = (signer) => {

    return new ethers.Contract(

        contractAddress,
        abi,
        signer

    );

}

export default ContractInstance

