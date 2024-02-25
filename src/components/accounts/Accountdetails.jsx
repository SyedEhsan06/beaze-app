import React, { useState } from 'react'
import Countryinput from '../countryinput/Countryinput'
import { FaXmark } from 'react-icons/fa6';
import Modal from "react-awesome-modal";

export default function Accountdetails() {
  const [ismodalopen, setismodalopen] = useState(false);
  const closeModal = () => {
    setismodalopen(false);
  };

  return (
    <div className=' w-full bg-white  rounded-[13px]  px-10 py-8 shadow'>
        <div className='w-full'>
        <div className='grid grid-cols-1 gap-y-4 text-lg font-[500]'>
                  <div className="w-full context">
                    <label htmlFor="fnamesignup" className="mb-2">
                      Your First Name
                                        </label>
                    <div className="w-full flex border border-text-secondary shadow-input pl-2 pr-3 rounded-lg ">
                      <div className="w-[100%] ">
                        <input
                          type="text"
                          id="fnamesignup"
                          className="w-full border-none focus:outline-none transition-all duration-100 h-[52px] relative leading-normal checkout-input"
                         value={"Md faiz"}
                         
                        />
                      </div>
                   
                    </div>
                  </div>
                  <div className="w-full context">
                    <label htmlFor="lastnamesingup" className="mb-2">
                      Your Last Name
                     
                    </label>
                    <div className="w-full flex border border-text-secondary shadow-input pl-2 pr-3 rounded-lg">
                      <div className="w-[100%] ">
                        <input
                          type="text"
                          id="lastname"
                          className="w-full border-none focus:outline-none transition-all duration-100 h-[52px] relative leading-normal checkout-input"
                          value="ahmad"
                        
                        />
                      </div>
                   
                    </div>
                  </div>
                  <Countryinput/>
                </div>
               <div className=' mt-14'>
                <button className=' w-[50%] headtext py-1  bg-[#F8B43A] font-[400] text-theme-footer-bg text-[1.4rem] rounded-[21.5px]' onClick={() => setismodalopen(true)}>Edit Details</button>
               </div>
        </div>


        <Modal visible={ismodalopen} effect="fadeInDown" onClickAway={closeModal}>
        <div className="w-[700px] px-5 pt-3 pb-5">
          <div className=" flex ">
            <button className="ml-auto" onClick={() => setismodalopen(false)}>
              <FaXmark size={40} />
            </button>
          </div>

          <div className="my-4">
            <h6 className="context font-[900] text-[2.5rem] text-center">
              Enter OTP
            </h6>

            <div>{/* otp box comes here */}</div>
          </div>

          <div className=" grid grid-cols-2 gap-x-4 headtext py-2 mt-6">
            <button className=" w-full  text-[#474747] font-[300] text-lg py-2 rounded border-[0.3px] border-[#000000] ">
              Change Number
            </button>
            <button className=" w-full bg-theme-footer-bg text-white font-[700] text-xl py-2 rounded ">
              Confirm OTP
            </button>
          </div>
        </div>
      </Modal>
    </div>
  ) 
}
