import Script from "next/script";
import cookieCutter from "cookie-cutter";
import { NextResponse } from 'next/server'
import { useEffect } from "react";
import { redirect } from "next/navigation";
export default function PaymentComponent({
  makePaymentClick,
  data,
  amount,
  orderId,
}) {
  // console.log("data", data);
  // console.log("amount", amount);
  // console.log("orderId", orderId);
  const makePayment = async ({ productId = "example_ebook" }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/razorpay`, {
      method: "POST",
      body: JSON.stringify({
        amount,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
          productId,
          orderId,
        },
      }),
    }).then((t) => t.json());
    console.log("res", res);
    const options = {
      name: res.order.notes.productId,
      currency: res.order.currency,
      order_id: res.order.id,
      key: process.env.RAZORPAY_KEY_ID,
      description: "Beaze Payment",
      theme: {
        color: "#ffa347",
      },
      ondismiss: function () {
        console.log("payment failed");
      },
      
      handler: async function (response) {
         console.log("Payment successful", response);
        const updateOrder = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/checkout`,
          {
            method: "put",
            body: JSON.stringify({
              paymentStatus: "success",
              status: "processed",
              total: amount,
              _id:orderId,
            }),
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${cookieCutter.get("token")}`,
            },
          }
        ).then((t) => t.json());
        console.log("updateOrder", updateOrder);
        cookieCutter.set("paymentStatus",
          `success ${updateOrder.order._id}`

        , {
          expires: new Date(new Date().getTime() + 60 * 60 * 1000),
        });
        const absoluteUrl =`${process.env.NEXT_PUBLIC_API_URL}/invoice?orderId=${orderId}`;

          window.location.href = absoluteUrl
      },    

      prefill: {
        name: "Placeholder",
        email: "beaze@gmail.com",
        contact: "9999999999",
      },
      modal:{
        ondismiss:function(){
          console.log("payment failed")
          const absoluteUrl =`${process.env.NEXT_PUBLIC_API_URL}/`;
          window.location.href = absoluteUrl
        }
      }
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
    paymentObject.on("payment.failed", function (response) {
      console.log("Payment failed", response.error.code);
      const updateFailedOrder = async()=>{
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
          method: "put",
          body: JSON.stringify({
            paymentStatus: "failed",
            _id:orderId,
            
          }),
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${cookieCutter.get("token")}`,
          },
        }).then((t) => t.json());
      }
      updateFailedOrder();
    });
  };


  useEffect(() => {
    makePayment({ productId: "Beaze" });
  },[])
  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      {/* <button
        onClick={() => {
          makePayment({ productId: "Beaze" });
        }}
      >
        Buy
      </button> */}
    </>
  );
}
