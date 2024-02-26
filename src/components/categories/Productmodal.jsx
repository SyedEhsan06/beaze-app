"use client";
import React, { useEffect, useState } from "react";
import ModalImageSlider from "./Modalimageslider";
import { FaXmark, FaChevronLeft } from "react-icons/fa6";
import { BiSolidChevronDown } from "react-icons/bi";
import { RiSubtractLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";
import { addToCart, selectCart } from "@/redux/slices/cartSlice";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";


export default function Productmodal({ produtdata, modalclose,ismodalopen }) {
  const [sizeindex, setsizeindex] = useState(0);
  const [imageindex, setimageindex] = useState(0);
  const [showimage, setshowimage] = useState(false);
  const selectedCartData = useSelector(selectCart);
  const [pdata,setpdata] = useState({
    _id : '',
    productId : '',
    title : '',
    images : [],
    quantity : null,
    pquantity : null,
    color : '',
    size : '',
    price : null
  })


useEffect(() => {
  setpdata({
    ...pdata,
       _id : produtdata._id,
       productId : produtdata.productId,
       title : produtdata.title,
       images : produtdata.images && Array.isArray(produtdata.images) && produtdata.images,
       pquantity : 1,
       quantity : produtdata.quantity,
       color : produtdata.attributes && Array.isArray(produtdata.attributes[0]?.value) && produtdata.attributes[0].value[0],
       size : produtdata.attributes && Array.isArray(produtdata.attributes[1]?.value) && produtdata.attributes[1].value[0],
       price : produtdata.price,
    
  })
  setsizeindex(0)
},[produtdata,ismodalopen])


  const dispatch = useDispatch();

  const handeladdtocart = () => {
    const obj = {
      _id : pdata._id,
      productId : pdata.productId,
      title : pdata.title,
      images : pdata.images,
      quantity : pdata.quantity,
      pquantity : pdata.pquantity,
      color : pdata.color,
      size : pdata.size,
      price : pdata.price * pdata.pquantity

    }


    dispatch(addToCart(obj));
    if (selectedCartData.some((item) => item._id === obj._id)) {
      toast.success("Added same product again", {
        position: "bottom-left",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.success("Added to cart", {
        position: "bottom-left",
        autoClose: 500,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
    localStorage.setItem("cart", JSON.stringify(selectedCartData));
  };








  const handelsetselectedsize = (index) => {
    setsizeindex(index);
    setpdata({
      ...pdata,
      size :  produtdata.attributes && Array.isArray(produtdata.attributes[1]?.value) && produtdata.attributes[1].value[index]
    })
  }


  const handelsetcolr = (val) => {
    setpdata({
      ...pdata,
      color : val
    })
  }



const handelincreaseqty = () => {
  if (pdata.pquantity + 1 > produtdata.quantity) {
    toast.error(`You can't add more quantity than ${produtdata.quantity}`, {
      position: "bottom-left",
      autoClose: 500,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  } else {
    setpdata({
      ...pdata,
      pquantity: pdata.pquantity + 1,
    });
  }
};


  const handeldecreseqty = () => {
    if(pdata.pquantity != 1){
      setpdata({
        ...pdata,
        pquantity : pdata.pquantity-1,
       
      })
    }
  }
  
  return (
    <>
      {showimage ? (
        <div className="px-5 pt-6 pb-8 relative">
          <button
            className=" absolute top-[10px] right-3 z-10"
            onClick={() => {
              modalclose();
              setshowimage(false);
            }}
          >
            <FaXmark size={30} />
          </button>
          <button
            className=" absolute top-[10px] left-3 z-10"
            onClick={() => setshowimage(false)}
          >
            <FaChevronLeft size={30} />
          </button>
          <div className=" mt-7">
            <div className="w-full h-[350px] relative mb-3 rounded-[8px] lg:hidden block">
              <Image
                src={produtdata?.images?.[imageindex]}
                layout="fill"
                objectFit="cover"
                className="rounded-[8px] transition-all duration-300"
                alt={`image not fond`}
              />
            </div>
          </div>
        </div>
      ) : (
        <div className="px-5 pt-6 pb-8 relative md:min-h-[500px] md:max-h-[650px] overflow-y-auto ">
          <button
            className=" absolute top-[10px] right-3 z-10"
            onClick={() => modalclose()}
          >
            <FaXmark size={30} />
          </button>
          <div className="w-full lg:flex lg:gap-x-5 grid grid-cols-1 gap-y-5 lg:gap-y-0">
            <div className="lg:w-[45%] ">
              <ModalImageSlider
                sliderdata={produtdata.images}
                showonphone={setshowimage}
                imageindex={imageindex}
                setimageindex={setimageindex}
              />
            </div>
            <div className="lg:w-[50%] flex flex-col gap-4 lg:gap-0   justify-between">
              <div className="w-full flex flex-col">
                <h5 className="headtext font-semibold md:text-3xl lg:leading-[2.8rem]  text-2xl ">
                  {produtdata.title}
                </h5>
                <p className="context font-[500] md:text-2xl text-[1.3rem] ">
                  INR {produtdata.price}
                </p>

                <p className="context mt-2 text-[1rem] text-opacity-[50%] font-[300]">
                  {produtdata.description}
                </p>
              </div>

              <div className="context ">
                <div className="w-full">
                  <p className=" font-[400] text-lg">Select a size</p>
                  <div className="flex mt-1 gap-2 flex-wrap">
                    {produtdata.attributes &&
                      Array.isArray(produtdata.attributes[1]?.value) &&
                      produtdata.attributes[1].value.map((items, index) => (
                        <button
                          key={index}
                          className={` transition-all duration-150 font-[400] text-sm border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] px-2 py-1 ${
                            sizeindex === index
                              ? " bg-theme-footer-bg text-white text-opacity-[100%]"
                              : "text-opacity-[50%] text-[#00000096]"
                          }`}
                          onClick={() => handelsetselectedsize(index)}
                        >
                          {items}
                        </button>
                      ))}
                  </div>
                </div>
              </div>

              <div className=" md:block  grid grid-cols-2 gap-x-3">
                <div className=" context  ">
                  <div className="w-full">
                    <label htmlFor="sizeselect" className=" font-[400] text-lg">
                      Select a colour
                    </label>
                    <div className="md:w-[40%] w-[100%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096] px-4 py-1 flex items-center">
                      <div className="w-[90%]">
                        <select
                          className="w-full border-none focus:outline-none appearance-none bg-transparent cursor-pointer"
                          id="sizeselect" value={pdata.color} onChange={(e) => handelsetcolr(e.target.value)}
                        >
                          <option value="">Select Colour</option>
                          {produtdata.attributes &&
                            Array.isArray(produtdata.attributes[0]?.value) &&
                            produtdata.attributes[0].value.map(
                              (items, index) => (
                                <option value={items} key={index}>
                                  {items}
                                </option>
                              )
                            )}
                        </select>
                      </div>

                      <div className="w-[10%]">
                        <BiSolidChevronDown
                          size={20}
                          className=" text-gray-950"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className=" context md:mt-3">
                  <div className="w-full">
                    <p className=" font-[400] text-lg">Select quantity</p>
                    <div className="md:w-[30%] w-[60%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096]  grid grid-cols-3 ">
                      <button
                        disabled={pdata.pquantity == 1 ? true : false}
                        className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center p-1 text-gray-950 flex items-center justify-center font-[800] cursor-pointer"
                        onClick={handeldecreseqty}
                        
                      >
                        <RiSubtractLine size={20} />
                      </button>
                      <div className="border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center p-1">
                        {pdata.pquantity}
                      </div>
                      <button
                        className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center p-1 text-gray-950 flex items-center justify-center font-[800] cursor-pointer"
                        onClick={handelincreaseqty}
                      >
                        <IoMdAdd size={20} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className=" grid grid-cols-1 gap-y-4 headtext ">
                <button
                onClick={
                  () => handeladdtocart(produtdata) 
                }
                className=" w-full bg-theme-footer-bg text-white font-[700] text-xl py-2 rounded lg:hover:bg-opacity-[90%] lg:hover:shadow-sm transition-all duration-150 ">
                  Add to cart
                </button>
                <button
                  className=" w-full  text-[#474747] font-[300] text-lg py-2 rounded border-[0.3px] border-[#000000] "
                  onClick={() => modalclose()}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
