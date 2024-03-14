"use client";
import axios from "axios";
import React, { useState, useEffect } from "react";
import cookieCutter from "cookie-cutter";

export default function OrderDetails({ userData }) {
  const [bars, setBars] = useState(0);
  const [orders, setOrders] = useState([]);
  const token = cookieCutter.get("token");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/checkout`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [token]);

  const handleToggleOrderDetails = (id) => {
    setBars((prevBars) => (prevBars === id ? 0 : id));
  };

  console.log({ userData: userData });
  console.log(orders);
  const ordersToShow = orders?.orders?.filter((order) => order.paymentStatus !== "pending");
  console.log(ordersToShow);

  return (
    <div className="w-full">
      <div className="grid grid-cols-1 gap-y-4 text-lg font-[500]">
        {ordersToShow?.length === 0 || !ordersToShow ? (
          <div className="text-center text-gray-500">No orders found.</div>
        ) : (
          ordersToShow?.map((order, index) => (
            <div
              className={`w-full bg-white cursor-pointer shadow-sm lg:px-10 md:px-8 px-6 lg:py-5 md:py-4 py-3 rounded-[13px] transition-all duration-150`}
              key={order._id}
            >
              <div
                className="w-full flex items-center"
                onClick={() => handleToggleOrderDetails(order._id)}
              >
                <h5 className="font-[600] text-lg headtext text-text-secondary">
                  {
                    new Date(order.date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }
                </h5>

                <div className="ml-auto">
                  <img
                    src={bars === order._id ? "/images/web/subicon.png" : "/images/web/addicon.png"}
                    alt=""
                    className="w-[15px]"
                  />
                </div>
              </div>

              <div className={`${bars === order._id ? "block" : "hidden"}`}>
                <div className="w-full px-3 py-7 context flex gap-x-6 text-text-secondary font-[500] lg:text-lg md:text-[1rem] text-sm">
                  <div className="w-[50%]">
                    <div>
                      <h5 className="lg:text-[15px] md:text-[12px] text-[10px] mb-2">
                        Order #{order._id}
                      </h5>
                      <p className="mb-2">Order Total: {order.total}</p>
                      <span className="border-b border-text-secondary font-[700]">Order Items</span>
                      <ul>
                        {order.cart.map((item) => (
                          <li key={item._id}>
                            {item.title} - Quantity: {item.quantity}, Size: {item.size}, Color: {item.color}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  <div className="w-[50%]">
                    <div className="w-full">
                      <p className="my-2 leading-normal">
                        Shipped to: <br />
                        {order.shipping_address.address_line1}, {order.shipping_address.address_line2}, {order.shipping_address.city}, {order.shipping_address.state}, {order.shipping_address.pincode}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
