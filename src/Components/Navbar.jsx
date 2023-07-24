import React, { useEffect, useState } from 'react'

import './CSS/Navbar.css'

import contractInstance from '../Web3/ContractInstance';

const Navbar = () => {

  const {ethereum} = window;

  const [account , setAccount] = useState(null);

  const [signer , setSigner] = useState(null);
  
  const [contract , setContract] = useState();
f
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

  
  
  useEffect(() => {

    getConnectedAccounts();



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
  
    </>

    )

}

export default Navbar