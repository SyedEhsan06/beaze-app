"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectCart } from "@/redux/slices/cartSlice";
import PaymentComponent from "./paymentComponent";
// import PaymentComponent from "./paymentComponent";

export default function Productshow({ buttonevent, cartData,orderId,ischeckoutset }) {
  const [showPayment, setShowPayment] = useState(false); // State to control visibility of PaymentComponent
  const cart = useSelector(selectCart);
  console.log(cart);
  const totalPrice = cart.reduce((total, item) => {
    const itemPrice = item.originalprice * item.selectedQty; // Calculate item price
    const itemTax = item.tax * item.selectedQty; // Calculate item tax
    return total + itemPrice + itemTax; // Accumulate total price
  }, 0);

console.log(totalPrice)
  const makePayment = () => {
    setShowPayment(true); // Show PaymentComponent when button is clicked
  };

  return (
    <div className="max-h-[70vh] lg:min-h-[75vh] overflow-y-auto w-full bg-white shadow-sm border lg:relative">
      <div className="grid grid-cols-1 gap-y-3 lg:px-10 lg:py-8 md:px-8 px-4 md:py-6 py-5">
        {cart.map((items, index) => (
          <div className="w-full flex gap-3" key={index}>
            <div className="w-[35%]">
              <div className="w-full h-[130px] relative mb-3 rounded-[7px]">
                <Image
                  src={items.images[0]}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-[7px] transition-all duration-300"
                />
              </div>
            </div>
            <div className="w-[60%] context flex flex-col pb-3 mt-3">
              <h5 className="text-lg font-[500] leading-4">{items.title}</h5>
              <p className="text-[1rem] text-text-secondary font-[300]">
                Size : {items.size} | Colour : {items.color}
              </p>
              <p className="text-[1rem] text-text-secondary font-[300]">
                Qty : {items.selectedQty}
              </p>
              <p className="text-[1rem] font-[500] mt-1">
                INR {
                  parseFloat(
                    (items.originalprice * items.selectedQty)+items.tax*items.selectedQty).toFixed(2
                  )
                }
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Render PaymentComponent conditionally */}
      {showPayment && <PaymentComponent makePaymentClick={
        makePayment
      }
      data={cart}
      amount = {totalPrice}
      orderId = {orderId}
      />}

      <button disabled= {ischeckoutset ? false  : true}
        className={`w-full  ${cart.length >=3 ? 'lg:sticky' : 'lg:absolute'}  fixed bottom-0 left-0 headtext  text-white font-extrabold text-[1.5rem] py-2  ${ischeckoutset ? ' bg-theme-footer-bg' : 'bg-[#A5A0A8]'}`}
        onClick={makePayment}
      >
        Continue to Payment
      </button>
    </div>
  );
}
