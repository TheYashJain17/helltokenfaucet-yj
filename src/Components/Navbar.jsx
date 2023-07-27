import React, { useEffect, useState } from 'react'

import {ethers} from 'ethers';

import './CSS/Navbar.css'

import contractInstance from '../Web3/ContractInstance';

import Modal from '../Components/Modal'

const Navbar = () => {

  const {ethereum} = window;

  const [account , setAccount] = useState(null);
  
  const [contract , setContract] = useState();

  const [chainId , setChainId] = useState(true);

  const connectWallet = async() => {

    if(ethereum){

      const accounts = await window.ethereum.request({method : "eth_requestAccounts"});

      setAccount(accounts[0]);

    }
    else{

      alert("Please Install Metamask");

    }

  }

  const getConnectedAccounts = async() => {

    if(typeof window != "undefined" && typeof ethereum != "undefined"){

      const connectedAccounts = await window.ethereum.request({method : "eth_accounts"});
      
      if(connectedAccounts.length > 0){

        setAccount(connectedAccounts[0]);
        
      }
      else{

        // alert("Please Connect To Metamask With Connect Wallet Button To Proceed Further");
  
      }

    }
    
  }


  const setContractInstance = async() =>{

    if(typeof ethereum != "undefined" && account != null){
      
      const provider =  new ethers.BrowserProvider(ethereum)

      const signer = await provider.getSigner();

      const contractWithSginer = contractInstance(signer);
  
      setContract(contractWithSginer);

      console.log(contractWithSginer);

      // console.log(contract);
  
  }
}

const checkOnchanges = () => {

    window.ethereum.on("accountsChanged" , (accounts) => {
      
      setAccount(accounts[0]);

      window.location.reload();


    })

    window.ethereum.on("chainChanged" , (chainId) => {

      if(chainId != '0x13881' && account != null){

        alert("Please Move to mumbai polygon network");

        setChainId(false);

      }
      else{

        window.location.reload();

      }

    })

}

const checkChainid = async() => {

  try {
  
    const chainId = await window.ethereum.request({method : "eth_chainId"});

    const polygonChainId = '0x13881';

    if(chainId != polygonChainId){

      setChainId(false);

    }

  } catch (error) {

    console.log(error);
    
}

}

const changeToMumbaiNetwork = async() => {

  const polygonChainId = '0x13881';

  try {

    await window.ethereum.request({

      method : "wallet_switchEthereumChain",
      params : [{chainId : polygonChainId}]

    })

    setChainId(true);
    
  } catch (error) {

    console.log(error);
    
  }

}

  

  useEffect(() => {

    getConnectedAccounts();

    checkOnchanges();

    account && checkChainid();

    setContractInstance();

  } , [account])
 
  return (

    <>

    <nav>

    <div className="nav">

    <div className="nav__title">Hell Token (HT)</div>

  
  {
    !chainId ? 

    (<button className="nav__changenetwork" onClick={changeToMumbaiNetwork}>Change Network</button>)

    :

    ("")

  }


    {

    account ? (<button className="nav__connectbtn" >

      {account.slice(0,6) + "..." + account.slice(39)}

    </button>)

    :

      (<button className="nav__connectbtn" onClick={connectWallet}>Connect Wallet</button>)

    }


    
    </div>

    </nav>
    
    <Modal

    contract={contract}
    account={account}

    />
  
    </>



    )

}

export default Navbar