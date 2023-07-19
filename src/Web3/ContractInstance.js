import  ethers  from "ethers";

import ABI from "../Artifacts/contracts/HellTokenFaucet.sol";

const contractAddress = '0xC1a1aCD85557CeC872a388Ed80E18bd67e3D0b8A';

const contractInstance = (signer) => {

    return new ethers.Contract(

        contractAddress,
        ABI,
        signer

    );

}

export default contractInstance