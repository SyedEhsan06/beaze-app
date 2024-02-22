"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  removeFromCart,
  removeSingleFromCart,
  selectCart,
} from "@/redux/slices/cartSlice";
import { closeCart } from "@/redux/slices/cartOpenSlice";
export default function Productcart({
  setCartOpen,
}) {
  const cartData = useSelector(selectCart);
  const [data, setdata] = useState(cartData);
  const [showprice, setshowprice] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    setdata(cartData);
  }, [cartData]);
  const handleDelete = (id) => {
    dispatch(removeFromCart({ _id: id }));
  };
  const handleRemove = (id) => {
    dispatch(removeSingleFromCart({ _id: id }));
  };
  const handleAdd = (id) => {
    dispatch(addToCart({ _id: id }));
  };
const handleCloseCart = () => {
  setCartOpen(false);
  // dispatch(closeCart());
};
  let tax= data.reduce((a, b) => a + b.tax*b.selectedQty, 0);
  let total = tax + data.reduce((a, b) => a + b.price*b.selectedQty, 0);
  return (
    <>
      <div className="pt-5 z-[99999]">
        <div className=" overflow-y-auto max-h-[405px] border-b">
          <div className="px-3">
            {data.map((items, index) => (
              <div className="w-full flex gap-3 mb-3" key={index}>
                <div className="w-[35%]">
                  <div className="w-full h-[110px] relative mb-3 rounded-[7px]">
                    <Image
                      src={`${items?.images[0]}`}
                      layout="fill"
                      objectFit="cover"
                      className="rounded-[7px] transition-all duration-300"
                    />
                  </div>
                </div>
                <div className="w-[60%] context flex flex-col  ">
                  <h5 className="text-lg font-[500] leading-4">
                    {items.title}
                  </h5>
                  <p className=" text-[1rem] text-text-secondary font-[300]">
                    Size : M | Colour : Black
                  </p>
                  <div className="mt-1 flex items-center border-[0.5px] w-[60%] justify-between rounded">
                    <button
                      onClick={() => handleRemove(items._id)}
                      className="py-1 px-2 border-r-[0.5px]"
                    >
                      <RiSubtractFill className="font-[800]" />
                    </button>
                    <div className="py-1 px-2 ">{items.selectedQty}</div>
                    <button
                      onClick={() => handleAdd(items._id)}
                      className="py-1 px-2 border-l-[0.5px]"
                    >
                      <IoMdAdd />
                    </button>
                  </div>

                  <p className=" text-[1rem] font-[500] mt-1">
                    INR {(items.price*items.selectedQty).toFixed(2)}
                  </p>
                </div>
                <div
                  onClick={() => handleDelete(items._id)}
                  className="w-[5%] pt-2 cursor-pointer text-gray-700"
                >
                  <FaTrashAlt size={16} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-3 py-2">
        <div className="flex w-full context gap-2 mb-3">
          <div className="w-[65%]">
            <input
              type="text"
              placeholder="Enter Coupon Code"
              className="w-full focus:outline-none border-[1px] border-bg-[#00000066] border-opacity-[40%] p-2 rounded-lg  focus:border-opacity-[100%] transition-all duration-150"
            />
          </div>
          <button className="w-[35%] bg-[#FFB61D] rounded-lg px-2 text-xs md:text-[1rem]">
            Apply Coupon
          </button>
        </div>

        <div className="border-[0.5px] border-bg-[#00000033] border-opacity-[50%] rounded-lg mb-3">
          <div className={`${showprice ? "block" : "hidden"}`}>
            {" "}
            <div className="px-2 py-1">
              <div className="w-full flex items-center">
                <div className="w-[50%]">
                  <p className="ml-auto text-lg font-[400]">Total</p>
                </div>

                <div className="w-[50%] flex">
                  <p className="ml-auto text-[1rem] font-[500]">{
                Math.floor(data.reduce((a, b) => a + b.price*b.selectedQty, 0))
              }</p>
                </div>
              </div>
            </div>
            <div className="px-2 py-1">
              <div className="w-full flex items-center">
                <div className="w-[50%]">
                  <p className="ml-auto text-lg font-[5400]">Discount</p>
                </div>

                <div className="w-[50%] flex">
                  <p className="ml-auto text-[1rem] font-[500]">{0}</p>
                </div>
              </div>
            </div>
            <div className="px-2 py-1">
              <div className="w-full flex items-center">
                <div className="w-[50%]">
                  <p className="ml-auto text-lg font-[400]">
                    Taxes and Charges
                  </p>
                </div>

                <div className="w-[50%] flex">
                  <p className="ml-auto text-[1rem] font-[500]">{
                  data.reduce((a, b) => a + b.tax*b.selectedQty, 0)
                  }</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex w-full context gap-2 p-2 ">
            <div className="w-[50%]">
              <button
                className=" text-lg font-[400] flex items-center"
                onClick={() => setshowprice(!showprice)}
              >
                Subtotal
                {showprice ? (
                  <RiSubtractFill className="ml-3" />
                ) : (
                  <IoMdAdd className="ml-3" />
                )}
              </button>
            </div>

            <div className="w-[50%] flex">
              <p className="ml-auto text-[1rem] font-[500]">{
             total.toFixed(2)
              }</p>
            </div>
          </div>
        </div>

        <div className="flex w-full headtext gap-3 mb-2">
          <button
          onClick={
            handleCloseCart
          }
          className="w-[35%] bg-transparent rounded-[29px] py-2 border-[1px] border-[#000000] text-xl text-[300] text-text-secondary">
            Cancel
          </button>
          <button className="w-[65%] bg-theme-footer-bg  py-2 text-xl text-white font-[700] rounded-[29px]">
            Checkout
          </button>
        </div>
      </div>
    </>
  );
}
