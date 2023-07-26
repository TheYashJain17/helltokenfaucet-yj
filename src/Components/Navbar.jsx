import React, { useEffect, useState } from 'react'

import {ethers} from 'ethers';

import './CSS/Navbar.css'

import contractInstance from '../Web3/ContractInstance';

import Modal from '../Components/Modal'

const Navbar = () => {

  const {ethereum} = window;

  const [account , setAccount] = useState(null);

  const [signer , setSigner] = useState(null);
  
  const [contract , setContract] = useState();

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

        // alert("Please Connect To Metamask With Connect Wallet Button");
  
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

      if(chainId != '0x13881'){

        alert("Please Move To Mumbai Polygon Network");

      }
      else{

        window.location.reload();

      }

    })

}
  

  useEffect(() => {

    getConnectedAccounts();

    checkOnchanges();

    setContractInstance();

  } , [account])
 
  return (

    <>

    <nav>

    <div className="nav">

    <div className="nav__title">Hell Token (HT)</div>

    <button className="nav__changenetwork">Change Network</button>
    

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