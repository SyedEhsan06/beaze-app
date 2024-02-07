"use client"
import { FaXmark } from "react-icons/fa6";
import { HiBars3 } from "react-icons/hi2";
import { FaAngleDown } from "react-icons/fa";
import { categoryProducts, filtertypes, filtertypesdata } from '@/utils/dummydata';
import { BiSolidChevronDown } from 'react-icons/bi'
import { useState, useEffect, useRef } from "react";
import Filterdatalist from "./Filterdatalist";
import Image from "next/image";
import { fetchData } from "@/utils/apicall";
import Loader from "../loader/Loader";
import { FaBars } from "react-icons/fa6";
import Sidemenu from "./Sidemenu";
import Modal from 'react-awesome-modal';
import Modalimageslider from "./Modalimageslider";
import { RiSubtractLine } from "react-icons/ri";
import { IoMdAdd } from "react-icons/io";
import Link from "next/link";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Productcart from "./Productcart";


export default function Contentcategories({ params }) {
  const [showsort, setshowsort] = useState(false);
  const [selectedfilter, setselectedfilter] = useState(1);
  const [checkedmenus, setcheckedmenus] = useState([]);
  const [filtercount, setfiltercount] = useState(5);
  const [filtertypes, setfiltertypes] = useState(filtertypesdata);
  const [isfilterbaropen, setisfilterbaropen] = useState(0);
  const [loader, setloader] = useState(false);
  const [showsidebar, setshowsidebar] = useState(false);
  const [openmodal, setopenmodal] = useState(false);
  const [productinfo, setproductinfo] = useState([]);
  const [sizeindex, setsizeindex] = useState(1);
  const [quantity, setquantity] = useState(1);
  const [cartdata,setcartdata] = useState([]);
  const[showpricemenu,setshowpricemenu] = useState(false)


  const divRef = useRef();
  const [data, setData] = useState([]);
  useEffect(() => {
    // const fetchDataAsync = async () => {
    //   try {
    //     let slug = decodeURIComponent(params.slug);        
    //     // const encodedString = slug.replace("'", "%27").replace(" ", "%20");
    //     const response = await axios.get(`http://localhost:3000/api/products?${params?.type}=${slug}`);
    //     setData(response?.data);
    //     console.log(response.data);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // };

    // fetchDataAsync();
    handelfetchdata()
  }, []);


  const handelfetchdata = async () => {
    setloader(true)
    try {
      let slug = decodeURIComponent(params.slug);
      const response = await fetchData(`products?${params?.type}=${slug}`)
      setData(response);
      setloader(false)
    } catch (err) {
      console.log(err)
      setloader(false)
    }
  }

  // console.log(data);

  useEffect(() => {
    const handleBodyClick = (event) => {
      const clickedElement = event.target;
      if (divRef.current && !clickedElement.classList.contains('your-specific-class')) {
        let ancestor = clickedElement.parentElement;

        while (ancestor && ancestor !== document.body) {
          if (ancestor.classList.contains('your-specific-class')) {
            return;
          }
          ancestor = ancestor.parentElement;
        }

        setisfilterbaropen(0)
      }
    };

    document.body.addEventListener('click', handleBodyClick);

    return () => {
      document.body.removeEventListener('click', handleBodyClick);
    };
  }, []);



  const handleButtonClick = () => {
    setisfilterbaropen(0);
  };


  const handleCheckboxChange = (index) => {
    const currentIndex = checkedmenus.indexOf(index);
    const newCheckedItems = [...checkedmenus];

    if (currentIndex === -1) {
      newCheckedItems.push(index);
    } else {
      newCheckedItems.splice(currentIndex, 1);
    }

    setcheckedmenus(newCheckedItems);
  };

  const isVisible = (index) => checkedmenus.includes(index);

  const handelshowmore = (index) => {
    const lengths = filtertypes[index].subcategory.length
    setfiltercount(lengths)
  };

  const handelshowless = (index) => {
    setfiltercount(5)
  };


  const handelproductinfo = async (id) => {
    setloader(true)
    try {
      const response = await fetchData(`products/${id}`)
      setproductinfo(response.products)
      setloader(false)
      setopenmodal(true)
    } catch (err) {
      setloader(false)
      console.log(err)
    }

  }

  const closeModal = () => {
    setopenmodal(false)
  }


  const handeladdtocart = (obj) => {
    const isObjectPresent = cartdata.some(item => JSON.stringify(item) === JSON.stringify(obj));

    if (isObjectPresent) {
      toast.error('Item already added to the cart', {
        position: 'top-right',
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } else {
      setcartdata((prevArray) => [...prevArray, obj]);
    setisfilterbaropen(2)
    }
   
  }


console.log(cartdata)

  return (
    <div className='w-full'>

      <div className='w-full flex pt-3 pb-2 gap-x-4 flex-wrap lg:flex-nowrap gap-y-2 lg:gap-y-0 '>
        <div className='lg:w-8/12 w-full flex gap-2 context text-text-secondary flex-wrap '>
          <div className="lg:hidden">
            <button className=" p-3 rounded-full bg-white shadow-sm border">
              <FaBars size={20} onClick={() => setshowsidebar(true)} />
            </button>
          </div>
          <div>
            <div className='flex items-center gap-2  px-[6px] bg-button-secondary rounded-sm font-[500] text-sm shadow-sm relative py-1'><FaXmark className=' cursor-pointer text-xs' />Crop Tops</div>
          </div>

          <div>
            <div className='flex items-center gap-2  px-[6px] bg-button-secondary rounded-sm font-[500] text-sm shadow-sm py-1'><FaXmark className=' cursor-pointer text-xs' />Floral </div>
          </div>

        </div>
        <div className='lg:w-4/12 w-full flex gap-3 context  lg:justify-between relative items-center '>
          <div className="ml-auto lg:ml-0">
            <button className=' cursor-pointer flex items-center gap-x-2 font-semibold rounded-sm border px-4 bg-white text-opacity-[78%]' onClick={() => setisfilterbaropen(1)}>
              <HiBars3 /><span className="mt-[2px]"> More filters</span>
            </button>
          </div>

          <div>
            <button className=' cursor-pointer flex items-center gap-x-2 font-semibold rounded-sm border px-4 bg-white text-opacity-[78%] ' onClick={() => setshowsort(!showsort)}>
              <FaAngleDown className={`transition-all duration-75 ${showsort && 'rotate-[180deg]'}`} /> Sort
            </button>
          </div>

          <div className={`top-[110%] w-[200px] border  right-0 bg-white shadow rounded-lg absolute z-20 ${showsort ? 'block' : 'hidden'}`}>
            <ul className='text-sm font-[400] cursor-pointer '>
              {
                filtertypes.map((items, index) => (
                  <li className={`py-2 border-b px-4 ${selectedfilter === index && ' text-white bg-theme-footer-bg'}`} key={index} onClick={() => setselectedfilter(index)}>{items.title}</li>
                ))
              }

            </ul>
          </div>
        </div>
      </div>

      <div className="mt-5">
        {
          loader ? <Loader /> : <div className=' grid lg:grid-cols-4 grid-cols-2 lg:gap-8 gap-4 context'>
            {
              data?.products?.map((items, index) => (
                <div key={index} className=" group relative">
                  <div className=' flex flex-col text-[#03071E]'>
                    <div className='   cursor-pointer  transition-all duration-100 relative rounded-[6px]  group-hover:opacity-50 h-[200px] w-full overflow-hidden'>
                      {/* <img src={`/images/web/categories/${items.img}`} alt="" className="h-[100%] w-[100%]" /> */}
                      <Image
                        // src={`/images/web/categories/${items.img}`}
                        src={`${items?.images[0]}`}
                        alt="Your Image"
                        layout="fill"
                        objectFit="cover"
                      />

                    </div>
                    <Link href={`/productinfo/${items._id}`}>
                      <h6 className=' font-[700]  text-[1.1rem] mt-2  leading-[1rem] overflow-hidden whitespace-nowrap text-ellipsis '>

                        {
                          items.title
                        }
                      </h6>
                    </Link>
                    <p className='py-1 text-[1rem] font-[400]'>Rs {items.price}</p>
                    <button className=' transition-all duration-100 w-full py-2 text-center bg-theme-footer-bg rounded text-white text-lg font-[400] hover:bg-opacity-[80%]' onClick={() => handeladdtocart(items)}>Add to Cart</button>
                  </div>
                  <p className='w-[70%] transition-all duration-100 cursor-pointer rounded-xl absolute left-[50%] translate-x-[-50%] hidden group-hover:block top-[50%] z-10 bg-button-secondary px-5  text-text-secondary text-[1rem]  text-center  hover:shadow-gray-950  hover:shadow' onClick={() => handelproductinfo(items._id)} >Quick buy</p>
                </div>
              ))
            }
          </div>
        }

      </div>

      <div className={`your-specific-class fixed overflow-y-auto right-0 h-[100vh] bg-white shadow-sm lg:w-[350px] w-[80%] p-4 top-0 z-30 rounded-tl-[28px] border py-3 px-4  context ${isfilterbaropen === 1 ? 'block' : 'hidden'}`} ref={divRef}>
        <div className="py-3 px-3 w-full flex gap-x-4 border-b border-theme-footer-bg  border-opacity-[49%] text-2xl font-[700]">
          <FaXmark className=" cursor-pointer" onClick={() => setisfilterbaropen(0)} /> Filters
        </div>

        <div className="">
          {
            filtertypes.map((items, index) => (
              <div className='w-full flex flex-col  gap-y-2 py-4  border-b border-theme-footer-bg  border-opacity-[40%] context px-3' key={index}>
                <div className=' cursor-pointer' onClick={() => handleCheckboxChange(index)}>
                  <div className=' flex  items-center cursor-pointer'>
                    <div>
                      <p className=' text-xl font-[600] mb-0 w-full '>{items.title}</p>
                    </div>

                    <button className='text-xl ml-auto'><BiSolidChevronDown className={` transition-all duration-75 ${isVisible(index) && ' rotate-180'}`} /></button>

                  </div>
                </div>
                <div className={` ${isVisible(index) ? 'block' : 'hidden'}`} >
                  <Filterdatalist subcategory={items.subcategory} showCount={filtercount} indexing={index} onShowMore={() => handelshowmore(index)} onShowLess={() => handelshowless(index)} />


                </div>


              </div>
            ))
          }

        </div>

        <div className="w-full flex items-center gap-x-4 py-3">
          <button className="w-4/12 border border-[#000000] text-text-secondary text-lg font-[300] py-1 rounded-[22px]">Reset</button>
          <button className="w-8/12 border bg-[#F8B43A] text-text-secondary text-lg font-[500] py-1 rounded-[22px] ">Apply filter</button>
        </div>
      </div>

      <div className={`your-specific-class fixed overflow-y-auto right-0 h-[100vh] bg-white shadow-sm lg:w-[350px] w-[80%]  top-0 z-30 rounded-tl-[28px] border py-3 context ${isfilterbaropen === 2 ? 'block' : 'hidden'}`} ref={divRef}>
        <div className="py-3 px-6 w-full flex gap-x-4 border-b border-theme-footer-bg  border-opacity-[49%] text-2xl font-[700]">
          <FaXmark className=" cursor-pointer" onClick={() => setisfilterbaropen(0)} /> Cart
        </div>
<Productcart products={cartdata} showprice= {showpricemenu} setshowprice={setshowpricemenu} />
      
      </div>

      <div className={`your-specific-class fixed overflow-y-auto left-0 h-[100vh] bg-white shadow-sm lg:hidden w-[80%] p-4 top-0 z-30 rounded-tr-[28px] border py-3 px-3  context ${showsidebar ? 'block' : 'hidden'}`} ref={divRef}>
        <div className="flex">
          <button className="p-3 shadow-sm rounded-full ml-auto mr-2 bg-theme-footer-bg text-white" onClick={() => setshowsidebar(false)}>
            <FaXmark size={20} />
          </button>
        </div>
        <Sidemenu />
      </div>


      <Modal
        visible={openmodal}
        width={"75%"}
        height="550px"
        effect="fadeInDown"
        onClickAway={closeModal}

      >
        <div className="w-full bg-white rounded-[11px] py-4 pl-6 pr-8 relative">
          <div className="w-full">
            <div className="w-full flex gap-5">
              <div className="w-[45%]">
                <Modalimageslider sliderdata={productinfo.images} />
              </div>
              <div className="w-[55%] flex-col justify-between flex">
                <div className="w-full flex flex-col">
                  <h5 className="headtext font-semibold text-3xl leading-[2.8rem]">{productinfo.title}</h5>
                  <p className="context font-[500] text-2xl">INR {productinfo.price}</p>

                  <p className="context mt-2 text-[1rem] text-opacity-[50%] font-[300]">
                    {productinfo.description}
                  </p>
                </div>


                <div className="context">
                  <div className="w-full">
                    <p className=" font-[400] text-lg" >Select a size</p>
                    <div className="flex mt-1 gap-2 flex-wrap">
                      {productinfo.attributes && Array.isArray(productinfo.attributes[1]?.value) &&
                        productinfo.attributes[1].value.map((items, index) => (
                          <button key={index} className={` transition-all duration-150 font-[400] text-sm border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] px-2 py-1 ${sizeindex === index ? ' bg-theme-footer-bg text-white text-opacity-[100%]' : 'text-opacity-[50%] text-[#00000096]'}`} onClick={() => setsizeindex(index)}>
                            {items}
                          </button>
                        ))}

                    </div>
                  </div>
                </div>




                <div className=" context">
                  <div className="w-full">
                    <label htmlFor="sizeselect" className=" font-[400] text-lg">Select a colour</label>
                    <div className="w-[40%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096] px-4 py-1 flex items-center">
                      <div className="w-[90%]">
                        <select className="w-full border-none focus:outline-none appearance-none bg-transparent cursor-pointer" id="sizeselect">
                          <option value="">Select Colour</option>
                          {productinfo.attributes && Array.isArray(productinfo.attributes[0]?.value) &&
                            productinfo.attributes[0].value.map((items, index) => (
                              <option value="">{items}</option>
                            ))}
                        </select>
                      </div>

                      <div className="w-[10%]">
                        <BiSolidChevronDown size={20} className=" text-gray-950" />
                      </div>
                    </div>
                  </div>
                </div>



                <div className=" context">
                  <div className="w-full">
                    <p className=" font-[400] text-lg">Select quantity</p>
                    <div className="w-[30%] border-[0.5px] border-[#989898CC] border-opacity-[80%] rounded-[4px] text-opacity-[50%] text-[#00000096]  grid grid-cols-3 ">
                      <button disabled={quantity === 1 ? true : false} className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center p-1 text-gray-950 flex items-center justify-center font-[800] cursor-pointer" onClick={() => setquantity(quantity - 1)}><RiSubtractLine /></button>
                      <div className="border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center p-1">{quantity}</div>
                      <button className=" border-r-[0.5px] border-[#989898CC] border-opacity-[80%] text-center p-1 text-gray-950 flex items-center justify-center font-[800] cursor-pointer" onClick={() => setquantity(quantity + 1)}><IoMdAdd /></button>
                    </div>
                  </div>
                </div>


                <div className=" grid grid-cols-1 gap-y-4 headtext py-2">
                  <button className=" w-full bg-theme-footer-bg text-white font-[700] text-xl py-2 rounded ">Checkout</button>
                  <button className=" w-full  text-[#474747] font-[300] text-lg py-2 rounded border-[0.3px] border-[#000000] ">Cancel</button>
                </div>
              </div>


              <button className=" absolute right-2 top-3 bg-">
                <FaXmark size={25} onClick={closeModal} />
              </button>

            </div>
          </div>
        </div>
      </Modal>
      <ToastContainer />
    </div>


  )
}
