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
import { fetchCategories, selectCategories } from "@/redux/slices/categorySlice";
import Teazeslider from "../home/homecontent/Teazeslider";
import { toggleCategory, toggleCategoryCall } from "@/redux/slices/filterSlice";




export default function Productinfo({ pid }) {
  const [loader, setloader] = useState(false);
  const [productinfo, setproductinfo] = useState([]);
  const [sizeindex, setsizeindex] = useState(0);
  const [showdesc, setshowdesc] = useState(false);
  const [ismodalopen, setismodalopen] = useState(false)
  const selectedCartData = useSelector(selectCart);
  const [setScrollLength,setsetScrollLength] = useState(null)
  const { slug } = pid;
  const[colors,setcolors] = useState([]);
  const[sizes,setsizes] = useState([]);


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

  const [data, setData] = useState([]);

  
  const findItemByKey = (data, key, value) => {
    if (!Array.isArray(data)) {
      console.error('Data is not an array.');
      return null;
    }
    
    return data.find(item => item[key] === value);
  };
  
 
  let selectData = useSelector(selectCategories)
  useEffect(() => {
      if(selectData.length === 0){
          dispatch(fetchCategories())
         
      }
      setData(selectData)
      if(selectData){
          setloader(false)
      }
  }
  , [selectData]);
  
  useEffect(() => {
    setloader(true)
    let data = async () => {
      const res = await fetchData('products/'+slug)
      setproductinfo(res.products)
      console.log("res", res.products);
    }

    data()
  
  }, []);



  // useEffect(() => {
  //   handelproductinfo();
  // }, []);
let produtdata = productinfo
  
const router = useRouter() 
const [selectedVariant, setselectedVariant] = useState(0);
useEffect(() => {
  console.log("produtdata", produtdata.varients);
  if (produtdata.varients && produtdata.varients.length > 0) {
    let fetchVarient = async () => {
      const res = await fetch(
        `/api/products/${produtdata.varients[selectedVariant].id}`
      );
      const x = await res.json();
      console.log("x", x);
      let data = x.products;
      setpdata({
        ...pdata,
        _id: data._id,
        productId: data.productId,
        tax: data.tax,
        title: data.title,
        images: data.images && Array.isArray(data.images) && data.images,
        pquantity: 1,
        selectedQty: 1,
        quantity: data.quantity,
        color: findItemByKey(data.attributes, "name", "Colors")?.value[0],
        size: findItemByKey(data.attributes, "name", "Sizes")?.value[0],
        price: data.price,
      });
      setsizeindex(0);
      const elemcolor = findItemByKey(data.attributes, "name", "Colors");
      setcolors(elemcolor?.value ? elemcolor.value : []);
      const elemcsizes = findItemByKey(data.attributes, "name", "Sizes");
      setsizes(elemcsizes?.value ? elemcsizes.value : []);
    };
    fetchVarient();
  } else {
    setpdata({
      ...pdata,
      _id: produtdata._id,
      productId: produtdata.productId,
      tax: produtdata.tax,
      title: produtdata.title,
      images:
        produtdata.images &&
        Array.isArray(produtdata.images) &&
        produtdata.images,
      pquantity: 1,
      selectedQty: 1,
      quantity: produtdata.quantity,
      color: findItemByKey(produtdata.attributes, "name", "Colors")?.value[0],
      size: findItemByKey(produtdata.attributes, "name", "Sizes")?.value[0],
      price: produtdata.price,
    });
    setsizeindex(0);
    const elemcolor = findItemByKey(produtdata.attributes, "name", "Colors");
    setcolors(elemcolor?.value ? elemcolor.value : []);

    const elemcsizes = findItemByKey(produtdata.attributes, "name", "Sizes");
    setsizes(elemcsizes?.value ? elemcsizes.value : []);
  }
}, [pid,ismodalopen, selectedVariant]);

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
      _id : pdata._id,
      p_id : pdata?.productId+ pdata?.color + pdata?.size,
      productId : pdata.productId,
      title : pdata.title,
      tax: pdata.tax,
      images : pdata.images,
      quantity : pdata.quantity,
      pquantity : pdata.pquantity,
      selectedQty : pdata.selectedQty,
      color : pdata.color,
      size : pdata.size,
      price : pdata.price * pdata.selectedQty,
      originalprice   : pdata.price,

    };

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
    if(window.scrollY >= 450){
      setshowdesc(true)
    }else{
      setshowdesc(false)
    }
  };

  let commonCartData = selectedCartData.filter((item) => item._id === pdata._id);

let currentProduct = selectedCartData?.find((item) => item._id === pdata._id);

const routeToProducts = () => {
  dispatch(toggleCategory(
    productinfo?.category
  ));
  // dispatch(toggleCategory(item.name));
    dispatch(toggleCategoryCall(
    productinfo?.category
    ));

  // router.push(`/products`)
}

  console.log("pdata", pdata);

  return (
    <>
      {loader ? (
        <Loader />
      ) : (
        <div className=" relative">
          <div className={`w-[100%]   transition-all duration-1000   bg-white p-4 items-center border-[0.3px] border-theme-footer-bg ${showdesc ? 'lg:flex lg:sticky top-[100px] left-0 lg:z-[200] hidden' : 'hidden'}`}>
            <div className="w-[25%]">

              <h5 className="context font-semibold  text-xl">
                {pdata?.title}
              </h5>
              <p className="context font-[500]  text-lg">
                INR {pdata?.price}
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
                     <img src="/images/web/subicon.png" className="w-[15px]" alt="" />
                  </button>
                  <div className="border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center px-1 py-[6px]">
                    {pdata?.selectedQty}
                  </div>
                  <button
                    className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center px-1 py-[6px] text-gray-950 flex items-center justify-center font-[800] cursor-pointer"
                    onClick={handelincreaseqty}
                  >
                     <img src="/images/web/addicon.png" className="w-[15px]" alt="" />
                  </button>
                </div>
              </div>
            </div>

            <div className="w-[17.5%]">

              <div className="w-[80%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096] pl-4 py-[6px] flex items-center relative">
                <div className="w-[100%]">
                  <select
                    className="w-full  border-none focus:outline-none appearance-none bg-transparent cursor-pointer text-[15px] px-2"
                    id="sizeselect"
                    value={pdata.color}
                    onChange={(e) => handelsetcolr(e.target.value)}
                  >
                    <option value="">Select colour</option>
                    {colors.map(
                        (items, index) => (
                          <option value={items}>Colour : {items}</option>
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
                    {sizes.map(
                        (items, index) => (
                          <option value={items}>Size : {items}</option>
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
          <div className={`w-full bg-gray-100 py-10 md:px-16 px-8 rounded-[11px] transition-all  duration-1000 relative `}>
            <div className="w-full">
              <div className="w-full md:flex md:gap-16 gap-5 grid grid-cols-1">
                <div className="md:w-[50%] relative">
                <div className={`lg:sticky top-[150px] transition-all duration-300 left-0 lg:!h-[80vh] ${showdesc && ' lg:pt-[70px]'}`}>
                <Productcarousel sliderdata={productinfo?.images} setopemodal={setismodalopen} />
                </div>
                </div>
                <div className="md:w-[50%] ">
                  <div className={`lg:w-[80%] w-[100%] flex-col justify-between  flex`}>
                    <div className="w-full flex flex-col">
                      <p className=" text-[400] context text-sm mb-3   ">
                      <span><Link href='/'>Home</Link></span> /  <Link
                      href={`/products`}
                      >
                      <span className="cursor-pointer" onClick={ 
                    routeToProducts  
                    }>{
                        productinfo?.category
                      }</span>
                      </Link> / {
                        productinfo?.title
                      }
                      </p>
                      <h5 className="headtext font-semibold md:text-3xl text-2xl lg:leading-[2.8rem]">
                        {pdata?.title}
                      </h5>
                      <p className="context font-[500] md:text-2xl text-[1.3rem]">
                        INR {pdata?.price}
                      </p>

                      {/* <p className="context mt-2 text-[1rem] text-opacity-[50%] font-[300]">
                    {productinfo.description}
                  </p> */}
                    </div>

                   {
                    sizes.length > 0 &&  <div className="context md:mt-7 mt-4">
                      <div className="w-full">
                        <p className=" font-[400] text-lg">Select a size</p>
                        <div className="flex mt-1 gap-2 flex-wrap">
                          {sizes.map(
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
                   }
   {produtdata.varients && produtdata.varients.length > 0 && (
                <div className="context">
                  <div className="w-full">
                    <label
                      htmlFor="variantSelect"
                      className="font-[400] text-lg"
                    >
                      Select a variant
                    </label>
                    <div className="md:w-[40%] w-[100%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096] pl-4 py-1 flex items-center relative">
                      <div className="w-[100%]">
                        <select
                          className="w-full border-none focus:outline-none appearance-none bg-transparent cursor-pointer"
                          id="variantSelect"
                          value={selectedVariant}
                          onChange={(e) =>
                            setselectedVariant(e.target.value)
                          }
                        >
                          {produtdata.varients.map((variant, index) => (
                            <option key={index} value={index}>
                              {variant.name}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="absolute right-1 top-[5px]">
                        <BiSolidChevronDown
                          size={20}
                          className="text-gray-950"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}
                    <div className="md:block grid grid-cols-2 gap-3">
                      {
                        colors.length > 0 && <div className=" context mt-3">
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
                                {colors.map(
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
                      }

                      <div className=" context mt-3 md:mt-6 ">
                        <div className="w-full">
                          <p className=" font-[400] text-lg">Select quantity</p>
                          <div className="md:w-[30%] w-[90%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096]  grid grid-cols-3 items-center ">
                            <button
                        disabled={pdata.selectedQty <= 1 ? true : false}
                              className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center px-1 h-[40px] text-gray-950 flex items-center justify-center font-[800] cursor-pointer"
                              onClick={handeldecreseqty}
                            >
                              <img src="/images/web/subicon.png" className="w-[15px]" alt="" />
                            </button>
                            <div className="border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center px-1 h-[40px] flex items-center justify-center">
                            {pdata.selectedQty ? pdata.selectedQty : 1}
                            </div>
                            <button
                              className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center px-1 h-[40px] text-gray-950 flex items-center justify-center font-[800] cursor-pointer"
                              onClick={handelincreaseqty}
                            >
                               <img src="/images/web/addicon.png" className="w-[15px]" alt="" />
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
                     
                    >
                      Description & Details{" "}
                      {/* <BiSolidChevronDown
                        className={` transition-all duration-150 ${showdesc ? " rotate-180" : "null"
                          }`}
                      /> */}
                    </button>
                  </div>

                  <div
                    className={`w-full   context mt-6 ${showdesc ? "block" : " block"
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
         <div className="pt-10 bg-gray-100">
         <Teazeslider data={data} heading={'Curated for you'}/>
         </div>
          
          <ToastContainer/>
        </div>
      )}

  
      <Modal
        visible={ismodalopen}
        effect="fadeInDown"
       
        onClickAway={closeModal}
      >
       <div className="w-[330px]">
       <div className="p-8 relative">
          <button className=" absolute right-1 top-1 text-white " onClick={() => setismodalopen(false)} > <img src="/images/web/xmark.png" className="w-[20px]" alt="" /></button>
          <Productmobile sliderdata={productinfo?.images} setopemodal={setismodalopen} />
        </div>
       </div>
      </Modal>
   
    </>
  );
}
