"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import axios from "axios";
import cookieCutter from "cookie-cutter";
import Loaderfixed from "../loader/Loaderfixed";
import { useDispatch } from "react-redux";
import { emptyCart } from "@/redux/slices/cartSlice";

export default function Invoice() {
  const [pdfContent, setPdfContent] = useState("");
  const [loader, setloader] = useState(false);
  const params = useSearchParams();
  const orderId = params.get("orderId");
  const [orderData, setOrderData] = useState(null);
  const dispatch = useDispatch();
  // console.log(orderId);
  useEffect(() => {
    const fetchOrderData = async () => {
      setloader(true);
      try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/checkout?orderId=${orderId}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${cookieCutter.get("token")}`,
            },
          }
        );
        setloader(false);
        dispatch(emptyCart());
        setOrderData(response.data);
      } catch (error) {
        setloader(false);
        console.error("Error fetching order data:", error);
      }
    };
    fetchOrderData();
  }, [orderId]);
  console.log(orderData);
  // let totalPrice = orderData?.orders?.reduce((acc, order) => acc + order.price, 0);
  useEffect(() => {
    // Ensure the code runs only in the browser environment
    if (typeof window !== "undefined") {
      import("html2pdf.js").then((html2pdf) => {
        window.html2pdf = html2pdf.default;
      });
    }
  }, []);

  const generatePdf = () => {
    const content = document.getElementById("contentToConvert");

    if (!content) {
      console.error("Element with id contentToConvert not found.");
      return;
    }

    setPdfContent(content.innerHTML);

    if (typeof window !== "undefined" && window.html2pdf) {
      window.html2pdf(content, {
        margin: 10,
        filename: "Beazeinvoice-pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2 },
        jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
        callback: function (pdf) {
          pdf.save();
        },
      });
    }
  };

  var options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  return (
    <>
      {loader && <Loaderfixed />}
      <div className=" lg:px-40 py-8 px-5 bg-gray-50">
        <div>
          <div className="w-full">
            <div className="w-full lg:flex justify-center">
              <div className="lg:w-[80%] lg:flex gap-x-4 items-center">
                <div className="lg:w-[30%]">
                  <img
                    src="/images/web/invoice.png"
                    className="w-[50%] md:w-[20%] lg:w-[100%] mx-auto"
                    alt=""
                  />
                </div>

                <div className="lg:w-[70%] mt-3 lg:mt-0 ">
                  <div className="lg:ml-8 text-text-secondary font-[900] lg:text-[2.4rem] md:text-[2rem] text-[1.5rem] headtext lg:leading-[3rem] md:leading-[2.4rem] leading-[1.8rem]">
                    <h4 className="text-center lg:text-left">
                      Congratulations !<br /> Order Placed Successfully
                    </h4>
                  </div>

                  <div className="w-full grid grid-cols-2 gap-x-3 mt-4">
                    <button
                      className="h-[50px] rounded w-full border border-theme-footer-bg text-text-secondary font-[800] headtext lg:text-[1.4rem] md:text-xl text-[1rem]"
                      onClick={generatePdf}
                    >
                      Download Invoice
                    </button>
                    <button className="h-[50px] rounded w-full border border-transparent bg-theme-footer-bg font-[800] text-white headtext lg:text-[1.4rem] md:text-xl  text-[1rem] ">
                      <Link href={"/products"}> Continue Shopping </Link>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            {orderData && orderData.orders && orderData.orders.length > 0 && (
              <div
                className="w-full mt-4 bg-white  rounded-[29px] shadow-md lg:p-10 md:p-8 p-5"
                id="contentToConvert"
              >
                {orderData.orders.map((order) => (
                  <div key={order._id}>
                    <div className="lg:flex context gap-x-16  text-lg font-[500] text-text-secondary">
                      <div className="lg:w-[50%]">
                        <div className="">
                          <p className="my-2 text-[1.4rem]">
                            Order #{order._id}
                          </p>
                          <p className="my-2">
                            {new Date(order.date).toLocaleDateString(
                              "en-US",
                              options
                            )}
                          </p>
                          <p className="my-2">
                            Shipping to : {order.shipping_address.city},{" "}
                            {order.shipping_address.state}
                          </p>
                          <p className="my-2">
                            {order.first_name} {order.last_name}, {order.phone}
                          </p>
                          <p className="my-2 leading-[1.2rem]">
                            {order.shipping_address.address_line1} <br />
                            {order.shipping_address.address_line2} <br />
                            {order.shipping_address.city}{" "}
                            {order.shipping_address.pincode}{" "}
                            {order.shipping_address.state}{" "}
                            {order.shipping_address.country}
                          </p>
                        </div>

                        <div className="mt-8">
                          <p className="my-2">
                            Order Total : Rs. {order.total}
                          </p>
                        </div>
                      </div>

                      <div className="lg:w-[50%] ">
                        <div>
                          {order.cart.map((item) => (
                            <div key={item._id}>
                              <p className="my-2 leading-[1.2rem]">
                                {item.title} * {item.selectedQty} <br />
                                {item.size && item.color ? (
                                  <>
                                    Size: {item.size}, Colour: {item.color}
                                  </>
                                ) : item.size ? (
                                  <>Size: {item.size}</>
                                ) : item.color ? (
                                  <>Colour: {item.color}</>
                                ) : null}
                              </p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
