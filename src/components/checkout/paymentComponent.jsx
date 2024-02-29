import Script from "next/script";
import cookieCutter from "cookie-cutter";

export default function PaymentComponent(params) {
  const makePayment = async ({ productId = "example_ebook" }) => {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/razorpay`, {
      method: "POST",
      body: JSON.stringify({
        amount: 500,
        currency: "INR",
        receipt: "receipt#1",
        notes: {
          productId,
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
      callback_url: "http://localhost:3000/api/paymentstatus",
      handler: async function (response) {
        await console.log("Payment successful", response);
        const updateOrder = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/paymentstatus`,
          {
            method: "POST",
            body: JSON.stringify({
              paymentStatus: "success",
              orderId:params.order_id,
            }),
          }
        ).then((t) => t.json());
      },
      prefill: {
        name: "Beaze",
        email: "beaze@gmail.com",
        contact: "9999999999",
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
          makePayment({ productId: "Beaze" });
        }}
      >
        Buy
      </button>
    </>
  );
}
