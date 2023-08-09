import React, { useState } from 'react'

import '../Components/CSS/Modal.css'

import {ethers} from "ethers"; 

import {ToastContainer , toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const Modal = ({contract , account , chainId}) => {

  const [transactionHash , setTransactionHash] = useState("");

  const tokenAddress = '0x137a611E0a689aBD5d5cc6D660A054fe8fe6975d';

  const sendTokens = async() => {

    try {

      setTransactionHash("");

      const EnteredAddress = document.getElementById('address').value;

    if(EnteredAddress && EnteredAddress.length == 42){

      const tokenCost = ethers.parseEther("0.0002");

      const sendingTokens = await contract.requestTokens(EnteredAddress , {value : tokenCost});
      
      console.log(sendingTokens);

      // console.log(sendingTokens.hash);

      setTransactionHash(sendingTokens.hash);

      toast.success("Token Sent Successfully");

    }
    else{

      // alert("Please Enter A Valid Address");

      toast.error("Please Enter A Valid Address");

    }
      
    } catch (error) {

      console.log(error.reason)

      if(error.reason === "Please Wait For 24 Hours Before Requesting Again"){

        //alert("Please Wait For 24 Hours Before Requesting Again");

        toast.error("Please Wait For 24 Hours Before Requesting Again")

      }
      
      
    }

  }

  return (

    <>

    <ToastContainer/>

    {
      transactionHash ? 

      (<div className="modal__contractaddress">Address: {tokenAddress}
      
      <br />
      <br />
      
       Copy And Paste This Address Inside Metamask Import Tokens Section To See The Tokens

      </div>)

      : 

      ("")

    }


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