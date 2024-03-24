"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { IoMdAdd } from "react-icons/io";
import { RiSubtractFill } from "react-icons/ri";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";X
import { TbFaceIdError } from "react-icons/tb";
import {
  addDiscount,
  addToCart,
  hanldleIncrement,
  removeDiscount,
  removeFromCart,
  removeSingleFromCart,
  selectCart,
  selectDiscount,
} from "@/redux/slices/cartSlice";
import { closeCart } from "@/redux/slices/cartOpenSlice";
import { useRouter } from "next/navigation";
import cookieCutter from "cookie-cutter";
import Link from "next/link";
import axios from "axios";
import Loaderfixed from "../loader/Loaderfixed";
export default function Productcart({ setCartOpen }) {
  const cartData = useSelector(selectCart);
  const [data, setdata] = useState(cartData);
  const [coupon, setcoupon] = useState("");
  const [discount, setdiscount] = useState(0);
  const [couponError, setcouponError] = useState("");
  const [couponDiscount, setcouponDiscount] = useState(0);
  const [couponId, setcouponId] = useState("");
  const [codeName,setcodename]=useState("")
  const [showprice, setshowprice] = useState(false);
  const [loder, setloder] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();
  useEffect(() => {
    setdata(cartData);
  }, [cartData]);
  const handleDelete = (id) => {
    dispatch(removeFromCart({ p_id: id }));
  };
  const handleRemove = (id) => {
    dispatch(removeSingleFromCart({ p_id: id }));
  };
  const handleAdd = (id) => {
    if (
      data.find((item) => item.p_id === id).selectedQty <
      data.find((item) => item.p_id === id).quantity
    ) {
      dispatch(hanldleIncrement({ p_id: id }));
    }
  };
  const handleCloseCart = () => {
    dispatch(removeDiscount());
      setcoupon("");
      setcouponDiscount(0);
    setCartOpen(false);
    // dispatch(closeCart());
  };
  let tax = data.reduce((a, b) => a + b.tax * b.selectedQty, 0);
  let total = tax + data.reduce((a, b) => a + b.price * b.selectedQty, 0);
  const discountState = useSelector(selectDiscount);
  console.log(discountState);
    // console.log(data);
  const totalPrice = data.reduce(
    (a, b) => a + b.originalprice * b.selectedQty,
    0
  );
  useEffect(() => {
    dispatch(addDiscount({ discount: couponDiscount, couponId: couponId ,code:codeName}))
  }, [couponDiscount]);
  const fullTotal = totalPrice+tax - couponDiscount/100 * totalPrice;
  const handelsendtocheckout = () => {
    router.push("/checkout");
    setCartOpen(false);
  };
  // console.log({'cartdata' : cartData})
  //coupon
  const handleCoupon = async () => {
    setloder(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/coupon/use`,
        {
          code: coupon,
        },
        {
          headers: { 
            Authorization: `Bearer ${cookieCutter.get("token")}`,
          },
        }
      );
        console.log(response)

        setloder(false);
      if (response.data.error) {
        setcouponError(response.data.error);
      } else {
        setcouponDiscount(response.data.discount);
        setcouponId(response.data.couponId);
        setcodename(response.data.code)
        setcouponError("");
        dispatch(
          addDiscount({
            discount: response.data.discount,
            couponId: response.data.couponId,
            code:response.data.code
          })
        );
        
      }
    } catch (error) {
      setloder(false);
      // 
      console.log(error);
      setcouponError(error)
      console.error(error);
    }
  };

  console.log(couponDiscount);
  console.log(couponError);
  

  return (
    <>
      {/* {loder && <Loaderfixed />} */}
      {data.length >= 1 ? (
        <>
          <div className="pt-5 z-[99999]">
            <div className=" overflow-y-auto max-h-[63vh] border-b">
              <div className="px-3">
                {data.map((items, index) => (
                  <div className="w-full flex gap-3 mb-3" key={index}>
                    <div className="w-[35%]">
                      <div className="w-full h-[110px] relative mb-3 rounded-[7px]">
                        <Image
                          src={`${
                            items?.images?.[0] || "/images/product/notfound.png"
                          }`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-[7px] transition-all duration-300"
                          alt="productimage"
                        />
                      </div>
                    </div>
                    <div className="w-[60%] context flex flex-col  ">
                      <h5 className="text-lg font-[500] leading-4">
                        {items.title}
                      </h5>
                      <p className=" text-[1rem] text-text-secondary font-[300]">
                        Size : {items.size} | Colour : {items.color}
                      </p>
                      <div className="mt-1 grid grid-cols-3 items-center border-[0.5px] w-[50%] justify-between rounded">
                        <button
                          onClick={() => handleRemove(items.p_id)}
                          disabled={items.selectedQty == 1 ? true : false}
                          className="py-1 px-2 border-r-[0.5px]"
                        >
                          <img
                            src="images/web/subicon.png"
                            className="w-[15px]"
                            alt=""
                          />
                        </button>
                        <div className="py-1 px-2 text-center ">
                          {items.selectedQty}
                        </div>
                        <button
                          onClick={() => handleAdd(items.p_id)}
                          className="py-1 px-2 border-l-[0.5px]"
                        >
                          <img
                            src="images/web/addicon.png"
                            className="w-[15px]"
                            alt=""
                          />
                        </button>
                      </div>

                      <p className=" text-[1rem] font-[500] mt-1">
                        INR{" "}
                        {parseFloat(
                          (items.originalprice * items.selectedQty).toFixed(2)
                        )}
                      </p>
                    </div>
                    <div
                      onClick={() => handleDelete(items.p_id)}
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
                  placeholder={
                    cookieCutter.get("token").length < 1? "Login to apply coupon" : "Enter Coupon Code"
                  }
                  className="w-full focus:outline-none border-[1px] border-bg-[#00000066] border-opacity-[40%] p-2 rounded-lg  focus:border-opacity-[100%] transition-all duration-150"
                  value={coupon}
                  onChange={(e) => setcoupon(e.target.value)}
                />
              </div>
              <button
              disabled={coupon.length < 1 ||cookieCutter.get("token").length < 1}
                className={`w-[35%] bg-[#FFB61D] ${
                  couponError
                    ? "border-[1px] border-[#FF0000] text-[#FF0000] border-opacity-[100%]"
                    : "border-transparent text-[#000000]"
                } text-white
                ${
                  coupon.length >=1 ||cookieCutter.get("token").length < 1 ? 'opacity-[100%]':'opacity-[50%]'
                }
              rounded-lg px-2 text-xs md:text-[1rem]`}
                
                onClick={handleCoupon}
              >
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
                      <p className="ml-auto text-[1rem] font-[500]">
                        {totalPrice.toFixed(2)}
                      </p>
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
                      <p className="ml-auto text-[1rem] font-[500]">
                        {tax.toFixed(2)}
                      </p>
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
                  <p className="ml-auto text-[1rem] font-[500]">
                    {fullTotal.toFixed(2)}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex w-full headtext gap-3 mb-2">
              <button
                onClick={handleCloseCart}
                className="w-[35%] bg-transparent rounded-[29px] py-2 border-[1px] border-[#000000] text-xl text-[300] text-text-secondary"
              >
                Cancel
              </button>
              <Link href="/checkout">
                <button
                  className=" w-[65%] bg-theme-footer-bg  py-2 text-xl text-white font-[700] rounded-[29px]"
                  onClick={handelsendtocheckout}
                >
                  Checkout
                </button>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="w-full !h-[90%] flex items-center justify-center flex-col">
          <TbFaceIdError className="lg:text-[4rem] md:text-[3rem] text-[2rem]" />
          <p className="md:text-lg text-[1rem] font-semibold headtext ">
            Oops Look like your cart is empty
          </p>
        </div>
      )}
    </>
  );
}
