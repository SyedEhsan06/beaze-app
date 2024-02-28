import Script from "next/script";
import cookieCutter from "cookie-cutter";
export default function PaymentComponent({ productId = null }) {
  const makePayment = async ({
    productId = "example_ebook",
  }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/razorpay`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${
          cookieCutter.get("token") 
        }`,
      },
      body: JSON.stringify({
        amount: 500,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
          productId,
        },
      }),
    }).then((t) => t.json());
    console.log(res);
    const options = {
      name: res.order.notes.productId,
      currency: res.order.currency,
      order_id: res.order.id,
      key: process.env.RAZORPAY_KEY_ID,
      description: "Beaze Payment",
      theme: {
        color: "#ffa347",
      },

      handler: async function (response) {
        const data = {
          orderCreationId: res.order.id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
          razorpaySignature: response.razorpay_signature,
          productId: res.order.notes.productId,
        };
        const result = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/razorpay`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                cookieCutter.get("token")}`,
            },
            body: JSON.stringify(data),
          }
        ).then((t) => t.json());
        console.log(result);
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };
  return (
    <>
      <Script
        id="razorpay-checkout-js"
        src="https://checkout.razorpay.com/v1/checkout.js"
      />

      <button
        onClick={() => {
          makePayment({ productId: "example_ebook" });
        }}
      >
        Buy
      </button>
    </>
  );
}
