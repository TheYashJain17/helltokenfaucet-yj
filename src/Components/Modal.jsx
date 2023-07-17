import React from 'react'

import '../Components/CSS/Modal.css'

const Modal = () => {

  return (

    <>

        <div className="modal__title">

        <h1>FAUCET</h1> 

        </div>


        <div className="modal__secondtitle">

        <h4>Fast And Reliable. 1 HT/Day</h4>

        </div>

        <div className="modal__space">

        <input className='modal__input' type="text" placeholder='Enter Your Address(0x0...)' />

        </div>

        <button className="modal__button">Send Tokens</button>

        <div className="modal__anotherspace">Transaction Data</div>

        <input type="text" className="modal__anotherinput" placeholder='Transaction Hash' />

    </>

  )

}

export default Modal