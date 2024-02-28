"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { selectCart } from "@/redux/slices/cartSlice";
import PaymentComponent from "./paymentComponent";

export default function Productshow({ buttonevent, cartData }) {
  const [showPayment, setShowPayment] = useState(false); // State to control visibility of PaymentComponent
  const cart = useSelector(selectCart);
  console.log(cart);
  const totalPrice = cart.reduce((acc, item) => {
    const itemPrice = parseFloat(item.price);
    return !isNaN(itemPrice) ? acc + itemPrice : acc;
  }, 0);

  const makePayment = () => {
    setShowPayment(true); // Show PaymentComponent when button is clicked
  };

  return (
    <div className="h-[80vh] overflow-y-auto w-full bg-white shadow-sm border lg:relative">
      <div className="grid grid-cols-1 gap-y-3 px-10 py-8">
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
                INR {items.price * items.selectedQty}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Render PaymentComponent conditionally */}
      {showPayment && <PaymentComponent />}

      <button
        className="w-full lg:absolute fixed bottom-0 left-0 headtext text-white font-extrabold text-[1.5rem] py-2 bg-[#A5A0A8]"
        onClick={makePayment}
      >
        Continue to Payment
      </button>
    </div>
  );
}
