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

export default function Productinfo({ pid }) {
  const [loader, setloader] = useState(false);
  const [quantity, setquantity] = useState(1);
  const [productinfo, setproductinfo] = useState([]);
  const [sizeindex, setsizeindex] = useState(1);
  const [showdesc, setshowdesc] = useState(false);
  const [ismodalopen, setismodalopen] = useState(false)
  const { slug } = pid;

  useEffect(() => {
    handelproductinfo();
  }, []);
  const handelproductinfo = async () => {
    setloader(true);
    try {
      const response = await fetchData(`products/${slug}`);
      setproductinfo(response.products);
      setloader(false);
    } catch (err) {
      setloader(false);
      console.log(err);
    }
  };

  const closeModal = () => {
    setismodalopen(false)
  }

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div>
        <div className={`w-[100%] mt-[70px]   bg-white p-4 items-center border-[0.3px] border-theme-footer-bg ${showdesc ? 'lg:flex hidden' : 'hidden' }`}>
                    <div className="w-[25%]">
                     
                      <h5 className="context font-semibold  text-xl">
                        {productinfo.title}
                      </h5>
                      <p className="context font-[500]  text-lg">
                        INR {productinfo.price}
                      </p>

                    </div>

                    <div className="w-[15%] context  ">
                        <div className="w-full">
                        
                         
                          <div className="w-[80%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096]  grid grid-cols-3 ">
                            <button
                              disabled={quantity === 1 ? true : false}
                              className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center px-1 py-[6px] text-gray-950 flex items-center justify-center font-[800] cursor-pointer"
                              onClick={() => setquantity(quantity - 1)}
                            >
                              <RiSubtractLine size={20} />
                            </button>
                            <div className="border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center px-1 py-[6px]">
                              {quantity}
                            </div>
                            <button
                              className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center px-1 py-[6px] text-gray-950 flex items-center justify-center font-[800] cursor-pointer"
                              onClick={() => setquantity(quantity + 1)}
                            >
                              <IoMdAdd size={20} />
                            </button>
                          </div>
                        </div>
                      </div>

                      <div className="w-[17.5%]">
                         
                          <div className="w-[80%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096] px-4 py-[6px] flex items-center">
                            <div className="w-[90%]">
                              <select
                                className="w-full border-none focus:outline-none appearance-none bg-transparent cursor-pointer text-[15px] px-2"
                                id="sizeselect"
                              >
                                <option value="">Colour : Off White</option>
                                {productinfo.attributes &&
                                  Array.isArray(
                                    productinfo.attributes[0]?.value
                                  ) &&
                                  productinfo.attributes[0].value.map(
                                    (items, index) => (
                                      <option value="">{items}</option>
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

                        <div className="w-[17.5%]">
                         
                         <div className="w-[80%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096] px-4 py-[6px] flex items-center">
                           <div className="w-[90%]">
                             <select
                               className="w-full border-none focus:outline-none appearance-none bg-transparent cursor-pointer text-[15px] px-2"
                               id="sizeselect"
                             >
                               <option value="">Size : Medium</option>
                               {productinfo.attributes &&
                                 Array.isArray(
                                   productinfo.attributes[1]?.value
                                 ) &&
                                 productinfo.attributes[1].value.map(
                                   (items, index) => (
                                     <option value="">{items}</option>
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

                 <div className="w-[25%]">
                 <button className=" w-[80%]  headtext float-right bg-theme-footer-bg text-white font-[700] text-xl py-[6px] rounded ">
                       Add to cart
                      </button>
                 </div>
                  </div>
          <div className="w-full bg-gray-100 py-10 md:px-16 px-8 rounded-[11px]  relative">
            <div className="w-full">
              <div className="w-full md:flex md:gap-16 gap-5 grid grid-cols-1">
                <div className="md:w-[50%]">
                  <Productcarousel sliderdata={productinfo.images} setopemodal={setismodalopen} />
                </div>
                <div className="md:w-[50%] ">
                <div className={`lg:w-[80%] w-[100%] flex-col justify-between  ${showdesc ? ' lg:hidden' : 'flex'}`}>
                    <div className="w-full flex flex-col">
                      <p className=" text-[400] context text-sm mb-3 ">
                        Women’s Clothing / Tops & Blouses / Classic Shirts{" "}
                      </p>
                      <h5 className="headtext font-semibold md:text-3xl text-2xl lg:leading-[2.8rem]">
                        {productinfo.title}
                      </h5>
                      <p className="context font-[500] md:text-2xl text-[1.3rem]">
                        INR {productinfo.price}
                      </p>

                      {/* <p className="context mt-2 text-[1rem] text-opacity-[50%] font-[300]">
                    {productinfo.description}
                  </p> */}
                    </div>

                    <div className="context md:mt-7 mt-4">
                      <div className="w-full">
                        <p className=" font-[400] text-lg">Select a size</p>
                        <div className="flex mt-1 gap-2 flex-wrap">
                          {productinfo.attributes &&
                            Array.isArray(productinfo.attributes[1]?.value) &&
                            productinfo.attributes[1].value.map(
                              (items, index) => (
                                <button
                                  key={index}
                                  className={` transition-all duration-150 font-[400] text-sm border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] px-2 py-1 ${sizeindex === index
                                      ? " bg-theme-footer-bg text-white text-opacity-[100%]"
                                      : "text-opacity-[50%] text-[#00000096]"
                                    }`}
                                  onClick={() => setsizeindex(index)}
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
                          <div className="md:w-[40%] w-[100%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096] px-4 py-1 flex items-center">
                            <div className="w-[90%]">
                              <select
                                className="w-full border-none focus:outline-none appearance-none bg-transparent cursor-pointer"
                                id="sizeselect"
                              >
                                <option value="">Select Colour</option>
                                {productinfo.attributes &&
                                  Array.isArray(
                                    productinfo.attributes[0]?.value
                                  ) &&
                                  productinfo.attributes[0].value.map(
                                    (items, index) => (
                                      <option value="">{items}</option>
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

                      <div className=" context mt-3 md:mt-6 ">
                        <div className="w-full">
                          <p className=" font-[400] text-lg">Select quantity</p>
                          <div className="md:w-[30%] w-[90%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096]  grid grid-cols-3 ">
                            <button
                              disabled={quantity === 1 ? true : false}
                              className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center p-1 text-gray-950 flex items-center justify-center font-[800] cursor-pointer"
                              onClick={() => setquantity(quantity - 1)}
                            >
                              <RiSubtractLine size={20} />
                            </button>
                            <div className="border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center p-1">
                              {quantity}
                            </div>
                            <button
                              className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center p-1 text-gray-950 flex items-center justify-center font-[800] cursor-pointer"
                              onClick={() => setquantity(quantity + 1)}
                            >
                              <IoMdAdd size={20} />
                            </button>
                          </div>
                        </div>
                      </div>

                    </div>
                    <div className=" grid grid-cols-1 gap-y-4 headtext py-2 mt-6">
                      <button className=" w-full bg-theme-footer-bg text-white font-[700] text-xl py-2 rounded ">
                      Add to cart
                      </button>
                      <button className=" w-full  text-[#474747] font-[300] text-lg py-2 rounded border-[0.3px] border-[#000000] ">
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
                    className={`w-full   context mt-6 ${showdesc ? "block" : "hidden"
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
          <Productmobile sliderdata={productinfo.images} setopemodal={setismodalopen} />
        </div>
      </Modal>
    </>
  );
}
