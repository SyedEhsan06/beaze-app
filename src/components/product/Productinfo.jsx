"use client";
import { fetchData } from "@/utils/apicall";
import React, { useEffect, useState } from "react";
import ModalImageSlider from "../categories/Modalimageslider";
import { BiSolidChevronDown } from "react-icons/bi";
import { RiSubtractLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import Image from "next/image";
import Loader from "../loader/Loader";
import Productcarousel from "./Productcarousel";
import Modal from "react-awesome-modal";
import Productmobile from "./Productmobile";
import { FaXmark } from "react-icons/fa6";
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { addToCart, selectCart } from "@/redux/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";
import Link from "next/link";



export default function Productinfo({ pid }) {
  const [loader, setloader] = useState(false);
  const [productinfo, setproductinfo] = useState([]);
  const [sizeindex, setsizeindex] = useState(0);
  const [showdesc, setshowdesc] = useState(false);
  const [ismodalopen, setismodalopen] = useState(false)
  const selectedCartData = useSelector(selectCart);
  const [setScrollLength,setsetScrollLength] = useState(null)
  const { slug } = pid;

  const [pdata,setpdata] = useState({
    _id : '',
    cartId:'',
    productId : '',
    title : '',
    images : [],
    selectedQty : 1,
    pquantity : null,
    quantity : null,
    color : '',
    size : '',
    price : null
  })



  useEffect(() => {
    handelproductinfo();
  }, []);

  
const router = useRouter() 

  const handelproductinfo = async () => {
    setloader(true);
    try {
      const response = await fetchData(`products/${slug}`);
      const resdata = response.products
      setproductinfo(resdata);
      setpdata({
        ...pdata,
           _id : resdata?._id,
           productId : resdata?.productId,
           title : resdata?.title,
           images : resdata?.images && Array.isArray(resdata?.images) && resdata?.images,
           pquantity : 1,
           selectedQty : 1,
           quantity : resdata?.quantity,
           color : resdata?.attributes && Array.isArray(resdata?.attributes[0]?.value) && resdata?.attributes[0].value[0],
           size : resdata?.attributes && Array.isArray(resdata?.attributes[1]?.value) && resdata?.attributes[1].value[0],
           price : resdata?.price,
        
      })
      setloader(false);
     
    } catch (err) {
      setloader(false);
      console.log(err);
    }
  };

  const closeModal = () => {
    setismodalopen(false)
  }

  const handelsetselectedsize = (index) => {
    setsizeindex(index);
    setpdata({
      ...pdata,
      size :  productinfo.attributes && Array.isArray(productinfo.attributes[1]?.value) && productinfo.attributes[1].value[index]
    })
  }


  const handelsetcolr = (val) => {
    setpdata({
      ...pdata,
      color : val
    })
  }


  const handelselectsize = (val) => {
    setpdata({
      ...pdata,
      size : val
    })
  }


  const handelincreaseqty = () => {

      setpdata({
        ...pdata,
        selectedQty: pdata.selectedQty + 1,
        
      });
    
  };
  
  
  const handeldecreseqty = () => {
    if(pdata.selectedQty != 1){
      setpdata({
        ...pdata,
        selectedQty : pdata.selectedQty-1,
      })
    }
  };

    const dispatch = useDispatch();

  const handeladdtocart = () => {
    const obj = {
      _id : pdata?._id,
      p_id : pdata?.productId+ pdata?.color + pdata?.size,

      productId : pdata?.productId,
      title : pdata?.title,
      images : pdata?.images,
      selectedQty : pdata?.selectedQty,
      quantity : pdata?.quantity,
      pquantity : pdata?.pquantity,
      color : pdata?.color,
      size : pdata?.size,
      price : pdata?.price * pdata?.selectedQty,
      p_id : pdata?._id+ pdata?.size+ pdata?.color
    }

    console.log({'selectedQty' : obj})

    dispatch(addToCart(obj));
    if (selectedCartData.some((item) => item.p_id === obj.p_id)) {
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

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const handleScroll = () => {
    if(window.scrollY >= 10){
      setshowdesc(true)
    }else{
      setshowdesc(false)
    }
  };

  console.log(selectedCartData)
  let commonCartData = selectedCartData.filter((item) => item._id === pdata._id);
console.log(commonCartData)
let currentProduct = selectedCartData?.find((item) => item._id === pdata._id);
// console.log(currentProduct?.selectedQty>= currentProduct?.quantity)
  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div>
          <div className={`w-[100%] mt-[70px]  transition-all duration-1000   bg-white p-4 items-center border-[0.3px] border-theme-footer-bg ${showdesc ? 'lg:flex lg:sticky top-0 left-0 lg:z-[200] hidden' : 'hidden'}`}>
            <div className="w-[25%]">

              <h5 className="context font-semibold  text-xl">
                {productinfo?.title}
              </h5>
              <p className="context font-[500]  text-lg">
                INR {productinfo?.price}
              </p>

            </div>

            <div className="w-[15%] context  ">
              <div className="w-full">


                <div className="w-[80%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096]  grid grid-cols-3 ">
                  <button
                    disabled={pdata?.selectedQty === 1 ? true : false}
                    className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center px-1 py-[6px] text-gray-950 flex items-center justify-center font-[800] cursor-pointer"
                    onClick={handeldecreseqty}
                  >
                    <RiSubtractLine size={20} />
                  </button>
                  <div className="border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center px-1 py-[6px]">
                    {pdata?.selectedQty}
                  </div>
                  <button
                    className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center px-1 py-[6px] text-gray-950 flex items-center justify-center font-[800] cursor-pointer"
                    onClick={handelincreaseqty}
                  >
                    <IoMdAdd size={20} />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-[17.5%]">

              <div className="w-[80%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096] pl-4 py-[6px] flex items-center relative">
                <div className="w-[100%]">
                  <select
                    className="w-full border-none focus:outline-none appearance-none bg-transparent cursor-pointer text-[15px] px-2"
                    id="sizeselect"
                    value={pdata.color}
                    onChange={(e) => handelsetcolr(e.target.value)}
                  >
                    <option value="">Select colour</option>
                    {productinfo?.attributes &&
                      Array.isArray(
                        productinfo?.attributes[0]?.value
                      ) &&
                      productinfo?.attributes[0].value.map(
                        (items, index) => (
                          <option value={items}>{items}</option>
                        )
                      )}
                  </select>
                </div>

                <div className=" absolute top-[10px] right-1">
                  <BiSolidChevronDown
                    size={20}
                    className=" text-gray-950"
                  />
                </div>
              </div>
            </div>

            <div className="w-[17.5%]">

              <div className="w-[80%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096] pl-4 py-[6px] flex items-center relative">
                <div className="w-[100%]">
                  <select
                    className="w-full border-none focus:outline-none appearance-none bg-transparent cursor-pointer text-[15px] px-2"
                    id="sizeselect"
                    value={pdata.size}
                    onChange={(e) => handelselectsize(e.target.value)}
                  >
                    <option value="">Size : Medium</option>
                    {productinfo?.attributes &&
                      Array.isArray(
                        productinfo?.attributes[1]?.value
                      ) &&
                      productinfo?.attributes[1].value.map(
                        (items, index) => (
                          <option value={items}>{items}</option>
                        )
                      )}
                  </select>
                </div>

                <div className=" absolute right-1 top-[10px]">
                  <BiSolidChevronDown
                    size={20}
                    className=" text-gray-950"
                  />
                </div>
              </div>
            </div>

            <div className="w-[25%]">
              <button className=" w-[80%]  headtext float-right bg-theme-footer-bg text-white font-[700] text-xl py-[6px] rounded " onClick={handeladdtocart}>
                Add to cart
              </button>
            </div>
          </div>
          <div className="w-full bg-gray-100 py-10 md:px-16 px-8 rounded-[11px]  relative">
            <div className="w-full">
              <div className="w-full md:flex md:gap-16 gap-5 grid grid-cols-1">
                <div className="md:w-[50%] relative">
                <div className={`lg:sticky top-[30px] left-0 lg:!h-[80vh] ${showdesc && ' lg:mt-[40px]'}`}>
                <Productcarousel sliderdata={productinfo?.images} setopemodal={setismodalopen} />
                </div>
                </div>
                <div className="md:w-[50%] ">
                  <div className={`lg:w-[80%] w-[100%] flex-col justify-between  ${showdesc ? ' lg:hidden' : 'flex'}`}>
                    <div className="w-full flex flex-col">
                      <p className=" text-[400] context text-sm mb-3   ">
                      <span><Link href='/'>Home</Link></span> /  <span className="cursor-pointer" onClick={() => router.back()}>Categories</span> / Product
                      </p>
                      <h5 className="headtext font-semibold md:text-3xl text-2xl lg:leading-[2.8rem]">
                        {productinfo?.title}
                      </h5>
                      <p className="context font-[500] md:text-2xl text-[1.3rem]">
                        INR {productinfo?.price}
                      </p>

                      {/* <p className="context mt-2 text-[1rem] text-opacity-[50%] font-[300]">
                    {productinfo.description}
                  </p> */}
                    </div>

                    <div className="context md:mt-7 mt-4">
                      <div className="w-full">
                        <p className=" font-[400] text-lg">Select a size</p>
                        <div className="flex mt-1 gap-2 flex-wrap">
                          {productinfo?.attributes &&
                            Array.isArray(productinfo?.attributes[1]?.value) &&
                            productinfo?.attributes[1].value.map(
                              (items, index) => (
                                <button
                                  key={index}
                                  className={` transition-all duration-150 font-[400] text-sm border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] px-2 py-1 ${sizeindex === index
                                    ? " bg-theme-footer-bg text-white text-opacity-[100%]"
                                    : "text-opacity-[50%] text-[#00000096]"
                                    }`}
                                    onClick={() => handelsetselectedsize(index)}
                                >
                                  {items}
                                </button>
                              )
                            )}
                        </div>
                      </div>
                    </div>

                    <div className="md:block grid grid-cols-2 gap-3">
                      <div className=" context mt-3">
                        <div className="w-full">
                          <label
                            htmlFor="sizeselect"
                            className=" font-[400] text-lg"
                          >
                            Select a colour
                          </label>
                          <div className="md:w-[40%] w-[100%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096] pl-4 h-[40px] flex items-center relative">
                            <div className="w-[100%]">
                              <select
                                className="w-full border-none focus:outline-none appearance-none bg-transparent cursor-pointer"
                                id="sizeselect"
                                value={pdata.color}
                                onChange={(e) => handelsetcolr(e.target.value)}
                              >
                                <option value="">Select Colour</option>
                                {productinfo?.attributes &&
                                  Array.isArray(
                                    productinfo?.attributes[0]?.value
                                  ) &&
                                  productinfo?.attributes[0].value.map(
                                    (items, index) => (
                                      <option value={items}>{items}</option>
                                    )
                                  )}
                              </select>
                            </div>

                            <div className=" absolute right-1 top-[10px]">
                              <BiSolidChevronDown
                                size={20}
                                className=" text-gray-950"
                              />
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className=" context mt-3 md:mt-6 ">
                        <div className="w-full">
                          <p className=" font-[400] text-lg">Select quantity</p>
                          <div className="md:w-[30%] w-[90%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096]  grid grid-cols-3 items-center ">
                            <button
                        disabled={pdata.selectedQty <= 1 ? true : false}
                              className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center px-1 h-[40px] text-gray-950 flex items-center justify-center font-[800] cursor-pointer"
                              onClick={handeldecreseqty}
                            >
                              <RiSubtractLine size={20} />
                            </button>
                            <div className="border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center px-1 h-[40px] flex items-center justify-center">
                            {pdata.selectedQty ? pdata.selectedQty : 1}
                            </div>
                            <button
                              className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center px-1 h-[40px] text-gray-950 flex items-center justify-center font-[800] cursor-pointer"
                              onClick={handelincreaseqty}
                            >
                              <IoMdAdd size={20} />
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className=" grid grid-cols-1 gap-y-4 headtext py-2 mt-6">
                      <button 
                      disabled={currentProduct?.selectedQty>= currentProduct?.quantity}
                      className=" w-full bg-theme-footer-bg text-white font-[700] text-xl py-2 rounded " onClick={handeladdtocart}>
                        Add to cart
                      </button>
                      <button className=" w-full  text-[#474747] font-[300] text-lg py-2 rounded border-[0.3px] border-[#000000] " onClick={() => router.back()}>
                        Cancel
                      </button>
                    </div>


                  </div>
                  <div className="mt-5">
                    <button
                      className="context font-[500] text-2xl md:w-[80%] w-[100%] flex items-center gap-x-5"
                      onClick={() => setshowdesc(!showdesc)}
                    >
                      Description & Details{" "}
                      <BiSolidChevronDown
                        className={` transition-all duration-150 ${showdesc ? " rotate-180" : "null"
                          }`}
                      />
                    </button>
                  </div>

                  <div
                    className={`w-full   context mt-6 ${showdesc ? "block" : " lg:block hidden"
                      }`}
                  >
                    <div className="w-[80%] mb-10">
                      <div className=" grid grid-cols-3 gap-x-16">
                        <div className="w-full flex flex-col  items-center justify-center">
                          <div className="w-[29px] h-[34px] relative mb-3 rounded-[8px] ">
                            <Image
                              src={"/images/web/Illustrations/drop.png"}
                              layout="fill"
                              objectFit="cover"
                              alt="sliderimage"
                            />
                          </div>
                          <p className="  text-[1rem] font-[500] text-text-secondary leading-[1rem] text-center">
                            Loose Fit Material
                          </p>
                        </div>
                        <div className="w-full flex flex-col  items-center justify-center">
                          <div className="w-[29px] h-[34px] relative mb-3 rounded-[8px] ">
                            <Image
                              src={"/images/web/Illustrations/brush.png"}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <p className="  text-[1rem] font-[500] text-text-secondary leading-[1rem] text-center">
                            Natural Dyes used
                          </p>
                        </div>
                        <div className="w-full flex flex-col  items-center justify-center">
                          <div className="w-[29px] h-[34px] relative mb-3 rounded-[8px] ">
                            <Image
                              src={"/images/web/Illustrations/fire.png"}
                              layout="fill"
                              objectFit="cover"
                            />
                          </div>
                          <p className=" text-[1rem] font-[500] text-text-secondary leading-[1rem] ">
                            Water Resistant Material
                          </p>
                        </div>
                        <div></div>
                        <div></div>
                      </div>
                    </div>

                    <div className="grid-cols-1 gap-y-5 grid">
                      <div className="w-full text-xl leading-[18px]">
                        <h5 className="font-[600]">Fabric Details</h5>
                        <p className="font-[400]">
                          The body fabric is made of 100% recycled nylon plain
                          weave for durability, with a DWR (durable water
                          repellent) finish that sheds light moisture
                        </p>
                      </div>
                      <div className="w-full text-xl leading-[18px]">
                        <h5 className="font-[600]">
                          Elasticized Waist and Regular Rise
                        </h5>
                        <p className="font-[400]">
                          These shorts have a regular rise and an elastic
                          waistband with a drawcord for a customizable fit
                        </p>
                      </div>

                      <div className="w-full text-xl leading-[18px]">
                        <h5 className="font-[600]">Pockets Details</h5>
                        <p className="font-[400]">
                          The pockets are lined with recycled polyester mesh for
                          drainage
                        </p>
                      </div>

                      <div className="w-full text-xl leading-[18px]">
                        <h5 className="font-[600]">Key Loop</h5>
                        <p className="font-[400]">
                          There's an elastic key loop inside the right pocket
                        </p>
                      </div>

                      <div className="w-full text-xl leading-[18px]">
                        <h5 className="font-[600]">Inseam Length</h5>
                        <p className="font-[400]">
                          These shirts have a 5" inseam
                        </p>
                      </div>

                      <div className="w-full text-xl leading-[18px]">
                        <h5 className="font-[600]">Country of Origin</h5>
                        <p className="font-[400]">Made in India.</p>
                      </div>

                      <div className="w-full text-xl leading-[18px]">
                        <h5 className="font-[600]">Weight</h5>
                        <p className="font-[400]">142 g (5 oz)</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ToastContainer/>
        </div>
      )}

  
      <Modal
        visible={ismodalopen}
        effect="fadeInDown"
        width='90%'
        onClickAway={closeModal}
      >
        <div className="p-8 relative">
          <button className=" absolute right-1 top-1 bg-black text-white p-2 rounded-full" onClick={() => setismodalopen(false)} ><FaXmark size={16} /></button>
          <Productmobile sliderdata={productinfo?.images} setopemodal={setismodalopen} />
        </div>
      </Modal>
   
    </>
  );
}
