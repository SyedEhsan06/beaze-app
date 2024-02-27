"use client"
import React, { useState,useEffect } from 'react'
import Link from 'next/link';


export default function Invoice() {
    const [pdfContent, setPdfContent] = useState('');

  useEffect(() => {
    // Ensure the code runs only in the browser environment
    if (typeof window !== 'undefined') {
      import('html2pdf.js').then((html2pdf) => {
        window.html2pdf = html2pdf.default;
      });
    }
  }, []);

  const generatePdf = () => {
    const content = document.getElementById('contentToConvert');

    if (!content) {
      console.error('Element with id contentToConvert not found.');
      return;
    }

    setPdfContent(content.innerHTML);

    if (typeof window !== 'undefined' && window.html2pdf) {
      window.html2pdf(content, {
        margin: 10,
        filename: 'Beazeinvoice-pdf',
        image: { type: 'jpeg', quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' },
        callback: function (pdf) {
          pdf.save();
        },
      });
    }
  };


  return (
    
    <div className= ' lg:px-40 py-8 px-5 bg-gray-50'>
<div>
    <div className='w-full'>
        <div className='w-full lg:flex justify-center'>
        <div className='lg:w-[80%] lg:flex gap-x-4 items-center'>
          <div className='lg:w-[30%]'>
            <img src="/images/web/invoice.png" className='w-[50%] md:w-[20%] lg:w-[100%] mx-auto'  alt="" />
          </div>

          <div className='lg:w-[70%] mt-3 lg:mt-0 '>
            <div className='lg:ml-8 text-text-secondary font-[900] lg:text-[2.4rem] md:text-[2rem] text-[1.5rem] headtext lg:leading-[3rem] md:leading-[2.4rem] leading-[1.8rem]'>
                <h4 className='text-center lg:text-left'>Congratulations !<br/> Order Placed Successfully</h4>
            </div>

            <div className='w-full grid grid-cols-2 gap-x-3 mt-4'>
            <button className='h-[50px] rounded w-full border border-theme-footer-bg text-text-secondary font-[800] headtext lg:text-[1.4rem] md:text-xl text-[1rem]' onClick={generatePdf}>Download Invoice</button>
            <button className='h-[50px] rounded w-full border border-transparent bg-theme-footer-bg font-[800] text-white headtext lg:text-[1.4rem] md:text-xl  text-[1rem] '>
            <Link href={'/products'}>   Continue Shopping </Link>
          </button>
            </div>
          </div>
        </div>
        </div>

        <div className='w-full mt-4 bg-white  rounded-[29px] shadow-md lg:p-10 md:p-8 p-5' id='contentToConvert'>
            <div className='lg:flex context gap-x-16  text-lg font-[500] text-text-secondary'>
                <div className='lg:w-[50%]'>
              <div className=''>
              <p className='my-2 text-[1.4rem]'>Order #7834546</p>    
               <p className='my-2'>5th August, 2023</p> 
               <p className='my-2'>Shipping to : Patna bihar</p> 
               <p className='my-2'>Sherlock Holmes, +9198202020</p> 
               <p className='my-2 leading-[1.2rem]'>22B Baker Street <br />Maharashtra India</p> 
              </div>


              <div className='mt-8'>
              <p className='my-2'>Order Total : Rs. 5413</p> 
              <p className='my-2'>Estimated Delivery Date : 25th August, Wednesday</p>
              <p className='mt-4 leading-[25px]'>
              Your order will be dispatched by 6th August and you can track your order after that by logging in through your account, if you have an account with us 
              </p>
              </div>
                </div>



                <div className='lg:w-[50%] '>
                   <div>
                   <p className='my-2 leading-[1.2rem]'>Black Lace Top * 1 <br />Size : M, Colour: Blacka</p> 
                   <p className='my-2 leading-[1.2rem]'>Black Lace Top * 1 <br />Size : M, Colour: Blacka</p> 
                   <p className='my-2 leading-[1.2rem]'>Black Lace Top * 1 <br />Size : M, Colour: Blacka</p> 
                   <p className='my-2 leading-[1.2rem]'>Black Lace Top * 1 <br />Size : M, Colour: Blacka</p> 
                   </div>



                   <div className='w-full   py-4 px-8 bg-[#F5F2F2] rounded-[29px] text-black mt-5'>
                <div className=' grid grid-cols-2 my-2'>
                    <span className='font-[400]'>Total</span>
                    <span className='font-[400] text-right'>INR 546.06</span>
                </div>
                <div className=' grid grid-cols-2 my-2'>
                    <span className='font-[400]'>Discount</span>
                    <span className='font-[400] text-right'>INR 0</span>
                </div>

                <div className=' grid grid-cols-2 my-2'>
                    <span className='font-[400]'>Taxes and Charges</span>
                    <span className='font-[400] text-right'>INR 246.06</span>
                </div>

                <div className=' grid grid-cols-2 my-2'>
                    <span className='font-[500]'>Subtotal</span>
                    <span className='font-[400] text-right'>INR 246.06</span>
                </div>
                   </div>
                </div>
            </div>
        </div>
    </div>
</div>
    </div>
  )
}
