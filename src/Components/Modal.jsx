import React, { useState } from 'react'

import '../Components/CSS/Modal.css'

import {ethers} from "ethers"; 

import {ToastContainer , toast} from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

import polygon from '../Images/polygon.svg';

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

      console.log(sendingTokens.hash);

      setTransactionHash(sendingTokens.hash);

      console.log(`This is our transaction hash${transactionHash}`)

      toast.success("Token Transferred Successfully");

    }
    else{

      toast.error("Please Enter A Valid Address");

    }
      
    } catch (error) {

      console.log(error.reason)

      if(error.reason === "Please Wait For 24 Hours Before Requesting Again"){

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

          <div className="modal__anotherinput">

          <div className="modal__transactionhash" >

            { 
              
              transactionHash ? 

              <img src={polygon} alt="polygonscan" />

              :

              ""

            }

            
            <a href={`https://mumbai.polygonscan.com/tx/${transactionHash}`} target='_blank'>

            {transactionHash ? transactionHash : ""}

            </a>

            </div>

          </div>

      </div>)

      :

      <div className='modal_networkerror'>Please Change Your Network To Mumbai Polygon With Change Network Button To Get The Tokens</div>
        
      }

    </>

  )

}

export default Modal