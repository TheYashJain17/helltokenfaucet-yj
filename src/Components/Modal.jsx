import React, { useEffect, useState } from 'react'

import '../Components/CSS/Modal.css'

import {ethers} from "ethers"; 


const Modal = ({contract , account , chainId}) => {

  const [transactionHash , setTransactionHash] = useState("");

  const sendTokens = async() => {

    setTransactionHash("");

    const EnteredAddress = document.getElementById('address').value;

    if(EnteredAddress && EnteredAddress.length == 42){

      const tokenCost = ethers.parseEther("0.0002");

      const sendingTokens = await contract.requestTokens(EnteredAddress , {value : tokenCost});
      
      console.log(sendingTokens);

      // console.log(sendingTokens.hash);

      setTransactionHash(sendingTokens.hash);

    }
    else{

      alert("Please Enter A Valid Address");

    }

  }



  return (

    <>


        <div className="modal__title">

        <h1>FAUCET</h1> 

        </div>


        <div className="modal__secondtitle">

        <h4>Fast And Reliable. 1 HT/Day</h4>

        </div>

        {

          chainId ?
          
        (<div>

          
        <div className="modal__space">

        <input className='modal__input' type="text" id='address' placeholder='Enter Your Address(0x...)' />

        </div>

        

        <button className="modal__button" onClick={sendTokens} disabled={!account}>Send Tokens</button>

        <div className="modal__anotherspace">Transaction Data</div>

        <input  className="modal__anotherinput" placeholder='Transaction Hash'
         value={transactionHash ? transactionHash : ""} readOnly/>

      </div>)

      :

      <div className='modal_networkerror'>Please Change Your Network To Mumabi Polygon With Change Network Button To Get The Tokens</div>
        
      }

    </>

  )

}

export default Modal