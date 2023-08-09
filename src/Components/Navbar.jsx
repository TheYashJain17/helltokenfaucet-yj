import React, { useEffect, useState } from 'react'

import {ethers} from 'ethers';

import './CSS/Navbar.css'

import {ToastContainer , toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import contractInstance from '../Web3/ContractInstance';

import Modal from '../Components/Modal'

const Navbar = () => {

  const {ethereum} = window;

  const [account , setAccount] = useState(null);
  
  const [contract , setContract] = useState();

  const [chainId , setChainId] = useState(true);

  const [owner , setOwner] = useState(false);

  const ownerAddress = "0x56bf2ba76b11c1350C50B559C5177C09Eec9cfC3";

  const connectWallet = async() => {

    if(ethereum){

      const accounts = await window.ethereum.request({method : "eth_requestAccounts"});

      setAccount(accounts[0]);

    }
    else{

      // alert("Please Install Metamask");

      toast.warn('Please Install Metamask');

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

        toast.warn("Please Connect To Metamask With Connect Wallet Button To Proceed Further");
  
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

const checkOnChanges = () => {

    window.ethereum.on("accountsChanged" , (accounts) => {
      
      setAccount(accounts[0]);

      window.location.reload();


    })

    window.ethereum.on("chainChanged" , (chainId) => {

      if(chainId != '0x13881' && account != null){

        // alert("Please Move to mumbai polygon network");

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

const transferFunds = async() => {

  try {
      
      const transferedFunds = await contract.transferFunds();
      
      console.log(transferedFunds)
      
      // console.log("Funds transferred successfully");

      toast.success('Funds transferred successfully');
      
      setOwner(false);

    
  } catch (error) {

    if(error.reason == "There is 0 Balance In The Contract"){

      //  alert("There is no balance in the contract");

       toast.error("There is no balance in the contract");

    }
    
  }

  

}

const checkOwner = (receievedAccount) => {

  try {

    if(Number(receievedAccount) === Number(ownerAddress)){

      // alert("Welcome Mr Yash Jain");

      toast.success("Welcome Mr Yash Jain")

      setOwner(true);
  
    }else{
  
    setOwner(false)
  
    }
    
  } catch (error) {

    console.log(error);
    
  }


}


  useEffect(() => {

    getConnectedAccounts();

    checkOnChanges();

    account && checkChainid();

    account && checkOwner(account);

    setContractInstance();

  } , [account])
 
  return (

    <>

    <nav>

    <div className="nav">

    <div className="nav__title">Hell Token (HT)</div>

    <ToastContainer/>

  
  {
    !chainId ? 

    (<button className="nav__changenetwork" onClick={changeToMumbaiNetwork}>Change Network</button>)

    :

    ("")

  }

  { owner  ?

    (<button className="nav__onlyOwner" onClick={transferFunds}>Transfer Funds</button>)

    :

    ("")

  }



    {

    account ? (<button className="nav__connectbtn" disabled={account} >

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
    chainId={chainId}
    checkChainid={checkChainid}
    checkOnChanges={checkOnChanges}

    />
  
    </>



    )

}

export default Navbar